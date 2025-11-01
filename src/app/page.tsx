import HeroSection from "@/components/HeroSection";
import CategoryHeading from "@/components/CategoryHeading";
import CategoryGrid from "@/components/CategoryGrid";
import BannerSection from "@/components/BannerSection";
import FeaturesSection from "@/components/FeaturesSection";
import BestPicksCarousel from "@/components/BestPicksCarousel";
import SpecialPackage from "@/components/SpecialPackage";
import PageTransition from "@/components/animations/PageTransition";
import ScrollReveal from "@/components/animations/ScrollReveal";

export default function Home() {
  return (
    <PageTransition>
      <main>
        <HeroSection />
        <ScrollReveal delay={0.1}>
          <CategoryHeading />
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <CategoryGrid />
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <BannerSection />
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <FeaturesSection />
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <BestPicksCarousel />
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <SpecialPackage />
        </ScrollReveal>
      </main>
    </PageTransition>
  );
}
