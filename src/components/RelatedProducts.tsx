import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import type { Product } from "@/lib/products";

interface RelatedProductsProps {
  products: Product[];
  currentProductId: string;
}

export default function RelatedProducts({ products, currentProductId }: RelatedProductsProps) {
  if (products.length === 0) {
    return null;
  }

  return (
    <section className="bg-[#2F2F2F] text-white py-16 px-4 md:px-8">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            You May Also Like
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="group bg-[#4A4A4A] rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105"
              >
                {/* Image Container */}
                <div className="relative bg-[#E3E3E39C] p-4 rounded-t-xl aspect-square flex items-center justify-center">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    width={200}
                    height={200}
                    className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                    quality={75}
                  />
                  {/* Rating Badge */}
                  <div className="absolute bottom-3 right-3 bg-[#FFF8E1] text-black text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span>{product.rating.toFixed(1)}</span>
                  </div>
                </div>

                {/* Info Container */}
                <div className="p-4">
                  <h3 className="text-white font-semibold text-sm truncate" title={product.name}>
                    {product.name}
                  </h3>
                  <p className="text-white font-bold text-base mt-2">${product.price.toFixed(2)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
  );
}
