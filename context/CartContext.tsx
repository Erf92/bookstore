"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useTransition,
} from "react";
import { Book, CartItem, CartContextType } from "@/types/book";

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "bookstore-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const saved = localStorage.getItem(CART_STORAGE_KEY);
    if (saved) {
      try {
        const parsedItems = JSON.parse(saved);
        startTransition(() => {
          setItems(parsedItems);
        });
      } catch {
        startTransition(() => {
          setItems([]);
        });
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addToCart = (book: Book) => {
    startTransition(() => {
      setItems((prev) => {
        const existing = prev.find((item) => item.id === book.id);
        if (existing) {
          return prev.map((item) =>
            item.id === book.id ? { ...item, qty: item.qty + 1 } : item
          );
        }
        return [...prev, { id: book.id, qty: 1, book }];
      });
    });
  };

  const removeFromCart = (id: number) => {
    startTransition(() => {
      setItems((prev) => prev.filter((item) => item.id !== id));
    });
  };

  const updateQuantity = (id: number, qty: number) => {
    if (qty < 1) {
      removeFromCart(id);
      return;
    }
    startTransition(() => {
      setItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, qty } : item))
      );
    });
  };

  const clearCart = () => {
    startTransition(() => {
      setItems([]);
    });
  };

  const total = items.reduce(
    (sum, item) => sum + item.book.price * item.qty,
    0
  );
  const itemCount = items.reduce((sum, item) => sum + item.qty, 0);

  const value: CartContextType = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    total,
    itemCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
