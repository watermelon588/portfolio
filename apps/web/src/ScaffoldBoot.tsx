import { Navbar } from "@/components/nav/Navbar";

// TEMPORARY scaffold host — NOT a designed screen. Renders approved components
// in isolation for testing (Phase 2, one at a time). Real pages compose
// sections/* per FOLDER_STRUCTURE.

export function ScaffoldBoot({ note }: { note?: string }) {
  return (
    <>
      <Navbar />
      <main
        style={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          padding: "2rem",
          textAlign: "center",
        }}
      >
        <div>
          <p
            style={{
              margin: 0,
              fontSize: "0.75rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              opacity: 0.5,
            }}
          >
            Phase 2 · Styleguide
          </p>
          <h1 style={{ margin: "0.5rem 0", fontSize: "1.5rem", fontWeight: 500 }}>
            Navbar + Staggered Menu
          </h1>
          <p style={{ margin: 0, opacity: 0.6 }}>Open the Menu (top-right) to test it.</p>
          {note ? <p style={{ marginTop: "1rem", color: "var(--accent)" }}>{note}</p> : null}
        </div>
      </main>
    </>
  );
}
