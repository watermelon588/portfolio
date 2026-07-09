// TEMPORARY scaffold placeholder — NOT a designed screen.
// Confirms the app boots and tokens are wired. Replaced entirely in Phase 2/3
// once the design system is approved (DESIGN_SYSTEM.md Part X). Do not build
// on top of this; real pages compose sections/* per FOLDER_STRUCTURE.md.

export function ScaffoldBoot({ note }: { note?: string }) {
  return (
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
        <p style={{ margin: 0, fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.5 }}>
          Phase 1 · Scaffold
        </p>
        <h1 style={{ margin: "0.5rem 0", fontSize: "1.5rem", fontWeight: 500 }}>
          Rohit Maity — Portfolio
        </h1>
        <p style={{ margin: 0, opacity: 0.6 }}>
          Frontend boots. Design implementation is gated on approval.
        </p>
        {note ? <p style={{ marginTop: "1rem", color: "var(--accent)" }}>{note}</p> : null}
      </div>
    </main>
  );
}
