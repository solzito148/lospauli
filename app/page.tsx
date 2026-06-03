import { AboutSection } from "@/components/AboutSection";
import { CartBar } from "@/components/CartBar";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { HowToOrder } from "@/components/HowToOrder";
import { ProductGrid } from "@/components/ProductGrid";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1 pb-24">
        <Hero />
        <ProductGrid />
        <AboutSection />
        <HowToOrder />
        <FAQ />
      </main>
      <Footer />
      <CartBar />
    </>
  );
}
