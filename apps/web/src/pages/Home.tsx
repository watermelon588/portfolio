import { Preloader } from "@/components/motion/Preloader";
import { Navbar } from "@/components/nav/Navbar";
import { Hero } from "@/sections/Hero/Hero";
import { About } from "@/sections/About/About";
import { Work } from "@/sections/Work/Work";
import { Gallery } from "@/sections/Gallery/Gallery";
import { Footer } from "@/sections/Footer/Footer";

export function Home() {
  return (
    <>
      <Preloader />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Work />
        <Gallery />
        <Footer />
      </main>
    </>
  );
}

export default Home;

