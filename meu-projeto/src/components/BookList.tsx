import React from 'react';
import type { BookListProps } from '../types/book';
import { BookItem } from './BookItem';

export const BookList: React.FC<BookListProps> = ({
  books,
  onDeleteBook,
  onToggleStatus,
  isLoading,
}) => {
  if (isLoading) {
    return <div className="py-8 text-center text-slate-500">Carregando catálogo de livros...</div>;
  }

  if (books.length === 0) {
    return <div className="py-8 text-center text-slate-500">Nenhum livro cadastrado no momento.</div>;
  }

  return (
    <ul className="flex flex-col gap-3">
      {books.map((book) => (
        <BookItem
          key={book._id}
          book={book}
          onDelete={onDeleteBook}
          onToggleStatus={onToggleStatus}
        />
      ))}
    </ul>
  );
};