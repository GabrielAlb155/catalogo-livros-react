import React, { useState, useEffect } from 'react';
import axios from 'axios';
import type { Book } from './types/book';
import { BookForm } from './components/BookForm';
import { BookList } from './components/BookList';

const API_URL = 'https://crudcrud.com/api/d73ee616d6924abbb6b6fff3b6399677/books';

export const App: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadData = async (): Promise<void> => {
      try {
        setIsLoading(true);
        setErrorMsg(null);
        const response = await axios.get<Book[]>(API_URL);
        if (isMounted) {
          setBooks(response.data);
        }
      } catch (err) {
        if (isMounted) {
          setErrorMsg('Falha ao carregar a lista de livros. Verifique a chave da API.');
        }
        console.error(err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleAddBook = async (newBook: Omit<Book, '_id'>): Promise<void> => {
    try {
      setErrorMsg(null);
      const response = await axios.post<Book>(API_URL, newBook);
      setBooks((prevBooks) => [...prevBooks, response.data]);
    } catch (err) {
      setErrorMsg('Erro ao cadastrar novo livro.');
      console.error(err);
    }
  };

  const handleDeleteBook = async (id: string): Promise<void> => {
    try {
      setErrorMsg(null);
      await axios.delete(`${API_URL}/${id}`);
      setBooks((prevBooks) => prevBooks.filter((book) => book._id !== id));
    } catch (err) {
      setErrorMsg('Erro ao excluir o livro.');
      console.error(err);
    }
  };

  const handleToggleStatus = async (book: Book): Promise<void> => {
    if (!book._id) return;
    const updatedStatus: 'Lido' | 'Não lido' = book.status === 'Lido' ? 'Não lido' : 'Lido';

    const payload: Omit<Book, '_id'> = {
      title: book.title,
      author: book.author,
      status: updatedStatus,
    };

    try {
      setErrorMsg(null);
      await axios.put(`${API_URL}/${book._id}`, payload);
      setBooks((prevBooks) =>
        prevBooks.map((b) => (b._id === book._id ? { ...b, status: updatedStatus } : b))
      );
    } catch (err) {
      setErrorMsg('Erro ao atualizar status do livro.');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8 text-center">
          <h1 className="text-2xl font-extrabold text-slate-900 sm:text-3xl lg:text-4xl">
            📚 Catálogo de Livros
          </h1>
          <p className="mt-1 text-sm text-slate-500 sm:text-base">
            Gerenciamento com React, TypeScript, Tailwind CSS & API REST
          </p>
        </header>

        {errorMsg && (
          <div className="mb-6 rounded-lg border border-red-300 bg-red-100 p-4 text-center text-sm font-medium text-red-800">
            {errorMsg}
          </div>
        )}

        <main className="flex flex-col gap-8 lg:grid lg:grid-cols-[350px_1fr] lg:items-start">
          <section className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm lg:sticky lg:top-8">
            <h2 className="mb-4 text-xl font-bold text-slate-900">Novo Livro</h2>
            <BookForm onAddBook={handleAddBook} />
          </section>

          <section className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-xl font-bold text-slate-900">Seus Livros</h2>
            <BookList
              books={books}
              onDeleteBook={handleDeleteBook}
              onToggleStatus={handleToggleStatus}
              isLoading={isLoading}
            />
          </section>
        </main>
      </div>
    </div>
  );
};

export default App;