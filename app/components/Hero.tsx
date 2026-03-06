"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const titles = [
  "Discord Bot Developer",
  "Crypto Developer (Solana)",
  "Chill Guy"
];

export default function Hero() {
  const [titleIdx, setTitleIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = titles[titleIdx];
    const speed = deleting ? 40 : 90;

    const t = setTimeout(() => {
      if (!deleting) {
        if (displayed.length < current.length) {
          setDisplayed(current.slice(0, displayed.length + 1));
        } else {
          setTimeout(() => setDeleting(true), 2200);
        }
      } else {
        if (displayed.length > 0) {
          setDisplayed(displayed.slice(0, -1));
        } else {
          setDeleting(false);
          setTitleIdx((p) => (p + 1) % titles.length);
        }
      }
    }, speed);

    return () => clearTimeout(t);
  }, [displayed, deleting, titleIdx]);

  return (
    <section className="relative min-h-screen flex items-center justify-center grid-pattern overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 rounded-full bg-white/2 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-white/1.5 blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/1.5 blur-3xl pointer-events-none" />

      <div className="absolute top-24 left-6 font-mono text-[10px] text-white/15 leading-relaxed hidden lg:block">
        <div>{"// v1.0.0-stable"}</div>
        <div>{"// env: production"}</div>
        <div>{"// build: success"}</div>
        <div>{"// best friend: Vishnya"}</div>
      </div>

      <div className="text-center z-10 px-6 max-w-4xl mx-auto">
        <div
          className="font-mono text-xs text-white/30 mb-8 animate-fade-in-up"
          style={{ animationDelay: "0.1s", opacity: 0 }}
        >
          <span className="text-white/20">root@dev:~$</span>{" "}
          <span className="text-white/50">whoami</span>
        </div>

        <h1
          className="font-mono text-5xl md:text-9xl font-bold mb-6 tracking-tight glitch-text animate-fade-in-up"
          data-text="qkogarashi"
          style={{ animationDelay: "0.2s", opacity: 0 }}
        >
          qkogarashi
        </h1>

        <div
          className="h-10 mb-8 flex items-center justify-center animate-fade-in-up"
          style={{ animationDelay: "0.35s", opacity: 0 }}
        >
          <span className="font-mono text-xl md:text-2xl text-white/55">
            {displayed}
            <span className="animate-blink text-white ml-0.5">|</span>
          </span>
        </div>

        <p
          className="text-white/35 font-mono text-sm max-w-lg mx-auto mb-12 leading-7 animate-fade-in-up"
          style={{ animationDelay: "0.5s", opacity: 0 }}
        >
          Building bots for{" "}
          <span className="text-white/70 font-semibold">Discord/Telegram</span>.
          Creating crypto software.{" "}
          <span className="text-white/50">I love Rust.rs and money.</span>
        </p>

        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-3 animate-fade-in-up"
          style={{ animationDelay: "0.65s", opacity: 0 }}
        >
          <Link
            href="https://github.com/qkogarashi"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-7 py-3 bg-white text-black font-mono text-sm font-semibold hover:bg-white/90 transition-all duration-200 rounded"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub
          </Link>
          <button
            onClick={() =>
              document
                .getElementById("contacts")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="flex items-center gap-2 px-7 py-3 border border-white/20 text-white/70 font-mono text-sm hover:text-white hover:border-white/40 hover:bg-white/5 transition-all duration-200 rounded"
          >
            ./contact
          </button>
          <button
            onClick={() =>
              document
                .getElementById("music")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="flex items-center gap-2 px-7 py-3 border border-white/10 text-white/40 font-mono text-sm hover:text-white/70 hover:border-white/25 transition-all duration-200 rounded"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
            </svg>
            music
          </button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className="flex flex-col items-center gap-2">
          <span className="font-mono text-[10px] text-white/25 uppercase tracking-widest">
            scroll
          </span>
          <div className="w-px h-10 bg-linear-to-b from-white/25 to-transparent" />
        </div>
      </div>
    </section>
  );
}
