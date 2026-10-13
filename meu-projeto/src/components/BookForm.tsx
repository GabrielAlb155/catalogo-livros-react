import React, { useState } from 'react';
import type { BookFormProps } from '../types/book';

export const BookForm: React.FC<BookFormProps> = ({ onAddBook }) => {
  const [title, setTitle] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [status, setStatus] = useState<'Lido' | 'Não lido'>('Não lido');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!title.trim() || !author.trim()) return;

    try {
      setIsSubmitting(true);
      await onAddBook({ title, author, status });
      setTitle('');
      setAuthor('');
      setStatus('Não lido');
    } catch (error) {
      console.error('Erro ao submeter formulário:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="title" className="text-sm font-semibold text-slate-700">
          Título
        </label>
        <input
          id="title"
          type="text"
          placeholder="Ex: O Senhor dos Anéis"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
          required
          className="w-full rounded-lg border border-slate-300 p-2.5 text-base focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="author" className="text-sm font-semibold text-slate-700">
          Autor
        </label>
        <input
          id="author"
          type="text"
          placeholder="Ex: J.R.R. Tolkien"
          value={author}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAuthor(e.target.value)}
          required
          className="w-full rounded-lg border border-slate-300 p-2.5 text-base focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="status" className="text-sm font-semibold text-slate-700">
          Status
        </label>
        <select
          id="status"
          value={status}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setStatus(e.target.value as 'Lido' | 'Não lido')
          }
          className="w-full rounded-lg border border-slate-300 p-2.5 text-base focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="Não lido">Não lido</option>
          <option value="Lido">Lido</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-blue-700 active:bg-blue-800 disabled:cursor-not-allowed disabled:bg-blue-300"
      >
        {isSubmitting ? 'Cadastrando...' : 'Adicionar Livro'}
      </button>
    </form>
  );
};