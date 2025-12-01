export interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  cover: string;
  description: string;
  category?: string;
  rating?: number;
}

export interface CartItem {
  id: number;
  qty: number;
  book: Book;
}

export interface CartContextType {
  items: CartItem[];
  addToCart: (book: Book) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, qty: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}
