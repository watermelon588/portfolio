import { Navbar } from "@/components/nav/Navbar";
import { Preloader } from "@/components/motion/Preloader";
// TEMPORARY scaffold host — NOT a designed screen. Renders approved components
// in isolation for testing (Phase 2, one at a time). Real pages compose
// sections/* per FOLDER_STRUCTURE.

export function ScaffoldBoot({ note }: { note?: string }) {
  if (note && import.meta.env.DEV) {
    console.log(`[ScaffoldBoot] ${note}`);
  }
  return (
    <>
      <Preloader text="Ask" />
      <Navbar />
    </>
  );
}
