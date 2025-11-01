"use client";

import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from "react";
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

  const loadCart = useCallback(() => {
    const currentCart = getCart();
    setCartState(currentCart);
    setCartCount(getCartCount());
  }, []);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  const addItem = useCallback((productId: string, quantity: number = 1, color?: string) => {
    addToCart(productId, quantity, color);
    loadCart();
  }, [loadCart]);

  const removeItem = useCallback((productId: string, color?: string) => {
    removeFromCart(productId, color);
    loadCart();
  }, [loadCart]);

  const updateQuantity = useCallback((productId: string, quantity: number, color?: string) => {
    updateCartQuantity(productId, quantity, color);
    loadCart();
  }, [loadCart]);

  const clearCart = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('cozy_cart');
    }
    loadCart();
  }, [loadCart]);

  const value = useMemo(
    () => ({ cart, cartCount, addItem, removeItem, updateQuantity, clearCart }),
    [cart, cartCount, addItem, removeItem, updateQuantity, clearCart]
  );

  return (
    <CartContext.Provider value={value}>
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

