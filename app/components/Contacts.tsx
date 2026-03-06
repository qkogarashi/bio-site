"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const socials = [
  {
    label: "GitHub",
    handle: "@qkogarashi",
    href: "https://github.com/qkogarashi",
    description: "Code, projects & open source",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "Favourite Discord Server",
    handle: "Haru",
    href: "https://discord.gg/haru",
    description: "Bot development & community",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.1 18.08.115 18.1.138 18.11a19.9 19.9 0 0 0 5.993 3.03.077.077 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
      </svg>
    ),
  },
  {
    label: "Telegram",
    handle: "@a_anbu",
    href: "https://t.me/a_anbu",
    description: "Direct messages",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    ),
  },
];

export default function Contacts() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach(
          (e) => e.isIntersecting && e.target.classList.add("visible"),
        ),
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="contacts"
      ref={sectionRef}
      className="section-animate py-32 px-6 max-w-6xl mx-auto"
    >
      <div className="flex items-center gap-4 mb-16">
        <span className="font-mono text-xs text-white/25 uppercase tracking-widest">
          05
        </span>
        <div className="flex-1 h-px bg-white/8" />
        <span className="font-mono text-xs text-white/25 uppercase tracking-widest">
          contacts
        </span>
      </div>

      <div className="grid lg:grid-cols-2 gap-16 items-start">
        <div>
          <h2 className="text-5xl font-bold mb-6 leading-tight">
            Let&apos;s coding
            <br />
            <span className="text-white/40">something.</span>
          </h2>
          <p className="text-white/45 font-mono text-sm leading-8 mb-8 max-w-sm">
            Open to freelance work, interesting projects, collaborations, and
            anything crypto.
          </p>

          <div className="flex items-center gap-3 border border-white/10 p-4 w-fit">
            <div className="relative">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <div className="absolute inset-0 rounded-full bg-emerald-500/40 animate-ping" />
            </div>
            <Link
              href={"https://t.me/a_anbu"}
              target={"_blank"}
              rel={"noopener noreferrer"}
              className="text-white/20 hover:text-white/60 transition-colors"
              aria-label={`Contact`}
            >
              <span className="font-mono text-sm text-white">
                Contact me in Telegram
              </span>
            </Link>
          </div>

          <div className="mt-10 border-l border-white/15 pl-5">
            <p className="font-mono text-xs text-white/30 italic leading-6">
              &ldquo;Paid shit money — got a shitty job done&rdquo;
            </p>
            <p className="font-mono text-[10px] text-white/20 mt-2">
              — Vyshnya & qkogarashi
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {socials.map((s) => (
            <div
              key={s.label}
              className="group border border-white/8 hover:border-white/20 hover:bg-white/2 transition-all duration-200 flex items-center gap-4 px-5 py-4"
            >
              <div className="text-white/30 group-hover:text-white/70 transition-colors shrink-0">
                {s.icon}
              </div>

              <div className="flex-1 min-w-0">
                <div className="font-mono text-[10px] text-white/25 uppercase tracking-widest mb-0.5">
                  {s.label}
                </div>
                <div className="font-mono text-sm text-white/60 group-hover:text-white/90 transition-colors truncate">
                  {s.handle}
                </div>
                <div className="font-mono text-[10px] text-white/20 mt-0.5">
                  {s.description}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Link
                  href={s.href}
                  target={"_blank"}
                  rel={"noopener noreferrer"}
                  className="p-1.5 text-white/20 hover:text-white/60 transition-colors"
                  aria-label={`Open ${s.label}`}
                >
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
