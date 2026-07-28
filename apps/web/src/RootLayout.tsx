import { Outlet } from "react-router";
import { PageTransition } from "./components/motion/PageTransition";

// App shell shared across every route. Hosts the route-change curtain so the
// curved page-name transition plays on any navigation. Individual pages still
// own their own chrome (navbar, preloader, footer).
export function RootLayout() {
  return (
    <>
      <PageTransition />
      <Outlet />
    </>
  );
}

export default RootLayout;
