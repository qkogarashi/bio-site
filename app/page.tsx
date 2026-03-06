import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import GitHubStats from "./components/GitHubStats";
import MusicPlayer from "./components/MusicPlayer";
import Contacts from "./components/Contacts";

export default function Home() {
  return (
    <main className="bg-black text-white min-h-screen">
      <Navigation />

      <Hero />

      <div className="relative">
        <About />
        <div className="max-w-6xl mx-auto px-6">
          <div className="h-px bg-linear-to-r from-transparent via-white/8 to-transparent" />
        </div>

        <Skills />
        <div className="max-w-6xl mx-auto px-6">
          <div className="h-px bg-linear-to-r from-transparent via-white/8 to-transparent" />
        </div>

        <GitHubStats />
        <div className="max-w-6xl mx-auto px-6">
          <div className="h-px bg-linear-to-r from-transparent via-white/8 to-transparent" />
        </div>

        <MusicPlayer />
        <div className="max-w-6xl mx-auto px-6">
          <div className="h-px bg-linear-to-r from-transparent via-white/8 to-transparent" />
        </div>

        <Contacts />
      </div>

      <footer className="border-t border-white/5 py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-mono text-xs text-white/20">
            © 2026 <span className="text-white/40">qkogarashi</span> — created with ❤️
          </span>
          <div className="flex items-center gap-6">
            <span className="font-mono text-[10px] text-white/15">
              Vishnya one love ❤️
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
}
