import CuratedCategories from "@/components/Curatedcategories ";
import HeroSection from "@/components/HeroSection";
import AdditionalSections from "@/components/AdditionalSections";
import FeaturedProducts from "@/components/FeaturedProducts";
import CartDrawer from "@/components/CartDrawer";
import DbCategorySection from "@/components/DbCategorySection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <CuratedCategories />
      <DbCategorySection />
      <FeaturedProducts />
      <AdditionalSections />
      <CartDrawer />
    </main>
  );
}
