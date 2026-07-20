import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { Hero } from "@/components/sections/Hero";
import { TrustIndicators } from "@/components/sections/TrustIndicators";
import { About } from "@/components/sections/About";
import { TrustedBy } from "@/components/sections/TrustedBy";
import { Menu } from "@/components/sections/Menu";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustIndicators />
        <About />
        <TrustedBy />
        <Menu />
      </main>
      <Footer />
    </>
  );
}
