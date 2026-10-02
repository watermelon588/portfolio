import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from 'react';
import { ChevronLeft, ChevronRight, Grid2X2, RotateCcw, ArrowUpRight, MoveHorizontal } from '../vendor/lucide/index.js';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useReducedMotion } from '../useReducedMotion';
import { JOURNAL_ENTRIES, journalAsset, type JournalEntry } from './journalContent';
import '../source-environment.css';
import './travel-journals.css';

gsap.registerPlugin(useGSAP);

type Style = 'stack' | 'field';
type Turn = { from: number; to: number; direction: 1 | -1 };
const count = JOURNAL_ENTRIES.length;
const folio = (index: number) => String(index + 1).padStart(2, '0');

function Photo({ name, alt, className = '' }: { name: string; alt: string; className?: string }) {
  return <img className={className} src={journalAsset(name)} alt={alt} loading="lazy" decoding="async" draggable={false} />;
}

function CollagePage({ entry, index }: { entry: JournalEntry; index: number }) {
  return (
    <div className={`tj-collage tj-collage--${index % 4}`} style={{ '--page-tint': entry.color } as CSSProperties}>
      <Photo name={entry.photo} alt={entry.alt} className="tj-collage__landscape" />
      <div className="tj-collage__wash" />
      <div className="tj-collage__heading"><span>{entry.subtitle}</span><h3>{entry.title}</h3></div>
      <figure className="tj-collage__snapshot"><Photo name={entry.detail} alt={entry.detailAlt} /><figcaption>a little moment worth keeping</figcaption></figure>
      <figure className="tj-collage__art"><Photo name={entry.art} alt={entry.artAlt} /></figure>
      <p className="tj-collage__note">{entry.note}</p>
      <span className="tj-collage__stamp" aria-hidden="true">TRIP<br />NOTES<br /><b>{folio(index)}</b></span>
      <span className="tj-collage__scribble" aria-hidden="true">wish you were here</span>
      <span className="tj-page-number">{folio(index)} / {folio(count - 1)}</span>
    </div>
  );
}

function FieldPage({ entry, index, side }: { entry: JournalEntry; index: number; side: 'left' | 'right' }) {
  return (
    <div className={`tj-paper tj-paper--${side}`} style={{ '--page-tint': entry.color } as CSSProperties}>
      {side === 'left' ? <>
        <span className="tj-paper__eyebrow">A JOURNAL OF LITTLE ESCAPES</span>
        <h3>{entry.title}</h3>
        <figure className="tj-paper__polaroid"><Photo name={entry.photo} alt={entry.alt} /><figcaption>{entry.subtitle.split(' / ')[1]!.toLowerCase()}</figcaption></figure>
        <figure className="tj-paper__mobile-art"><Photo name={entry.art} alt={entry.artAlt} /></figure>
        <p className="tj-paper__handwriting">{entry.note}</p>
        <span className="tj-paper__margin-note" aria-hidden="true">take the long way ↗</span>
      </> : <>
        <span className="tj-paper__date">COLLECTED ALONG THE WAY / {folio(index)}</span>
        <figure className="tj-paper__art"><Photo name={entry.art} alt={entry.artAlt} /><figcaption>a different way of seeing</figcaption></figure>
        <figure className="tj-paper__detail"><Photo name={entry.detail} alt={entry.detailAlt} /></figure>
        <span className="tj-paper__postmark" aria-hidden="true">A GOOD DAY<br /><b>TO GET LOST</b><br />TRIPVERSE</span>
        <p className="tj-paper__closing">less scrolling,<br /><em>more stories.</em></p>
      </>}
      <span className="tj-page-number">{String(index * 2 + (side === 'left' ? 1 : 2)).padStart(2, '0')}</span>
    </div>
  );
}

/** Each moving leaf has a front and a mirrored back, hinged at the book's spine.
 * The destination sits underneath throughout the turn; React commits it only
 * when the GSAP timeline completes, preventing a content swap mid-animation. */
