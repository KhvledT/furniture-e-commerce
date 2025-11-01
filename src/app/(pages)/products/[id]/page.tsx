"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Star,
  ChevronRight,
  ChevronLeft,
  Heart,
  Share2,
  RotateCw,
  Plus,
  Minus,
} from "lucide-react";
import { getProductById, getRelatedProducts } from "@/lib/products";
import { generateProductStructuredData } from "@/lib/structuredData";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useToast } from "@/contexts/ToastContext";
import DemoModal from "@/components/DemoModal";
import RelatedProducts from "@/components/RelatedProducts";
import PageTransition from "@/components/animations/PageTransition";

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { addItem } = useCart();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isWishlisted } = useWishlist();
  const { showToast } = useToast();

  const productId = params.id as string;
  const product = getProductById(productId);
  const relatedProducts = getRelatedProducts(productId, 4);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [showDemoModal, setShowDemoModal] = useState(false);

  // Set initial color
  useEffect(() => {
    if (product && product.colors.length > 0) {
      setSelectedColor(product.colors[0].name);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="relative bg-[#2F2F2F] text-white font-sans py-10 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
          <Link href="/products" className="text-amber-400 hover:text-amber-500">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const handleQuantityChange = (change: number) => {
    setQuantity(Math.max(1, quantity + change));
  };

  const handleAddToCart = () => {
    addItem(productId, quantity, selectedColor);
    showToast(`${product?.name} added to cart!`, "cart");
  };

  const handleWishlistToggle = () => {
    if (isWishlisted(productId)) {
      removeFromWishlist(productId);
      showToast("Removed from wishlist", "info");
    } else {
      addToWishlist(productId);
      showToast("Added to wishlist!", "wishlist");
    }
  };

  const handleImageChange = (index: number) => {
    setCurrentImageIndex(index);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + product.images.length) % product.images.length
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="w-5 h-5 fill-yellow-500 text-yellow-500" />
      );
    }

    if (hasHalfStar && fullStars < 5) {
      stars.push(
        <Star key="half" className="w-5 h-5 fill-yellow-500 text-yellow-500" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-5 h-5 text-zinc-500" />);
    }

    return stars;
  };

  return (
    <PageTransition>
      <div className="relative bg-[#2F2F2F] text-white font-sans py-10">
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: generateProductStructuredData(product) }}
        />
        {/* Top Navigation / Breadcrumbs */}
      <div className="container mx-auto px-4 md:px-8 py-4 flex justify-between items-center text-zinc-300">
        <div className="flex items-center space-x-4">
          <Link
            href="/products"
            className="flex items-center hover:text-white transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <span className="text-sm">
            <Link href="/products" className="hover:underline">
              {product.category}
            </Link>{" "}
            / {product.name}
          </span>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <span>
            {currentImageIndex + 1} / {product.images.length}
          </span>
          <button
            onClick={handlePrevImage}
            className="p-1 rounded-full hover:bg-zinc-600 transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNextImage}
            className="p-1 rounded-full hover:bg-zinc-600 transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Product Content */}
      <div className="container mx-auto px-4 md:px-8 py-8 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
        {/* Left Column: Product Info */}
        <div className="flex flex-col justify-start">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{product.name}</h1>
          <div className="flex items-center gap-4 mb-6">
            <p className="text-white text-3xl font-bold">
              ${product.price.toFixed(2)}
            </p>
            {product.originalPrice && (
              <p className="text-zinc-500 text-xl line-through">
                ${product.originalPrice.toFixed(2)}
              </p>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center space-x-2 mb-6">
            <div className="flex text-yellow-500">{renderStars(product.rating)}</div>
            <span className="text-zinc-200 text-sm">
              {product.rating} / 5.0 ({product.reviewsCount})
            </span>
          </div>

          <p className="text-zinc-200 leading-relaxed mb-8">{product.description}</p>

          {/* Color Options */}
          {product.colors.length > 0 && (
            <div className="mb-8">
              <h4 className="text-zinc-300 text-sm mb-2">Color</h4>
              <div className="flex space-x-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-7 h-7 rounded-full border-2 transition-all duration-200 ${
                      selectedColor === color.name
                        ? "border-white"
                        : "border-transparent"
                    }`}
                    style={{ backgroundColor: color.hex }}
                    aria-label={`Select ${color.name} color`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Quantity and Add to Cart */}
          <div className="flex items-center space-x-4 mb-8">
            <div className="flex items-center border border-zinc-500 rounded-md">
              <button
                onClick={() => handleQuantityChange(-1)}
                className="p-2 w-10 h-10 flex items-center justify-center text-xl font-medium text-zinc-300 hover:bg-zinc-600 rounded-l-md transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="w-5 h-5" />
              </button>
              <span className="w-12 text-center text-lg font-medium text-white select-none">
                {quantity}
              </span>
              <button
                onClick={() => handleQuantityChange(1)}
                className="p-2 w-10 h-10 flex items-center justify-center text-xl font-medium text-zinc-300 hover:bg-zinc-600 rounded-r-md transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-amber-400 text-black font-semibold py-3 px-6 rounded-md hover:bg-amber-500 transition-colors duration-300 text-lg"
            >
              Add to Cart
            </button>
          </div>

          {/* Features/Badges */}
          <div className="text-zinc-300 text-sm flex flex-wrap gap-x-6 gap-y-2 mb-8">
            <span className="flex items-center">
              <span className="mr-2">•</span>Free 3-5 day shipping
            </span>
            <span className="flex items-center">
              <span className="mr-2">•</span>Tool-free assembly
            </span>
            <span className="flex items-center">
              <span className="mr-2">•</span>30-day trial
            </span>
          </div>

          {/* Wishlist and Social Share */}
          <div className="flex items-center justify-between text-zinc-400 mt-10 border-t border-zinc-600 pt-8">
            <button
              onClick={handleWishlistToggle}
              className={`flex items-center text-sm transition-colors ${
                isWishlisted(productId)
                  ? "text-yellow-500 hover:text-yellow-400"
                  : "text-zinc-400 hover:text-yellow-400"
              }`}
            >
              <Heart
                className={`w-5 h-5 mr-2 ${isWishlisted(productId) ? "fill-yellow-500 text-yellow-500" : ""}`}
              />{" "}
              {isWishlisted(productId) ? "In Wishlist" : "Add to Wishlist"}
            </button>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowDemoModal(true)}
                className="hover:text-white transition-colors"
                aria-label="Share product"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Product Images */}
        <div className="flex flex-col items-center">
          {/* Main Display Image */}
          <div className="relative w-full max-w-lg aspect-square mb-6 bg-[#2F2F2F] rounded-lg flex items-center justify-center">
            <Image
              src={product.images[currentImageIndex]}
              alt={`${product.name} - Image ${currentImageIndex + 1}`}
              width={600}
              height={600}
              className="object-contain max-h-full max-w-full"
              priority
            />
            {/* 360 rotation indicator */}
            <div className="absolute bottom-4 left-4 text-xs bg-black bg-opacity-50 p-2 rounded-full text-zinc-300 leading-none">
              <RotateCw className="w-4 h-4" />
            </div>
            <span className="absolute bottom-5 right-5 text-xs font-semibold bg-black/30 text-white py-1 px-2 rounded-full">
              360°
            </span>
          </div>

          {/* Thumbnail Images */}
          {product.images.length > 1 && (
            <div className="flex flex-wrap justify-center gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => handleImageChange(index)}
                  className={`relative w-24 h-24 rounded-md overflow-hidden bg-zinc-800 flex items-center justify-center p-2 border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-zinc-700 ${
                    currentImageIndex === index
                      ? "border-amber-400"
                      : "border-transparent hover:border-amber-400"
                  }`}
                  aria-label={`View image ${index + 1} of ${product.name}`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} - Thumbnail ${index + 1}`}
                    width={96}
                    height={96}
                    className="object-contain w-full h-full"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <DemoModal isOpen={showDemoModal} onClose={() => setShowDemoModal(false)} />
      
      {/* Related Products */}
      {product && relatedProducts.length > 0 && (
        <RelatedProducts products={relatedProducts} currentProductId={productId} />
      )}
    </div>
    </PageTransition>
  );
}
