import { Outlet } from "react-router";
import { PageTransition } from "./components/motion/PageTransition";
import { SmoothScroll } from "./components/motion/SmoothScroll";

// App shell shared across every route. Hosts site-wide smooth scroll + the
// route-change curtain. Individual pages still own their chrome (navbar,
// preloader, footer).
export function RootLayout() {
  return (
    <>
      <SmoothScroll />
      <PageTransition />
      <Outlet />
    </>
  );
}

export default RootLayout;
