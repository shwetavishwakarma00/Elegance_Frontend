import CuratedCategories from "@/components/Curatedcategories ";
import HeroSection from "@/components/HeroSection";
import AdditionalSections from "@/components/AdditionalSections";
import FeaturedProducts from "@/components/FeaturedProducts";
import CartDrawer from "@/components/CartDrawer";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <CuratedCategories />
      <FeaturedProducts />
      <AdditionalSections />
      <CartDrawer />
    </main>
  );
}
