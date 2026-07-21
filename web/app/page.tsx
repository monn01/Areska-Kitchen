import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { StickyMobileCta } from "@/components/ui/StickyMobileCta";
import { Hero } from "@/components/sections/Hero";
import { TrustIndicators } from "@/components/sections/TrustIndicators";
import { About } from "@/components/sections/About";
import { TrustedBy } from "@/components/sections/TrustedBy";
import { MenuCta } from "@/components/sections/MenuCta";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pb-20 lg:pb-0">
        <Hero />
        <TrustIndicators />
        <About />
        <TrustedBy />
        <MenuCta />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <StickyMobileCta />
    </>
  );
}
