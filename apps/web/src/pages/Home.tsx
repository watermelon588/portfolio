import { Preloader } from "@/components/motion/Preloader";
import { Navbar } from "@/components/nav/Navbar";
import { HeroReserve } from "@/sections/Hero/HeroReserve";
import { About } from "@/sections/About/About";
import { Work } from "@/sections/Work/Work";
import { Gallery } from "@/sections/Gallery/Gallery";
import { Footer } from "@/sections/Footer/Footer";

// The full hero is being reworked; its space is reserved (HeroReserve) so the
// layout holds and #home stays valid. Below it: About → Work → Gallery → Footer.
export function Home() {
  return (
    <>
      <Preloader />
      <Navbar />
      <main>
        <HeroReserve />
        <About />
        <Work />
        <Gallery />
        <Footer />
      </main>
    </>
  );
}

export default Home;
