"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  isInWishlist,
  WishlistItem,
} from "@/lib/localStorage";

interface WishlistContextType {
  wishlist: WishlistItem[];
  addItem: (productId: string) => void;
  removeItem: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlistState] = useState<WishlistItem[]>([]);

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = () => {
    const currentWishlist = getWishlist();
    setWishlistState(currentWishlist);
  };

  const addItem = (productId: string) => {
    addToWishlist(productId);
    loadWishlist();
  };

  const removeItem = (productId: string) => {
    removeFromWishlist(productId);
    loadWishlist();
  };

  const isWishlisted = (productId: string) => {
    return isInWishlist(productId);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addItem, removeItem, isWishlisted }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}

