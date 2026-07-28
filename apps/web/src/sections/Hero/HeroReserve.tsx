import "./HeroReserve.css";

// Reserved home/hero space. The Hero was pulled for a redesign, but its area is
// kept (per Rohit) so the layout doesn't collapse under the fixed navbar and the
// `#home` anchor stays valid. Intentionally empty — the reworked hero mounts here.
export function HeroReserve() {
  return <section className="hero-reserve" id="home" aria-hidden="true" />;
}

export default HeroReserve;
