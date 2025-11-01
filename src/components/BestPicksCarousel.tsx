"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import BestpicksImage1 from "@/assets/imgs/landing/BestPicksImage/BestPicksImage1.png";
import BestpicksImage2 from "@/assets/imgs/landing/BestPicksImage/BestPicksImage2.png";
import BestpicksImage3 from "@/assets/imgs/landing/BestPicksImage/BestPicksImage3.png";
import BestpicksImage4 from "@/assets/imgs/landing/BestPicksImage/BestPicksImage4.png";
import BestpicksImage5 from "@/assets/imgs/landing/BestPicksImage/BestPicksImage5.png";
import BestpicksImage6 from "@/assets/imgs/landing/BestPicksImage/BestPicksImage6.png";

const products = [
  {
    image: BestpicksImage1.src,
    name: "Classic Heater",
    price: "$59.99",
    desc: "A warm and cozy classic heater for your living room.",
  },
  {
    image: BestpicksImage2.src,
    name: "Modern Lamp",
    price: "$45.00",
    desc: "A sleek and modern lamp with a minimalist design.",
  },
  {
    image: BestpicksImage3.src,
    name: "Rustic Lantern",
    price: "$35.00",
    desc: "Rustic lantern perfect for indoor and outdoor use.",
  },
  {
    image: BestpicksImage4.src,
    name: "Wooden Table",
    price: "$89.00",
    desc: "A beautiful handmade wooden coffee table.",
  },
  {
    image: BestpicksImage5.src,
    name: "Oak Wardrobe",
    price: "$120.00",
    desc: "A sturdy wardrobe made from durable oak.",
  },
  {
    image: BestpicksImage6.src,
    name: "Small Nightstand",
    price: "$49.00",
    desc: "Compact and stylish nightstand for modern rooms.",
  },
];

export default function BestPicksCarousel() {
  const [api, setApi] = useState<any>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section className="bg-[#2F2F2F] text-white font-sans">
      <div className="py-12 px-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold">Our Best Picks</h2>
          <p className="text-gray-300">
            High Quality Furniture Assembled Can Change As Your Life Change
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {products.map((product, index) => (
                <CarouselItem
                  key={index}
                  className="pl-2 md:pl-4 basis-full md:basis-1/2"
                >
                  <div className="flex flex-col md:flex-row md:flex-row-reverse items-center justify-between gap-4 p-6 bg-transparent rounded-2xl min-h-[280px]">
                    {/* Image */}
                    <div className="bg-[#4a4a4a] p-4 rounded-2xl flex justify-center items-center w-[230px] h-[230px] flex-shrink-0">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={200}
                        height={200}
                        className="w-full h-full object-contain rounded-xl"
                        loading="lazy"
                        quality={75}
                      />
                    </div>

                    {/* Text */}
                    <div className="max-w-[280px] text-white flex flex-col gap-2">
                      <h3 className="text-xl mb-2">{product.name}</h3>
                      <p className="text-sm text-[#ccc] mb-2">{product.desc}</p>
                      <span className="text-[#fbbf24] font-bold text-lg mb-2">
                        {product.price}
                      </span>
                      <button className="bg-[#fbbf24] hover:bg-[#ffd65a] transition text-[#222] font-bold border-none rounded-lg py-2.5 px-5 cursor-pointer w-fit hover:scale-105">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Custom navigation with thumbnails */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={() => api?.scrollPrev()}
              className="text-white text-lg hover:text-amber-400 transition"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="flex gap-2 overflow-x-auto justify-center flex-nowrap scrollbar-hide">
              {products.map((product, index) => (
                <button
                  key={index}
                  onClick={() => api?.scrollTo(index)}
                  className={`flex-shrink-0 transition-opacity ${
                    current === index
                      ? "opacity-100 border-2 border-[#fbbf24] p-0.5 rounded-xl"
                      : "opacity-80 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={60}
                    height={60}
                    className="w-[60px] h-[60px] md:w-[60px] md:h-[60px] object-contain rounded-lg"
                    loading="lazy"
                    quality={70}
                  />
                </button>
              ))}
            </div>

            <button
              onClick={() => api?.scrollNext()}
              className="text-white text-lg hover:text-amber-400 transition"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

