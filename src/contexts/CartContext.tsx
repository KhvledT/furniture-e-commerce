"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getCart,
  setCart,
  addToCart,
  removeFromCart,
  updateCartQuantity,
  getCartCount,
  CartItem,
} from "@/lib/localStorage";

interface CartContextType {
  cart: CartItem[];
  cartCount: number;
  addItem: (productId: string, quantity?: number, color?: string) => void;
  removeItem: (productId: string, color?: string) => void;
  updateQuantity: (productId: string, quantity: number, color?: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCartState] = useState<CartItem[]>([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    const currentCart = getCart();
    setCartState(currentCart);
    setCartCount(getCartCount());
  };

  const addItem = (productId: string, quantity: number = 1, color?: string) => {
    addToCart(productId, quantity, color);
    loadCart();
  };

  const removeItem = (productId: string, color?: string) => {
    removeFromCart(productId, color);
    loadCart();
  };

  const updateQuantity = (productId: string, quantity: number, color?: string) => {
    updateCartQuantity(productId, quantity, color);
    loadCart();
  };

  const clearCart = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('cozy_cart');
    }
    loadCart();
  };

  return (
    <CartContext.Provider
      value={{ cart, cartCount, addItem, removeItem, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

