"use client";

import { useState } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import SpecialPackage1 from "@/assets/imgs/landing/special/Special1.png";
import SpecialPackage2 from "@/assets/imgs/landing/special/Special2.png";
import SpecialPackage3 from "@/assets/imgs/landing/special/Special3.png";

type SelectedProduct = {
  imageSrc: string;
  title: string;
  subtitle: string;
  subSubtitle?: string;
  price: string;
  priceDecimal?: string;
  rating: number;
};

interface Product {
  imageSrc: string;
  title: string;
  subtitle: string;
  price: string;
  rating: number; // 1-5
}

const products: Product[] = [
  {
    imageSrc: SpecialPackage1.src,
    title: "Larkin Wood Bed",
    subtitle: "Bed",
    price: "$239.99",
    rating: 3,
  },
  {
    imageSrc: SpecialPackage2.src,
    title: "Skogsalm",
    subtitle: "Nightstand",
    price: "$199.99",
    rating: 2,
  },
  {
    imageSrc: SpecialPackage3.src,
    title: "Rickarum",
    subtitle: "Wooden Vase",
    price: "$89.99",
    rating: 1,
  },
];

const mainProduct: SelectedProduct = {
  imageSrc: SpecialPackage1.src,
  title: "Larkin Wood",
  subtitle: "Soft Mattress",
  subSubtitle: "Free Pillows",
  price: "$239",
  priceDecimal: ".99",
  rating: 4.5,
};

export default function SpecialPackage() {
  const [selectedProduct, setSelectedProduct] = useState<SelectedProduct>(mainProduct);
  const [imageOpacity, setImageOpacity] = useState(1);

  const handleThumbnailClick = (product: Product) => {
    // Fade out
    setImageOpacity(0);
    setTimeout(() => {
      setSelectedProduct({
        imageSrc: product.imageSrc,
        title: product.title,
        subtitle: product.subtitle,
        subSubtitle: "",
        price: product.price,
        priceDecimal: "",
        rating: product.rating,
      });
      // Fade in
      setTimeout(() => setImageOpacity(1), 50);
    }, 300);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star key="half" className="w-5 h-5 fill-amber-400 text-amber-400" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="w-5 h-5 text-gray-400" />
      );
    }

    return stars;
  };

  return (
    <div className="max-w-7xl mx-auto py-10">
      <div className="bg-[#2F2F2F]">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-custom-yellow">
            Special Package
          </h1>
          <p className="mt-2 text-dark-text-header">
            Essential Product To Help You Create A Calm, Clear Space
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Main Product Display */}
          <div className="lg:w-1/2 p-4 bg-[#2F2F2F] relative overflow-hidden">
            <Image
              src={selectedProduct.imageSrc}
              alt={`${selectedProduct.title} ${selectedProduct.subtitle}`}
              width={600}
              height={400}
              style={{ opacity: imageOpacity }}
              className="w-full h-auto object-cover transition-opacity duration-300 ease-in-out"
              priority
            />

            <div className="mt-4 flex justify-between items-end">
              <div>
                <p className="text-xl font-semibold text-white">
                  {selectedProduct.title}
                </p>
                <p className="text-lg text-white">
                  {selectedProduct.subtitle}
                </p>
                {selectedProduct.subSubtitle && (
                  <p className="text-lg text-white">
                    {selectedProduct.subSubtitle}
                  </p>
                )}
                <div className="h-1 bg-custom-yellow w-1/2 mt-2"></div>
              </div>

              <div className="text-left">
                <p className="text-4xl font-bold mb-2 text-white">
                  {selectedProduct.price}
                  <span className="text-xl font-normal">
                    {selectedProduct.priceDecimal}
                  </span>
                </p>
                <div className="flex text-custom-yellow text-2xl space-x-1">
                  {renderStars(selectedProduct.rating)}
                </div>
              </div>
            </div>
          </div>

          {/* Thumbnail Products */}
          <div className="lg:w-1/2 space-y-4 pt-4">
            {products.map((product, index) => (
              <div
                key={index}
                onClick={() => handleThumbnailClick(product)}
                className="flex items-center gap-4 p-2 bg-[#2F2F2F] rounded-xl shadow-md cursor-pointer transition-shadow hover:shadow-lg"
              >
                <Image
                  src={product.imageSrc}
                  alt={product.title}
                  width={96}
                  height={96}
                  className="w-24 h-24 object-cover rounded-lg transition-transform duration-200 hover:scale-105"
                />
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold text-white">
                    {product.title}
                  </h3>
                  <p className="text-white">{product.subtitle}</p>
                  <div className="flex text-gray-400 text-lg space-x-1 mt-1">
                    {renderStars(product.rating)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

