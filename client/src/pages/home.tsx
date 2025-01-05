import { About } from "@/components/customs/home/about";
import { Features } from "@/components/customs/home/feature";
import { HeroSection } from "@/components/customs/home/hero-section";
import { NavBar } from "@/components/customs/home/navbar";
import { Metadata } from "@/components/customs/metadata";

export default function Home() {
  return (
    <>
      <Metadata />
      <div className="min-h-screen bg-slate-900 scroll-smooth">
        <NavBar className="p-4 top-0 w-full left-0 z-50 fixed" />
        <HeroSection />
        <Features />
        <About />
      </div>
    </>
  );
}
