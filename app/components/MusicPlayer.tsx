"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const tracks = [
  {
    id: 0,
    title: "Классика кварталов — Icegergert",
    genre: "From Spotify",
    year: 2023,
    tag: "Golden youth",
    duration: 999,
    src: "/audio/Klassika.mp3",
  },
  {
    id: 1,
    title: "AUDIODRAG - Pepel Nahudi",
    genre: "From Spotify",
    year: 2024,
    tag: "Russian Rap",
    duration: 999,
    src: "/audio/AUDIODRAG.mp3",
  },
  {
    id: 2,
    title: "AMMO — FRIENDLY THUG 52 NGG",
    genre: "From Spotify",
    year: 2024,
    tag: "Russian Rap",
    duration: 999,
    src: "/audio/AMMO.mp3",
  },
];

function fmt(s: number) {
  if (!Number.isFinite(s) || s <= 0) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

function EqBars({ playing }: { playing: boolean }) {
  const bars = [0.4, 0.7, 1.0, 0.85, 0.55, 0.9, 0.65, 0.75, 0.5, 0.8];
  return (
    <div className="flex items-end gap-0.5 h-6">
      {bars.map((h, i) => (
        <div
          key={i}
          className="w-0.5 rounded-full bg-white transition-all"
          style={{
            height: playing ? `${h * 24}px` : "3px",
            opacity: playing ? 0.5 + h * 0.5 : 0.2,
            transition: `height ${0.3 + i * 0.05}s ease-in-out, opacity 0.3s`,
            transitionDelay: playing ? `${i * 0.04}s` : "0s",
          }}
        />
      ))}
    </div>
  );
}

export default function MusicPlayer() {
  const sectionRef = useRef<HTMLElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressIntervalRef = useRef<ReturnType<typeof setInterval> | null>(
    null,
  );
  const trackIdxRef = useRef(0);
  const durationsRef = useRef(tracks.map((t) => t.duration ?? 0));

  const [trackIdx, setTrackIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [volume, setVolume] = useState(0.6);
  const [durations, setDurations] = useState(() =>
    tracks.map((t) => t.duration ?? 0),
  );

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

  const changeTrack = useCallback((idx: number) => {
    setElapsed(0);
    setProgress(0);
    setTrackIdx(idx);
  }, []);

  useEffect(() => {
    trackIdxRef.current = trackIdx;
  }, [trackIdx]);

  useEffect(() => {
    durationsRef.current = durations;
  }, [durations]);

  const stopProgress = useCallback(() => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  }, []);

  const startProgress = useCallback(() => {
    stopProgress();
    progressIntervalRef.current = setInterval(() => {
      const audio = audioRef.current;
      if (!audio) return;
      const idx = trackIdxRef.current;
      const d = durationsRef.current[idx] || audio.duration || 0;
      const e = audio.currentTime || 0;
      setElapsed(e);
      setProgress(d > 0 ? (e / d) * 100 : 0);
    }, 250);
  }, [stopProgress]);

  useEffect(() => {
    const track = tracks[trackIdx];
    const audio = new Audio(track.src);
    audio.preload = "metadata";
    audioRef.current = audio;

    const onLoaded = () => {
      const d = Number.isFinite(audio.duration)
        ? audio.duration
        : (track.duration ?? 0);
      if (d > 0) {
        setDurations((prev) => {
          if (prev[trackIdx] === d) return prev;
          const next = [...prev];
          next[trackIdx] = d;
          return next;
        });
      }
    };

    const onEnded = () => {
      const next = (trackIdxRef.current + 1) % tracks.length;
      changeTrack(next);
    };

    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.pause();
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("ended", onEnded);
      audio.src = "";
      audioRef.current = null;
      stopProgress();
    };
  }, [trackIdx, changeTrack, stopProgress]);

  const togglePlay = useCallback(() => {
    setPlaying((p) => !p);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio
        .play()
        .then(() => startProgress())
        .catch(() => setPlaying(false));
    } else {
      audio.pause();
      stopProgress();
    }
  }, [playing, trackIdx, startProgress, stopProgress]);

  const prevTrack = () =>
    changeTrack((trackIdx - 1 + tracks.length) % tracks.length);
  const nextTrack = () => changeTrack((trackIdx + 1) % tracks.length);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => () => stopProgress(), [stopProgress]);

  const track = tracks[trackIdx];
  const trackDuration = durations[trackIdx] ?? track.duration ?? 0;

  return (
    <section
      id="music"
      ref={sectionRef}
      className="section-animate py-32 px-6 max-w-6xl mx-auto"
    >
      <div className="flex items-center gap-4 mb-16">
        <span className="font-mono text-xs text-white/25 uppercase tracking-widest">
          04
        </span>
        <div className="flex-1 h-px bg-white/8" />
        <span className="font-mono text-xs text-white/25 uppercase tracking-widest">
          music
        </span>
      </div>

      <h2 className="text-5xl font-bold mb-4 leading-tight">Music Player</h2>

      <div className="grid lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3 border border-white/10 p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/2 blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-start justify-between mb-8">
              <div>
                <div className="font-mono text-[10px] text-white/25 uppercase tracking-widest mb-2">
                  Now {playing ? "playing" : "paused"}
                </div>
                <h3 className="text-3xl font-bold text-white mb-1">
                  {track.title}
                </h3>
                <div className="font-mono text-sm text-white/40">
                  {track.genre}
                </div>
              </div>
              <EqBars playing={playing} />
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { label: "Duration", value: fmt(trackDuration) },
                { label: "Year", value: track.year },
                { label: "Tags", value: track.tag },
              ].map((m) => (
                <div key={m.label} className="border border-white/8 px-3 py-2">
                  <div className="font-mono text-[10px] text-white/25 uppercase tracking-wider">
                    {m.label}
                  </div>
                  <div className="font-mono text-sm text-white mt-0.5">
                    {m.value}
                  </div>
                </div>
              ))}
            </div>

            <div className="mb-6">
              <div className="flex justify-between font-mono text-[10px] text-white/30 mb-2">
                <span>{fmt(elapsed)}</span>
                <span>{fmt(trackDuration)}</span>
              </div>
              <div className="relative h-px bg-white/10 group">
                <div
                  className="absolute left-0 top-0 h-full bg-white transition-all"
                  style={{ width: `${progress}%` }}
                />
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={0.1}
                  value={progress}
                  onChange={(e) => {
                    const p = parseFloat(e.target.value);
                    const d = durations[trackIdx] || track.duration || 0;
                    const newElapsed = (p / 100) * d;
                    const audio = audioRef.current;
                    if (audio && Number.isFinite(newElapsed)) {
                      audio.currentTime = newElapsed;
                    }
                    setProgress(p);
                    setElapsed(newElapsed);
                  }}
                  className="absolute inset-0 w-full opacity-0 cursor-pointer h-4 -top-1.5"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={prevTrack}
                  className="text-white/30 hover:text-white transition-colors"
                  aria-label="Previous"
                  disabled={tracks.length < 2}
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
                  </svg>
                </button>

                <button
                  onClick={togglePlay}
                  className="w-12 h-12 rounded-full bg-white text-black hover:bg-white/90 transition-all flex items-center justify-center shadow-lg shadow-white/10 hover:scale-105 active:scale-95"
                  aria-label={playing ? "Pause" : "Play"}
                >
                  {playing ? (
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5 ml-0.5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </button>

                <button
                  onClick={nextTrack}
                  className="text-white/30 hover:text-white transition-colors"
                  aria-label="Next"
                  disabled={tracks.length < 2}
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6 18l8.5-6L6 6v12zm2-8.14L11.03 12 8 14.14V9.86zM16 6h2v12h-2z" />
                  </svg>
                </button>
              </div>

              <div className="flex items-center gap-3">
                <svg
                  className="w-3.5 h-3.5 text-white/30 shrink-0"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
                </svg>
                <div className="w-20 relative">
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="w-full"
                    aria-label="Volume"
                  />
                </div>
                <svg
                  className="w-4 h-4 text-white/30 shrink-0"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="font-mono text-[10px] text-white/25 uppercase tracking-widest mb-4">
            My favorite tracks
          </div>
          <div className="space-y-2">
            {tracks.map((t, i) => (
              <button
                key={t.id}
                onClick={() => changeTrack(i)}
                className={`w-full flex items-center gap-4 px-4 py-4 border transition-all text-left group ${
                  trackIdx === i
                    ? "border-white/25 bg-white/4"
                    : "border-white/8 hover:border-white/15 hover:bg-white/2"
                }`}
              >
                <div className="w-6 shrink-0 text-center font-mono text-xs">
                  {trackIdx === i && playing ? (
                    <div className="flex items-end gap-px h-4 justify-center">
                      {[0.6, 1, 0.8].map((h, j) => (
                        <div
                          key={j}
                          className="w-0.5 bg-white rounded-full"
                          style={{
                            height: `${h * 16}px`,
                            animation: `eq-bar ${0.5 + j * 0.15}s ease-in-out infinite alternate`,
                          }}
                        />
                      ))}
                    </div>
                  ) : (
                    <span
                      className={
                        trackIdx === i
                          ? "text-white"
                          : "text-white/25 group-hover:text-white/50"
                      }
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div
                    className={`font-mono text-sm truncate ${trackIdx === i ? "text-white" : "text-white/50 group-hover:text-white/80"}`}
                  >
                    {t.title}
                  </div>
                  <div className="font-mono text-[10px] text-white/25 mt-0.5">
                    {t.genre}
                  </div>
                </div>

                <div className="font-mono text-[10px] text-white/25 shrink-0">
                  {fmt(durations[i] ?? t.duration ?? 0)}
                </div>
              </button>
            ))}
          </div>

          <div className="mt-6 border border-white/8 p-4">
            <div className="font-mono text-[10px] text-white/25 uppercase tracking-widest mb-2">
              Why music?
            </div>
            <p className="font-mono text-[11px] text-white/35 leading-relaxed">
              The most important thing when writing code is to turn on some badass music 
              and enjoy the process.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
