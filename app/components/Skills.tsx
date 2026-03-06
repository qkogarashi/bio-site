"use client";

import { useEffect, useRef } from "react";

const icons = {
  languages: (
    <svg
      viewBox="0 0 24 24"
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        d="M8 7L4 12l4 5M16 7l4 5-4 5M10 20l4-16"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  bots: (
    <svg
      viewBox="0 0 24 24"
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <rect
        x="4"
        y="7"
        width="16"
        height="12"
        rx="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M9 7V5h6v2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="9" cy="13" r="1" fill="currentColor" stroke="none" />
      <circle cx="15" cy="13" r="1" fill="currentColor" stroke="none" />
      <path d="M8 17h8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  blockchain: (
    <svg
      viewBox="0 0 24 24"
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path d="M12 2l7 4v8l-7 4-7-4V6l7-4z" strokeLinejoin="round" />
      <path d="M12 6l4 2.3v4.7L12 15l-4-2.3V8.3L12 6z" strokeLinejoin="round" />
    </svg>
  ),
  backend: (
    <svg
      viewBox="0 0 24 24"
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <rect x="4" y="4" width="16" height="6" rx="1.5" strokeLinejoin="round" />
      <rect
        x="4"
        y="14"
        width="16"
        height="6"
        rx="1.5"
        strokeLinejoin="round"
      />
      <path d="M8 7h.01M8 17h.01" strokeLinecap="round" />
    </svg>
  ),
  frontend: (
    <svg
      viewBox="0 0 24 24"
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <rect x="3" y="5" width="18" height="14" rx="2" strokeLinejoin="round" />
      <path d="M3 9h18M7 13h6M7 16h10" strokeLinecap="round" />
    </svg>
  ),
  devops: (
    <svg
      viewBox="0 0 24 24"
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <circle cx="12" cy="12" r="3" strokeLinejoin="round" />
      <path
        d="M12 2v3M12 19v3M2 12h3M19 12h3M4.6 4.6l2.1 2.1M17.3 17.3l2.1 2.1M19.4 4.6l-2.1 2.1M6.7 17.3l-2.1 2.1"
        strokeLinecap="round"
      />
    </svg>
  ),
};

const skillGroups = [
  {
    category: "Languages",
    icon: "languages",
    skills: ["TypeScript", "Rust", "JavaScript", "Java"],
  },
  {
    category: "Bot Development",
    icon: "bots",
    skills: ["discord.js", "discordx"],
  },
  {
    category: "Blockchain & Crypto",
    icon: "blockchain",
    skills: ["ethers.js", "Web3", "solana", "polymarket"],
  },
  {
    category: "Backend",
    icon: "backend",
    skills: ["Node.js", "Express", "PostgreSQL", "REST API", "Spring (future)"],
  },
  {
    category: "Frontend",
    icon: "frontend",
    skills: ["React", "Next.js", "Tailwind CSS", "HTML/CSS", "TypeScript"],
  },
  {
    category: "DevOps & Tools",
    icon: "devops",
    skills: ["Docker", "Linux", "Git", "Nginx", "SSH"],
  },
];

const proficiency = [
  { label: "TypeScript / JS", level: 70 },
  { label: "Rust", level: 15 },
  { label: "Discord Bots", level: 95 },
  { label: "Blockchain / DeFi", level: 10 },
  { label: "SQL & Databases", level: 50 },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const barsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const bars = e.target.querySelectorAll<HTMLElement>(".skill-bar-fill");
            bars.forEach((bar) => {
              const target = bar.dataset.width;
              setTimeout(() => {
                bar.style.width = target || "0%";
              }, 200);
            });
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.3 },
    );

    if (barsRef.current) observer.observe(barsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="section-animate py-32 px-6 max-w-6xl mx-auto"
    >
      <div className="flex items-center gap-4 mb-16">
        <span className="font-mono text-xs text-white/25 uppercase tracking-widest">
          02
        </span>
        <div className="flex-1 h-px bg-white/8" />
        <span className="font-mono text-xs text-white/25 uppercase tracking-widest">
          skills
        </span>
      </div>

      <div className="grid lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2">
          <h2 className="text-5xl font-bold mb-12 leading-tight">Tech Stack</h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {skillGroups.map((group) => (
              <div
                key={group.category}
                className="border border-white/8 p-5 hover:border-white/18 hover:bg-white/2 transition-all duration-300 group rounded-sm"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-white/30">
                    {icons[group.icon as keyof typeof icons]}
                  </span>
                  <span className="font-mono text-[10px] text-white/35 uppercase tracking-widest group-hover:text-white/55 transition-colors">
                    {group.category}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="font-mono text-[10px] px-2 py-0.5 border border-white/8 text-white/45 hover:text-white/70 hover:border-white/22 hover:bg-white/4 transition-all duration-150 cursor-default rounded-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div ref={barsRef}>
          <h3 className="text-2xl font-bold mb-10 text-white/70">
            Proficiency
          </h3>

          <div className="space-y-7">
            {proficiency.map((item) => (
              <div key={item.label}>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-mono text-xs text-white/60">
                    {item.label}
                  </span>
                  <span className="font-mono text-xs text-white/30">
                    {item.level}%
                  </span>
                </div>
                <div className="h-px bg-white/8 relative">
                  <div
                    className="skill-bar-fill absolute top-0 left-0 h-px bg-white transition-all duration-1000 ease-out"
                    style={{ width: "0%", transitionDelay: "0.1s" }}
                    data-width={`${item.level}%`}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 border border-white/8 p-5">
            <div className="font-mono text-[10px] text-white/25 uppercase tracking-widest mb-4">
              Also familiar with
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                "IPFS",
                "Telegram Bot API",
                "Prisma",
                "Tokio",
                "WebSockets",
                "RestAPI",
                "Clickhouse",
                "VPS/VDS",
              ].map((t) => (
                <span
                  key={t}
                  className="font-mono text-[10px] text-white/25 hover:text-white/45 transition-colors cursor-default"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
