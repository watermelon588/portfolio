import ScrollReveal from "@/components/vendor/reactbits/ScrollReveal/ScrollReveal";
import "./About.css";

export function About() {
  return (
    <section className="about section" id="about">
      <div className="about-grid container">
        <div className="about-statement">
          <ScrollReveal
            containerClassName="about-reveal"
            baseOpacity={0.12}
            baseRotation={4}
            blurStrength={8}
            wordAnimationEnd="bottom center+=20%"
            rotationEnd="bottom center+=20%"
          >
            Helping brands to stand out in the digital era. Together we will set the new status quo. No nonsense, always on the cutting edge.
          </ScrollReveal>
        </div>
        <div className="about-copy">
          <p className="about-copy-text">
            The combination of my passion for design, code &amp; interaction positions me in a unique place in the web design world.
          </p>
        </div>
      </div>
    </section>
  );
}
export default About;
