"use client";

import { useEffect, useRef } from "react";

const stats = [
  { label: "Years coding", value: "3+" },
  { label: "Discord bots", value: "20+" },
  { label: "Crypto projects", value: "3+" },
  { label: "Commits", value: "900+" },
];

const timeline = [
  {
    year: "2022",
    event: "Started coding journey — Translate and fix bugs in public github bots",
  },
  {
    year: "2023",
    event: "Started coding journey — JavaScript",
  },
  {
    year: "2023",
    event: "Built first Discord bot for Elysium community server",
  },
  {
    year: "2024",
    event: "Expanded to TypeScript",
  },
  {
    year: "2024",
    event: "Many project on TypeScript in Discord and Telegram",
  },
  {
    year: "2025",
    event: "Studying Nest and NextJS",
  },
  {
    year: "2025",
    event: "Learning Rust.rs",
  },
  {
    year: "2025",
    event: "Building crypto-software products",
  },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="section-animate py-32 px-6 max-w-6xl mx-auto">
      <div className="flex items-center gap-4 mb-16">
        <span className="font-mono text-xs text-white/25 uppercase tracking-widest">01</span>
        <div className="flex-1 h-px bg-white/8" />
        <span className="font-mono text-xs text-white/25 uppercase tracking-widest">about</span>
      </div>

      <div className="grid lg:grid-cols-5 gap-16">
        <div className="lg:col-span-3 space-y-8">
          <h2 className="text-5xl font-bold leading-tight">
            Who I am
          </h2>

          <div className="space-y-5 text-white/50 leading-8 text-[15px]">
            <p>
              Developer focused on bots, scripts and blockchain tech.
              Now i build Discord bots for the{" "}
              <span className="text-white font-semibold font-mono">Haru</span>{" "}
              server — from utility tools to economy and moderation systems.
            </p>
            <p>
              On the crypto side, I craft software for market analysis,
              transaction automation. Smart contracts,
              trading bots, on-chain tooling.
            </p>
          </div>

          <div className="border border-white/10 rounded overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/8 bg-white/2">
              <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
              <div className="w-2.5 h-2.5 rounded-full bg-white/15" />
              <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
              <span className="font-mono text-xs text-white/25 ml-2">bash</span>
            </div>
            <div className="p-5 font-mono text-xs leading-6">
              <div className="text-white/30">
                <span className="text-white/50">$</span> cat profile.json
              </div>
              <div className="text-white/60 mt-2">
                <span className="text-white/40">{"{"}</span>
                <div className="pl-4">
                  <div>
                    <span className="text-white/50">&quot;role&quot;</span>
                    <span className="text-white/30">: </span>
                    <span className="text-white">&quot;Developer&quot;</span>
                    <span className="text-white/30">,</span>
                  </div>
                  <div>
                    <span className="text-white/50">&quot;focus&quot;</span>
                    <span className="text-white/30">: </span>
                    <span className="text-white">[&quot;Crypto&quot;, &quot;Discord bots&quot;]</span>
                    <span className="text-white/30">,</span>
                  </div>
                  <div>
                    <span className="text-white/50">&quot;location&quot;</span>
                    <span className="text-white/30">: </span>
                    <span className="text-white">&quot;Russia, UTC+3&quot;</span>
                    <span className="text-white/30">,</span>
                  </div>
                  <div>
                    <span className="text-white/50">&quot;status&quot;</span>
                    <span className="text-white/30">: </span>
                    <span className="text-white">&quot;working&quot;</span>
                  </div>
                </div>
                <span className="text-white/40">{"}"}</span>
              </div>
              <div className="text-white/25 mt-3">
                <span className="text-white/40">$</span>{" "}
                <span className="animate-blink">_</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-8">
          <div className="grid grid-cols-2 gap-3">
            {stats.map((s) => (
              <div
                key={s.label}
                className="border border-white/10 p-5 hover:border-white/20 hover:bg-white/2 transition-all duration-300 group"
              >
                <div className="font-mono text-3xl font-bold text-white mb-1.5 group-hover:scale-105 transition-transform origin-left">
                  {s.value}
                </div>
                <div className="font-mono text-[10px] text-white/30 uppercase tracking-widest">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          <div className="border border-white/10 p-4 flex items-center gap-3 bg-white/1.5">
            <div className="w-2 h-2 rounded-full bg-white animate-pulse-slow shrink-0" />
            <div className="font-mono text-xs">
              <div className="text-white text-sm">Available for work</div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="font-mono text-[10px] text-white/30 uppercase tracking-widest mb-4">
              Timeline
            </div>
            {timeline.map((item, i) => (
              <div key={i} className="flex gap-4 group">
                <div className="flex flex-col items-center">
                  <div className="font-mono text-[10px] text-white/30 w-10 shrink-0 mt-0.5">
                    {item.year}
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <div className="w-px self-stretch bg-white/8 shrink-0 relative ml-1">
                    <div className="absolute top-1.5 -left-0.75 w-1.5 h-1.5 rounded-full border border-white/25 bg-black group-hover:bg-white/20 transition-colors" />
                  </div>
                  <p className="font-mono text-xs text-white/45 group-hover:text-white/65 transition-colors leading-relaxed pb-2">
                    {item.event}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
