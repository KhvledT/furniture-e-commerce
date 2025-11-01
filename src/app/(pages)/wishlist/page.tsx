"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/contexts/ToastContext";
import { getProductById } from "@/lib/products";
import { motion } from "framer-motion";

export default function WishlistPage() {
  const { wishlist, removeItem } = useWishlist();
  const { addItem } = useCart();
  const { showToast } = useToast();
  const [wishlistItems, setWishlistItems] = useState<Array<{
    product: any;
  }>>([]);

  useEffect(() => {
    const items = wishlist.map((item) => {
      const product = getProductById(item.productId);
      return { product };
    }).filter((item) => item.product !== undefined);

    setWishlistItems(items);
  }, [wishlist]);

  const handleRemoveFromWishlist = (productId: string) => {
    removeItem(productId);
    showToast("Removed from wishlist", "info");
  };

  const handleAddToCart = (productId: string) => {
    addItem(productId, 1);
    showToast("Added to cart!", "cart");
  };

  if (wishlistItems.length === 0) {
    return (
        <div className="min-h-screen bg-[#2f2f2f] text-white font-sans py-12 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-7xl text-center">
            <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>
            <div className="py-16">
              <Heart className="w-24 h-24 mx-auto mb-6 text-zinc-400" />
              <p className="text-2xl mb-4 text-zinc-400">Your wishlist is empty</p>
              <p className="text-lg mb-8 text-zinc-500">
                Save items you love for later
              </p>
              <Link
                href="/products"
                className="inline-block bg-[#F1B345] text-black py-3 px-6 rounded-md hover:bg-amber-500 transition-colors duration-300"
              >
                Start Shopping
              </Link>
            </div>
          </div>
        </div>
    );
  }

  return (
      <div className="min-h-screen bg-[#2f2f2f] text-white font-sans py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
            <h1 className="text-3xl font-bold mb-8">
              My Wishlist <span className="font-normal text-xl text-zinc-400">({wishlist.length} items)</span>
            </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((item, index) => (
              <motion.div
                key={item.product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative bg-[#4A4A4A] rounded-xl shadow-lg overflow-hidden group"
              >
                {/* Image Container */}
                <Link href={`/products/${item.product.id}`}>
                  <div className="relative bg-[#E3E3E39C] p-4 rounded-t-xl aspect-square flex items-center justify-center">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      width={300}
                      height={300}
                      className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </Link>

                {/* Info Container */}
                <div className="p-4">
                  <h3 className="text-white font-semibold text-lg truncate mb-2">
                    {item.product.name}
                  </h3>
                  <p className="text-zinc-400 text-sm mb-2">{item.product.category}</p>
                  <p className="text-white font-bold text-xl mb-4">
                    ${item.product.price.toFixed(2)}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAddToCart(item.product.id)}
                      className="flex-1 bg-[#F1B345] text-black font-semibold py-2 px-4 rounded-md hover:bg-amber-500 transition-colors duration-300 flex items-center justify-center gap-2"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Add to Cart
                    </button>
                    <button
                      onClick={() => handleRemoveFromWishlist(item.product.id)}
                      className="p-2 border border-red-500 text-red-500 rounded-md hover:bg-red-500 hover:text-white transition-colors duration-300"
                      aria-label="Remove from wishlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Wishlist Badge */}
                <div className="absolute top-3 left-3 bg-red-500 p-2 rounded-full">
                  <Heart className="w-4 h-4 fill-white text-white" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
  );
}
