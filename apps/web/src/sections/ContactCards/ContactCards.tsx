import React from "react";
import "./ContactCards.css";

export interface ContactCardProps {
  icon: React.ReactNode;
  title: string;
  url: string;
  href: string;
  theme?: "accent" | "dark" | "light";
}

export function ContactCard({ icon, title, url, href, theme = "light" }: ContactCardProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`contact-card contact-card--${theme} magnetic`}
      data-strength="20"
      aria-label={`Contact via ${title}`}
    >
      <div className="contact-card-header">
        <div className="contact-card-icon">{icon}</div>
      </div>
      <div className="contact-card-line-wrapper">
        <div className="contact-card-line"></div>
      </div>
      <div className="contact-card-footer">
        <span className="contact-card-url">{url}</span>
      </div>
    </a>
  );
}

export function ContactCards() {
  const cards = [
    {
      title: "LinkedIn",
      url: "linkedin.com/in/qorryadj",
      href: "https://linkedin.com/in/rohitmaity",
      theme: "accent" as const,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="icon-svg">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
    },
    {
      title: "Email",
      url: "qorryadj@gmail.com",
      href: "mailto:maityrohit021@gmail.com",
      theme: "dark" as const,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="icon-svg">
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      ),
    },
    {
      title: "Github",
      url: "behance.net/qorryadj",
      href: "https://github.com/rohitmaity",
      theme: "light" as const,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="icon-svg">
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="contact-cards-grid">
      {cards.map((card) => (
        <ContactCard
          key={card.title}
          title={card.title}
          url={card.url}
          href={card.href}
          theme={card.theme}
          icon={card.icon}
        />
      ))}
    </div>
  );
}
