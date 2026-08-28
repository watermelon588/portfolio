import { useState, useRef, type MouseEvent } from "react";
import { useMagnetic } from "@/components/motion/useMagnetic";
import "./FeatureShowcase.css";

export interface ShowcaseItem {
  image: string;
  title: string;
  description: string;
  tag?: string;
  objectPosition?: string;
}

export interface FeatureShowcaseProps {
  items: ShowcaseItem[];
  defaultIndex?: number;
  className?: string;
}

export function FeatureShowcase({
  items,
  defaultIndex = 0,
  className = "",
}: FeatureShowcaseProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(
    Math.min(Math.max(defaultIndex, 0), items.length - 1)
  );

  useMagnetic(rootRef, [active]);

  const count = items.length;

  const getCardClass = (index: number) => {
    const diff = index - active;
    if (diff === 0) return "showcase-card--active";
    if (diff === -1 || (active === 0 && index === count - 1))
      return "showcase-card--previous";
    if (diff === 1 || (active === count - 1 && index === 0))
      return "showcase-card--next";
    if (diff === -2 || (active <= 1 && index >= count - 2))
      return "showcase-card--far-left";
    if (diff === 2 || (active >= count - 2 && index <= 1))
      return "showcase-card--far-right";
    return "showcase-card--hidden";
  };

  const handleCardClick = (index: number, e: MouseEvent) => {
    if (index !== active) {
      e.preventDefault();
      setActive(index);
    }
  };

  const activeItem = items[active];

  return (
    <div className={`under-hood-showcase ${className}`} ref={rootRef}>
      <div className="showcase-stage">
        {items.map((item, index) => {
          const cardClass = getCardClass(index);
          return (
            <div
              key={item.title || index}
              className={`showcase-card ${cardClass}`}
              onClick={(e) => handleCardClick(index, e)}
              role="button"
              tabIndex={0}
              aria-label={`View ${item.title}`}
              aria-current={index === active}
            >
              <img
                src={item.image}
                alt={item.title}
                className="showcase-card-img"
                style={item.objectPosition ? { objectPosition: item.objectPosition } : undefined}
              />
            </div>
          );
        })}
      </div>

      {activeItem && (
        <div className="showcase-info">
          {activeItem.tag && (
            <span className="showcase-info-tag">{activeItem.tag}</span>
          )}
          <h3 className="showcase-info-title">{activeItem.title}</h3>
          <p className="showcase-info-desc">{activeItem.description}</p>
        </div>
      )}

      <div className="showcase-controls">
        <span className="showcase-counter">
          0{active + 1} / 0{count}
        </span>
        <div className="showcase-dots">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`showcase-dot ${i === active ? "showcase-dot--active" : ""}`}
              onClick={() => setActive(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default FeatureShowcase;
