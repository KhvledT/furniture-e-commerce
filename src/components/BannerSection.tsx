import Image from "next/image";
import Banner from "@/assets/imgs/landing/whyUs.png";

export default function BannerSection() {
  return (
    <section className="bg-[#2F2F2F] py-10">
      <div className="relative">
        <Image
          src={Banner}
          alt="Promotional banner"
          width={1400}
          height={400}
          className="w-full h-auto"
          loading="lazy"
          quality={80}
        />
      </div>
    </section>
  );
}

