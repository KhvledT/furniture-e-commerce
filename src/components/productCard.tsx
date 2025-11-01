// components/ProductCard.tsx
"use client";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";
import { Star, Plus, Heart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useToast } from "@/contexts/ToastContext";
import { motion } from "framer-motion";

interface ProductCardProps {
  id: string | number;
  name: string;
  category: string;
  price: number;
  imageUrl: string | StaticImageData;
  rating: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  category,
  price,
  imageUrl,
  rating,
}) => {
  const router = useRouter();
  const { addItem } = useCart();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isWishlisted } = useWishlist();
  const { showToast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(String(id), 1);
    showToast(`${name} added to cart!`, "cart");
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isWishlisted(String(id))) {
      removeFromWishlist(String(id));
      showToast("Removed from wishlist", "info");
    } else {
      addToWishlist(String(id));
      showToast("Added to wishlist!", "wishlist");
    }
  };

  return (
    <div
      className="relative bg-[#4A4A4A] rounded-xl shadow-lg overflow-hidden group p-2"
      key={id}
    >
      {/* Image Container */}
      <div className="relative bg-[#E3E3E39C] p-4 rounded-xl aspect-square flex items-center justify-center">
        <Image
          src={imageUrl}
          alt={name}
          width={300} // Set base width
          height={300} // Set base height
          className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105 cursor-pointer"
          onClick={() => router.push(`/products/${id}`)}
        />
        
        {/* Wishlist Button - Top Left */}
        <motion.button
          onClick={handleWishlistToggle}
          aria-label={isWishlisted(String(id)) ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute top-3 left-3 bg-black bg-opacity-50 backdrop-blur-sm rounded-full p-2 z-10"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Heart 
            className={`w-5 h-5 ${
              isWishlisted(String(id)) 
                ? "fill-red-500 text-red-500" 
                : "text-white"
            }`} 
          />
        </motion.button>

        {/* Rating Badge */}
        <div className="absolute bottom-3 right-3 bg-[#FFF8E1] text-black text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          <span>{rating.toFixed(1)}</span>
        </div>
      </div>

      {/* Info Container */}
      <div className="p-4">
        <h3 className="text-white font-semibold text-lg truncate" title={name}>
          {name}
        </h3>
        <p className="text-zinc-400 text-sm">{category}</p>
        <p className="text-white font-bold text-lg mt-4">${price}</p>
      </div>

      {/* Add Button */}
      <motion.button
        onClick={handleAddToCart}
        aria-label={`Add ${name} to cart`}
        className="absolute bottom-4 right-4 bg-yellow-500 text-black rounded-full w-10 h-10 flex items-center justify-center text-2xl transition-all duration-300 hover:bg-yellow-400"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Plus className="w-6 h-6 text-[#4A4A4A]" />
      </motion.button>
    </div>
  );
};

export default ProductCard;
