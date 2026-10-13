export interface Book {
  _id?: string;
  title: string;
  author: string;
  status: 'Lido' | 'Não lido';
}

export interface BookFormProps {
  onAddBook: (book: Omit<Book, '_id'>) => Promise<void>;
}

export interface BookListProps {
  books: Book[];
  onDeleteBook: (id: string) => Promise<void>;
  onToggleStatus?: (book: Book) => Promise<void>;
  isLoading: boolean;
}

export interface BookItemProps {
  book: Book;
  onDelete: (id: string) => Promise<void>;
  onToggleStatus?: (book: Book) => Promise<void>;
}