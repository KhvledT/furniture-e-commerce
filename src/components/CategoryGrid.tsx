"use client";

import Image from "next/image";
import category1 from "@/assets/imgs/landing/category/category1.svg";
import category2 from "@/assets/imgs/landing/category/category2.svg";
import category3 from "@/assets/imgs/landing/category/category3.svg";
import category4 from "@/assets/imgs/landing/category/category4.svg";
import category5 from "@/assets/imgs/landing/category/category5.svg";

export default function CategoryGrid() {
  return (
    <section className="bg-[#2F2F2F] flex justify-center items-center">
      <div
        className="
          grid grid-cols-3 gap-4 pt-0
          w-full
          max-w-[1200px]
          px-4 sm:px-4 md:px-8
          transition-all duration-300
        "
      >
        <button className="h-auto row-span-2 rounded-lg">
          <Image
            src={category1}
            alt="Wardrobe"
            width={400}
            height={600}
            className="w-full h-full object-cover rounded-lg hover:scale-102 transition-all duration-300 cursor-pointer"
            loading="lazy"
            quality={80}
          />
        </button>

        <button className="h-auto rounded-lg">
          <Image
            src={category2}
            alt="Table"
            width={400}
            height={300}
            className="w-full h-full object-cover rounded-lg hover:scale-102 transition-all duration-300 cursor-pointer"
            loading="lazy"
            quality={80}
          />
        </button>

        <button className="h-auto row-span-2 rounded-lg">
          <Image
            src={category4}
            alt="Sofa"
            width={400}
            height={600}
            className="w-full h-full object-cover rounded-lg hover:scale-102 transition-all duration-300 cursor-pointer"
            loading="lazy"
            quality={80}
          />
        </button>

        <button className="h-auto rounded-lg">
          <Image
            src={category3}
            alt="Lamp"
            width={400}
            height={300}
            className="w-full h-full object-cover rounded-lg hover:scale-102 transition-all duration-300 cursor-pointer"
            loading="lazy"
            quality={80}
          />
        </button>

        <button className="h-auto col-span-3 rounded-lg">
          <Image
            src={category5}
            alt="Buffet"
            width={1200}
            height={300}
            className="w-full h-full object-cover rounded-lg hover:scale-102 transition-all duration-300 cursor-pointer"
            loading="lazy"
            quality={80}
          />
        </button>
      </div>
    </section>
  );
}
