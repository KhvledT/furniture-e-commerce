"use client";

import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from "react";
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

  const loadWishlist = useCallback(() => {
    const currentWishlist = getWishlist();
    setWishlistState(currentWishlist);
  }, []);

  useEffect(() => {
    loadWishlist();
  }, [loadWishlist]);

  const addItem = useCallback((productId: string) => {
    addToWishlist(productId);
    loadWishlist();
  }, [loadWishlist]);

  const removeItem = useCallback((productId: string) => {
    removeFromWishlist(productId);
    loadWishlist();
  }, [loadWishlist]);

  const isWishlisted = useCallback((productId: string) => {
    return isInWishlist(productId);
  }, []);

  const value = useMemo(
    () => ({ wishlist, addItem, removeItem, isWishlisted }),
    [wishlist, addItem, removeItem, isWishlisted]
  );

  return (
    <WishlistContext.Provider value={value}>
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