export function JournalBook({ style, active = true }: { style: Style; active?: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  const leaf = useRef<HTMLDivElement>(null);
  const busy = useRef(false);
  const gesture = useRef<{ x: number; y: number; id: number } | null>(null);
  const swiped = useRef(false);
  const [index, setIndex] = useState(0);
  const [turn, setTurn] = useState<Turn | null>(null);
  const [browse, setBrowse] = useState(false);
  const reduced = useReducedMotion();

  useGSAP(() => {
    if (!turn || !leaf.current) return;
    const finish = () => {
      setIndex(turn.to);
      setTurn(null);
      busy.current = false;
    };
    const angle = turn.direction === 1 ? -180 : 180;
    const timeline = gsap.timeline({ defaults: { ease: 'power2.inOut' }, onComplete: finish });
    timeline.fromTo(leaf.current,
      { rotationY: 0, z: 1 },
      { rotationY: angle, duration: style === 'stack' ? 0.85 : 1.05, force3D: true }, 0);
    timeline.fromTo(leaf.current.querySelector('.tj-leaf__shade'),
      { opacity: 0 }, { opacity: 0.24, duration: 0.42, repeat: 1, yoyo: true }, 0);
    if (style === 'stack') timeline.to(leaf.current, { opacity: 0, duration: 0.2 }, 0.65);
    return () => { busy.current = false; };
  }, { scope: root, dependencies: [turn, style], revertOnUpdate: true });

  // Preload only the adjacent entries, keeping initial home-page traffic small.
  useEffect(() => {
    if (!active) return;
    for (const entry of [JOURNAL_ENTRIES[index - 1], JOURNAL_ENTRIES[index + 1]]) {
      if (!entry) continue;
      for (const name of [entry.photo, entry.detail, entry.art]) {
        const image = new Image();
        image.src = journalAsset(name);
      }
    }
  }, [index, active]);

  const go = (to: number) => {
    if (busy.current || to < 0 || to >= count) return;
    setBrowse(false);
    if (to === index) return;
    if (reduced) { setIndex(to); return; }
    busy.current = true;
    setTurn({ from: index, to, direction: to > index ? 1 : -1 });
  };

  const pointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (!event.isPrimary || (event.pointerType === 'mouse' && event.button !== 0)) return;
    swiped.current = false;
    gesture.current = { x: event.clientX, y: event.clientY, id: event.pointerId };
  };
  const pointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const start = gesture.current;
    gesture.current = null;
    if (!start || start.id !== event.pointerId) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.3) {
      swiped.current = true;
      go(index + (dx < 0 ? 1 : -1));
    }
  };

  const entry = JOURNAL_ENTRIES[index]!;
  const destination = JOURNAL_ENTRIES[turn?.to ?? index]!;
  const previous = turn?.direction === -1;

  return (
    <div ref={root} className={`tj-book tj-book--${style}`} role="region" aria-roledescription="interactive journal"
      aria-label={style === 'stack' ? 'The memory stack journal' : 'The field journal'} tabIndex={0}
      onKeyDown={(event) => {
        if (event.altKey || event.ctrlKey || event.metaKey) return;
        if (event.key === 'ArrowRight') { event.preventDefault(); go(index + 1); }
        if (event.key === 'ArrowLeft') { event.preventDefault(); go(index - 1); }
        if (event.key === 'Home') { event.preventDefault(); go(0); }
        if (event.key === 'End') { event.preventDefault(); go(count - 1); }
      }}>
      <div className="tj-book__masthead">
        <span className="tj-book__edition">{style === 'stack' ? 'THE MEMORY STACK' : 'THE FIELD JOURNAL'}</span>
        <span className="tj-book__collection">PHOTOGRAPHS, DETOURS & LITTLE THINGS</span>
      </div>
      {style === 'stack' && <div className="tj-stack-title"><h3>Journal</h3><span>{count} chapters · a few favorite memories</span></div>}
      <div className="tj-stage" onPointerDown={pointerDown} onPointerUp={pointerUp} onPointerCancel={() => { gesture.current = null; }}>
        {style === 'stack' ? <>
          <div className="tj-fan" aria-hidden="true">
            {([-6, -5, -4, -3, -2, -1, 6, 5, 4, 3, 2, 1]).map((offset) => {
              const position = (index + offset + count) % count;
              return <div key={offset} className="tj-fan__page" style={{ '--offset': offset, '--depth': Math.abs(offset), '--tilt': `${offset * -1.5}deg`, zIndex: 8 - Math.abs(offset) } as CSSProperties}>
                <Photo name={JOURNAL_ENTRIES[position]!.photo} alt="" />
              </div>;
            })}
          </div>
          <div className="tj-stack-page"><CollagePage entry={turn ? destination : entry} index={turn?.to ?? index} /></div>
          {turn && <div ref={leaf} className={`tj-leaf tj-leaf--stack ${previous ? 'tj-leaf--previous' : ''}`} aria-hidden="true">
            <div className="tj-leaf__front"><CollagePage entry={entry} index={index} /><div className="tj-leaf__shade" /></div>
            <div className="tj-leaf__back"><CollagePage entry={destination} index={turn.to} /></div>
          </div>}
        </> : <div className="tj-spread">
          <div className="tj-spread__mobile"><FieldPage entry={turn ? destination : entry} index={turn?.to ?? index} side="left" /></div>
          <div className="tj-spread__left"><FieldPage entry={turn && previous ? destination : entry} index={turn && previous ? turn.to : index} side="left" /></div>
          <div className="tj-spread__right"><FieldPage entry={turn && !previous ? destination : entry} index={turn && !previous ? turn.to : index} side="right" /></div>
          <div className="tj-binding" aria-hidden="true">{Array.from({ length: 13 }, (_, i) => <i key={i} />)}</div>
          {turn && <div ref={leaf} className={`tj-leaf tj-leaf--field ${previous ? 'tj-leaf--previous' : ''}`} aria-hidden="true">
            <div className="tj-leaf__front"><div className="tj-leaf__desktop"><FieldPage entry={entry} index={index} side={previous ? 'left' : 'right'} /></div><div className="tj-leaf__mobile"><FieldPage entry={entry} index={index} side="left" /></div><div className="tj-leaf__shade" /></div>
            <div className="tj-leaf__back"><div className="tj-leaf__desktop"><FieldPage entry={destination} index={turn.to} side={previous ? 'right' : 'left'} /></div><div className="tj-leaf__mobile"><FieldPage entry={destination} index={turn.to} side="left" /></div></div>
          </div>}
        </div>}
        <button className="tj-turn-zone tj-turn-zone--left" tabIndex={-1} disabled={index === 0 || !!turn} aria-label="Turn to previous journal page" onClick={() => { if (!swiped.current) go(index - 1); }} />
        <button className="tj-turn-zone tj-turn-zone--right" tabIndex={-1} disabled={index === count - 1 || !!turn} aria-label="Turn to next journal page" onClick={() => { if (!swiped.current) go(index + 1); }} />
      </div>
      <div className="tj-controls">
        <button disabled={index === 0 || !!turn} onClick={() => go(index - 1)} aria-label="Previous chapter" title="Previous chapter"><ChevronLeft size={18} /></button>
        <button onClick={() => setBrowse(!browse)} aria-label="Browse journal chapters" aria-expanded={browse} aria-controls={`tj-index-${style}`} title="Browse chapters"><Grid2X2 size={16} /></button>
        <button disabled={index === 0 || !!turn} onClick={() => go(0)} aria-label="Back to the first chapter" title="Start over"><RotateCcw size={16} /></button>
        <button disabled={index === count - 1 || !!turn} onClick={() => go(index + 1)} aria-label="Next chapter" title="Next chapter"><ChevronRight size={18} /></button>
      </div>
      <div className="tj-caption"><span aria-live="polite" aria-atomic="true">{folio(index)} / {folio(count - 1)} <b>{entry.title}</b></span><span><MoveHorizontal size={13} /> Swipe or use ← →</span></div>
      <div id={`tj-index-${style}`} className="tj-index" hidden={!browse}>
        {JOURNAL_ENTRIES.map((item, i) => <button key={item.title} aria-label={`Open chapter ${i + 1}: ${item.title}`} aria-pressed={i === index} disabled={!!turn} onClick={() => go(i)}>
          <Photo name={item.photo} alt="" /><span>{folio(i)} <b>{item.title}</b></span>
        </button>)}
      </div>
    </div>
  );
}

export function TravelJournals() {
  return (
    <section className="tj-section" id="travel-journal" aria-labelledby="tj-heading">
      <div className="tv-container">
        <header className="tj-section__header">
          <div><span className="tj-kicker">THE SOUVENIR YOU KEEP</span><h2 id="tj-heading">Keep the feeling.<br /><em>Turn the page.</em></h2></div>
          <div className="tj-section__intro"><p>The views, the wrong turns, the people.<br />A little journal for the things that made the trip.</p><span>Made of moments. Meant to be opened. <ArrowUpRight size={16} /></span></div>
        </header>
      </div>
      <div className="tj-band tj-band--stack">
        <div className="tv-container"><JournalBook style="stack" /></div>
      </div>
      <div className="tj-band tj-band--field">
        <div className="tv-container"><JournalBook style="field" /></div>
      </div>
      <div className="tv-container">
        <div className="tj-section__footer"><span>A FEW PAGES FROM THE WORLD OUTSIDE.</span><span>Leave a little room for the unexpected.</span></div>
      </div>
    </section>
  );
}
