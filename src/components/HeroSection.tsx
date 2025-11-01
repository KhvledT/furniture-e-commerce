import Image from "next/image";
import HeroBanner from "@/assets/imgs/landing/herosection.svg";

export default function HeroSection() {
  return (
    <section className="relative">
      <Image
        src={HeroBanner}
        alt="Hero banner"
        width={1920}
        height={600}
        className="w-full h-auto"
        priority
        quality={85}
      />
      <button
        className="absolute top-[58%] left-[8%] bg-[#f1b345] hover:bg-[#dca02d] transition text-white text-[9.89px] md:text-[36px] font-[400] leading-[120%] px-[4%] py-2"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        shop now
      </button>
    </section>
  );
}

