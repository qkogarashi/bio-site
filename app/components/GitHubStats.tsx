"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const USERNAME = "qkogarashi";

interface GHUser {
  login: string;
  name: string | null;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

interface GHRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
  updated_at: string;
  topics: string[];
  fork: boolean;
}

interface GHEvent {
  id: string;
  type: string;
  repo: { name: string };
  payload: Record<string, unknown>;
  created_at: string;
}

function timeAgo(dateStr: string): string {
  const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

function eventLabel(event: GHEvent): string {
  switch (event.type) {
    case "PushEvent":
      return `pushed to ${event.repo.name.split("/")[1]}`;
    case "CreateEvent":
      return `created ${(event.payload as { ref_type?: string }).ref_type || "repo"} in ${event.repo.name.split("/")[1]}`;
    case "WatchEvent":
      return `starred ${event.repo.name}`;
    case "ForkEvent":
      return `forked ${event.repo.name}`;
    case "IssuesEvent":
      return `opened issue in ${event.repo.name.split("/")[1]}`;
    case "PullRequestEvent":
      return `pull request in ${event.repo.name.split("/")[1]}`;
    default:
      return `activity in ${event.repo.name.split("/")[1]}`;
  }
}

function SkeletonCard({ className = "" }: { className?: string }) {
  return <div className={`skeleton rounded-sm ${className}`} />;
}

export default function GitHubStats() {
  const sectionRef = useRef<HTMLElement>(null);
  const [user, setUser] = useState<GHUser | null>(null);
  const [repos, setRepos] = useState<GHRepo[]>([]);
  const [events, setEvents] = useState<GHEvent[]>([]);
  const [totalStars, setTotalStars] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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

  useEffect(() => {
    const controller = new AbortController();
    const headers = { Accept: "application/vnd.github.v3+json" };

    Promise.all([
      fetch(`https://api.github.com/users/${USERNAME}`, {
        headers,
        signal: controller.signal,
      }).then((r) => r.json()),
      fetch(
        `https://api.github.com/users/${USERNAME}/repos?sort=updated&per_page=100`,
        { headers, signal: controller.signal },
      ).then((r) => r.json()),
      fetch(
        `https://api.github.com/users/${USERNAME}/events/public?per_page=12`,
        { headers, signal: controller.signal },
      ).then((r) => r.json()),
    ])
      .then(([userData, reposData, eventsData]) => {
        if (userData.message) {
          setError(true);
          return;
        }
        setUser(userData as GHUser);

        if (Array.isArray(reposData)) {
          const stars = (reposData as GHRepo[]).reduce(
            (s, r) => s + r.stargazers_count,
            0,
          );
          setTotalStars(stars);
          const top = (reposData as GHRepo[])
            .filter((r) => !r.fork)
            .sort(
              (a, b) =>
                b.stargazers_count - a.stargazers_count ||
                new Date(b.updated_at).getTime() -
                  new Date(a.updated_at).getTime(),
            )
            .slice(0, 6);
          setRepos(top);
        }

        if (Array.isArray(eventsData)) {
          setEvents((eventsData as GHEvent[]).slice(0, 8));
        }
        setLoading(false);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          setError(true);
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, []);

  const yearsSince = user
    ? new Date().getFullYear() - new Date(user.created_at).getFullYear()
    : 0;

  return (
    <section
      id="github"
      ref={sectionRef}
      className="section-animate py-32 px-6 max-w-6xl mx-auto"
    >
      <div className="flex items-center gap-4 mb-16">
        <span className="font-mono text-xs text-white/25 uppercase tracking-widest">
          03
        </span>
        <div className="flex-1 h-px bg-white/8" />
        <span className="font-mono text-xs text-white/25 uppercase tracking-widest">
          github
        </span>
      </div>

      <h2 className="text-5xl font-bold mb-16 leading-tight">GitHub Stats</h2>

      {error && (
        <div className="border border-white/10 p-6 font-mono text-sm text-white/40 mb-12">
          <span className="text-white/60">!</span> GitHub API rate limit
          reached. Stats unavailable for now.
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
        {loading
          ? Array(4)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="border border-white/8 p-6">
                  <SkeletonCard className="h-8 mb-3 w-16" />
                  <SkeletonCard className="h-3 w-24" />
                </div>
              ))
          : [
              { label: "Repositories", value: user?.public_repos ?? "—" },
              { label: "Followers", value: user?.followers ?? "—" },
              { label: "Total Stars", value: totalStars || "—" },
              { label: "Account Created", value: yearsSince ? yearsSince + " years ago" : "—" },
            ].map((s) => (
              <div
                key={s.label}
                className="border border-white/8 p-6 hover:border-white/18 hover:bg-white/1.5 transition-all group"
              >
                <div className="font-mono text-3xl font-bold text-white mb-2 group-hover:scale-105 transition-transform origin-left">
                  {s.value}
                </div>
                <div className="font-mono text-[10px] text-white/30 uppercase tracking-widest">
                  {s.label}
                </div>
              </div>
            ))}
      </div>

      <div className="border border-white/8 p-4 flex items-center justify-center min-h-32.5 bg-white/1 overflow-hidden mb-12">
        <Image
          src={`https://gh-heat.anishroy.com/api/${USERNAME}/svg?theme=green&darkMode=true&transparent=true`}
          alt="GitHub Contributions"
          width={1000}
          height={200}
          unoptimized
          className="w-full h-auto opacity-80 hover:opacity-95 transition-opacity"
          loading="lazy"
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="font-mono text-xs text-white/30 uppercase tracking-widest mb-6">
            Top Repositories
          </div>

          {loading ? (
            <div className="grid sm:grid-cols-2 gap-3">
              {Array(4)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="border border-white/8 p-5">
                    <SkeletonCard className="h-4 mb-3 w-32" />
                    <SkeletonCard className="h-3 mb-2 w-full" />
                    <SkeletonCard className="h-3 w-20" />
                  </div>
                ))}
            </div>
          ) : repos.length === 0 && !error ? (
            <p className="font-mono text-sm text-white/30">
              No public repos found.
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 gap-3">
              {repos.map((repo) => (
                <Link
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-white/8 p-5 hover:border-white/20 hover:bg-white/2 transition-all group block"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="font-mono text-sm text-white group-hover:text-white/80 transition-colors truncate">
                      {repo.name}
                    </span>
                    <div className="flex items-center gap-2 font-mono text-[10px] text-white/25 shrink-0">
                      {repo.stargazers_count > 0 && (
                        <span>★ {repo.stargazers_count}</span>
                      )}
                    </div>
                  </div>
                  {repo.description && (
                    <p className="text-[11px] text-white/35 leading-relaxed mb-3 line-clamp-2">
                      {repo.description}
                    </p>
                  )}
                  <div className="flex items-center gap-3">
                    {repo.language && (
                      <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-white/35" />
                        <span className="font-mono text-[10px] text-white/30">
                          {repo.language}
                        </span>
                      </div>
                    )}
                    <span className="font-mono text-[10px] text-white/20">
                      {timeAgo(repo.updated_at)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="font-mono text-xs text-white/30 uppercase tracking-widest mb-6">
            Recent Activity
          </div>

          <div className="space-y-0 border border-white/8">
            {loading ? (
              Array(6)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="px-4 py-3 border-b border-white/5 last:border-b-0"
                  >
                    <SkeletonCard className="h-3 mb-1.5 w-full" />
                    <SkeletonCard className="h-2 w-16" />
                  </div>
                ))
            ) : events.length === 0 ? (
              <div className="px-4 py-6 font-mono text-xs text-white/25">
                No recent public activity.
              </div>
            ) : (
              events.map((event) => (
                <div
                  key={event.id}
                  className="px-4 py-3 border-b border-white/5 last:border-b-0 hover:bg-white/1.5 transition-colors group"
                >
                  <div className="font-mono text-[11px] text-white/50 group-hover:text-white/70 transition-colors leading-relaxed">
                    {eventLabel(event)}
                  </div>
                  <div className="font-mono text-[10px] text-white/20 mt-1">
                    {timeAgo(event.created_at)}
                  </div>
                </div>
              ))
            )}
          </div>

          <Link
            href={`https://github.com/${USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex items-center gap-2 font-mono text-xs text-white/30 hover:text-white/60 transition-colors"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
            View full profile →
          </Link>
        </div>
      </div>
    </section>
  );
}
