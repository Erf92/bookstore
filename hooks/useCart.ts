"use client";

import { useCart } from "@/context/CartContext";
import { Book } from "@/types/book";

export function useCartActions() {
  const cart = useCart();

  const addItem = (book: Book) => {
    cart.addToCart(book);
  };

  const removeItem = (id: number) => {
    cart.removeFromCart(id);
  };

  const updateItemQty = (id: number, qty: number) => {
    cart.updateQuantity(id, qty);
  };

  return {
    ...cart,
    addItem,
    removeItem,
    updateItemQty,
  };
}
