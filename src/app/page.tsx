import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import SilkCurtainIntro from "@/components/SilkCurtainIntro";
import HeroSection from "@/components/HeroSection";
import SixMoodsSection from "@/components/SixMoodsSection";
import TryTheLookSection from "@/components/TryTheLookSection";
import PickASilkSection from "@/components/PickASilkSection";
import TheRackSection from "@/components/TheRackSection";
import DrapedInDevotionSection from "@/components/DrapedInDevotionSection";
import MuseFilmSection from "@/components/MuseFilmSection";
import MuseReelsSection from "@/components/MuseReelsSection";
import BridalCollectionSection from "@/components/BridalCollectionSection";
import ThreeSilksWeaveSection from "@/components/ThreeSilksWeaveSection";
import TheWeaveFooter from "@/components/TheWeaveFooter";
import GoldTicker from "@/components/GoldTicker";

const StoreDrawers = dynamic(() => import("@/components/StoreDrawers"));

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-white text-[#141110]">
      <SilkCurtainIntro />
      <Navbar />
      <HeroSection />
      <SixMoodsSection />
      <TryTheLookSection />
      <PickASilkSection />
      <TheRackSection />
      <DrapedInDevotionSection />
      <MuseFilmSection />
      <MuseReelsSection />
      <BridalCollectionSection />
      <ThreeSilksWeaveSection />
      <TheWeaveFooter />
      <GoldTicker sticky />
      <StoreDrawers />
    </main>
  );
}
