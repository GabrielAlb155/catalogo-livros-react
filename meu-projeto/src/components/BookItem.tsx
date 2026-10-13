import React, { useState } from 'react';
import type { BookItemProps } from '../types/book';

export const BookItem: React.FC<BookItemProps> = ({ book, onDelete, onToggleStatus }) => {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const handleDelete = async (): Promise<void> => {
    if (!book._id) return;
    try {
      setIsDeleting(true);
      await onDelete(book._id);
    } catch (error) {
      console.error('Erro ao deletar:', error);
      setIsDeleting(false);
    }
  };

  return (
    <li className="flex flex-col gap-4 rounded-lg border border-slate-200 bg-slate-50 p-4 transition-all hover:border-slate-300 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-bold text-slate-800">{book.title}</h3>
        <p className="text-sm text-slate-500">por {book.author}</p>
        <div>
          <span
            className={`inline-block rounded px-2.5 py-0.5 text-xs font-semibold ${
              book.status === 'Lido'
                ? 'bg-green-100 text-green-800'
                : 'bg-amber-100 text-amber-800'
            }`}
          >
            {book.status}
          </span>
        </div>
      </div>

      <div className="flex w-full items-center gap-2 sm:w-auto">
        {onToggleStatus && (
          <button
            onClick={() => onToggleStatus(book)}
            className="flex-1 rounded bg-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-300 active:bg-slate-400 sm:flex-initial"
          >
            {book.status === 'Lido' ? 'Marcar Não Lido' : 'Marcar Lido'}
          </button>
        )}
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="flex-1 rounded bg-red-100 px-3 py-2 text-xs font-semibold text-red-700 transition-colors hover:bg-red-200 active:bg-red-300 disabled:bg-red-50 disabled:text-red-300 sm:flex-initial"
        >
          {isDeleting ? 'Removendo...' : 'Excluir'}
        </button>
      </div>
    </li>
  );
};