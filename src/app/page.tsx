import Navigation from "@/components/sections/navigation";
import HeroSection from "@/components/sections/hero";
import WhyChooseUs from "@/components/sections/why-choose-us";
import CarRentals from "@/components/sections/car-rentals";
import OurSolutions from "@/components/sections/our-solutions";
import AppCTA from "@/components/sections/app-cta";
import Footer from "@/components/sections/footer";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-white">
      <Navigation />
      <main>
        <HeroSection />
        <OurSolutions />
        <WhyChooseUs />
        <CarRentals />
        <AppCTA />
      </main>
      <Footer />
    </div>
  );
}
