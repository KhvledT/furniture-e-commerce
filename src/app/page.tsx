import HeroSection from "@/components/HeroSection";
import CategoryHeading from "@/components/CategoryHeading";
import CategoryGrid from "@/components/CategoryGrid";
import BannerSection from "@/components/BannerSection";
import FeaturesSection from "@/components/FeaturesSection";
import BestPicksCarousel from "@/components/BestPicksCarousel";
import SpecialPackage from "@/components/SpecialPackage";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <CategoryHeading />
      <CategoryGrid />
      <BannerSection />
      <FeaturesSection />
      <BestPicksCarousel />
      <SpecialPackage />
    </main>
  );
}
