import { Preloader } from "@/components/motion/Preloader";
import { Navbar } from "@/components/nav/Navbar";
import { Hero } from "@/sections/Hero/Hero";
import { About } from "@/sections/About/About";

export function Home() {
  return (
    <>
      <Preloader />
      <Navbar />
      <main>
        <Hero />
        <About />
      </main>
    </>
  );
}

export default Home;
