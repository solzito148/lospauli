import { AboutSection } from "@/components/AboutSection";
import { CartBar } from "@/components/CartBar";
import { CartCatalogSync } from "@/components/CartCatalogSync";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { HowToOrder } from "@/components/HowToOrder";
import { ProductGrid } from "@/components/ProductGrid";
import { getProducts } from "@/lib/products";

export default async function Home() {
  const products = await getProducts();

  return (
    <>
      <CartCatalogSync products={products} />
      <Header />
      <main className="flex-1">
        <Hero />
        <ProductGrid products={products} />
        <AboutSection />
        <HowToOrder />
        <FAQ />
      </main>
      <Footer />
      <CartBar />
    </>
  );
}
