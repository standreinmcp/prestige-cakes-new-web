import { CategoryCarousel } from "@/components/home/CategoryCarousel";
import { DifferentiatorsSection } from "@/components/home/DifferentiatorsSection";
import { EventsSection } from "@/components/home/EventsSection";
import { Hero } from "@/components/home/Hero";
import { KitchenSection } from "@/components/home/KitchenSection";
import { ProcessSection } from "@/components/home/ProcessSection";
import { StatsRow } from "@/components/home/StatsRow";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export default function HomePage() {
  return (
    <>
      <div className="relative">
        <Header />
        <Hero />
      </div>
      <StatsRow />
      <CategoryCarousel />
      <ProcessSection />
      <KitchenSection />
      <DifferentiatorsSection />
      <TestimonialsSection />
      <EventsSection />
      <Footer />
    </>
  );
}
