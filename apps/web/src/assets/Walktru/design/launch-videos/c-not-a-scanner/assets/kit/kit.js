// Walkthru launch films: small deterministic helpers on one paused GSAP timeline.
// Everything is a tween of a CSS property (no onUpdate callbacks), so any frame renders the same when seeked.
(function () {
  const STRIP_W = 486, STRIP_H = 480, FRAMES = 24;

  const K = {
    /** Turn an element into Scout (walk strip). h = height in px. */
    scout(el, color = "ink", h = 240) {
      if (!el) throw new Error("K.scout: element not found");
      const w = Math.round((h * STRIP_W) / STRIP_H);
      el.classList.add("scout");
      Object.assign(el.style, {
        width: w + "px", height: h + "px",
        backgroundImage: `url(assets/scout/scout-strip-${color}.png)`,
        backgroundSize: `${w * FRAMES}px ${h}px`,
      });
      el.dataset.w = w;
      return el;
    },

    /** Walk in place for `dur` seconds at 24 drawings a second. Combine with an x tween to travel. */
    walk(tl, el, at, dur, fps = 24) {
      const w = Number(el.dataset.w);
      const n = Math.max(1, Math.round(dur * fps));
      tl.fromTo(el, { backgroundPositionX: 0 }, { backgroundPositionX: -n * w, duration: dur, ease: `steps(${n})` }, at);
    },

    /** Wrap each word (default) or character in an inline-block span with class `w` or `c`. */
    split(el, by = "word") {
      const text = el.textContent;
      el.textContent = "";
      const spans = [];
      for (const p of text.split(/(\s+)/)) {
        if (p === "") continue;
        if (/^\s+$/.test(p)) { el.appendChild(document.createTextNode(p)); continue; } // spaces stay breakable
        if (by === "word") {
          const s = document.createElement("span"); s.className = "w"; s.textContent = p; el.appendChild(s); spans.push(s);
        } else { // characters, grouped per word so a line never breaks inside a word
          const word = document.createElement("span"); word.style.whiteSpace = "nowrap"; word.style.display = "inline-block";
          for (const ch of p) { const s = document.createElement("span"); s.className = "c"; s.textContent = ch; word.appendChild(s); spans.push(s); }
          el.appendChild(word);
        }
      }
      return spans;
    },

    /** Typewriter: characters appear one by one. Returns the end time. */
    type(tl, el, at, cps = 26) {
      const chars = K.split(el, "char");
      tl.set(chars, { opacity: 0 }, 0);
      tl.to(chars, { opacity: 1, duration: 0.01, stagger: 1 / cps }, at);
      return at + chars.length / cps;
    },

    /** Words rise into place, staggered. */
    rise(tl, el, at, opts = {}) {
      const ws = K.split(el, "word");
      tl.fromTo(ws, { yPercent: opts.from ?? 110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: opts.dur ?? 0.55, ease: opts.ease ?? "expo.out", stagger: opts.stagger ?? 0.06 }, at);
      return ws;
    },

    /** Odometer number: digits roll from `from` to `to`. el gets digit columns built inside. */
    odometer(tl, el, at, from, to, dur = 1.2) {
      const digits = String(to).length;
      const f = String(from).padStart(digits, " ");
      el.textContent = "";
      el.classList.add("odo");
      for (let i = 0; i < digits; i++) {
        const col = document.createElement("span");
        col.className = "odo-col";
        const reel = document.createElement("span");
        reel.className = "odo-reel";
        for (let d = 0; d <= 9; d++) { const s = document.createElement("span"); s.textContent = d; reel.appendChild(s); }
        col.appendChild(reel);
        el.appendChild(col);
        const a = f[i] === " " ? 0 : Number(f[i]), b = Number(String(to)[i]);
        tl.fromTo(reel, { yPercent: -a * 10 }, { yPercent: -b * 10, duration: dur, ease: "expo.inOut" }, at + i * 0.06);
      }
    },

    /** Move the cursor element to (x, y) in px, then optionally click (press + release). */
    cursor(tl, el, at, x, y, dur = 0.6, click = false) {
      tl.to(el, { x, y, duration: dur, ease: "power3.inOut" }, at);
      if (click) tl.to(el, { scale: 0.82, duration: 0.08, yoyo: true, repeat: 1, ease: "power1.inOut" }, at + dur);
      return at + dur;
    },

    /** Deterministic pseudo-random in [0,1). */
    rng(seed = 7) {
      let s = seed >>> 0;
      return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
    },

    /** Scene start/duration from the clip's own data attributes (single source of truth). */
    at(id) {
      const el = document.getElementById(id);
      if (!el) throw new Error("K.at: no element #" + id);
      return [Number(el.dataset.start), Number(el.dataset.duration)];
    },
  };

  window.K = K;
})();
