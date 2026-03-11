import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Navbar = ({ variant = 'landing' }) => {
  const navRef = useRef();

  useGSAP(() => {
    const showAnim = gsap.from(navRef.current, { 
      yPercent: -100,
      paused: true,
      duration: 0.3
    }).progress(1);

    ScrollTrigger.create({
      start: "top top",
      end: 99999,
      onUpdate: (self) => {
        // self.direction: 1 is scroll down, -1 is scroll up
        self.direction === -1 ? showAnim.play() : showAnim.reverse();
      }
    });
  }, { scope: navRef });

  return (
    <header 
      ref={navRef}
      className="fixed inset-x-0 top-0 z-50 border-b border-slate-800/70 bg-gradient-to-b from-[#0f172a]/95 via-[#0f172a]/80 to-transparent backdrop-blur-xl transition-shadow duration-300"
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="relative flex h-8 w-8 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-purple-600 shadow-[0_0_15px_rgba(34,211,238,0.4)]">
            <div className="h-4 w-4 rounded-full border border-cyan-200/40 bg-slate-950/70 shadow-inner" />
            <div className="absolute inset-0 rounded-2xl border border-white/10" />
          </div>
          <div className="leading-tight">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Checkpoint</p>
            <p className="text-sm font-semibold text-slate-100">
              Lung Cancer <span className="text-cyan-400">AI</span>
            </p>
          </div>
        </Link>
        <nav className="flex items-center gap-6 text-xs font-medium text-slate-400">
          {variant === 'checkpoint' ? (
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('journey');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="rounded-full border border-slate-700/70 bg-slate-900/60 px-4 py-1.5 text-[0.68rem] uppercase tracking-[0.2em] text-slate-300/90 shadow-inner transition hover:border-cyan-400 hover:text-cyan-400"
            >
              Scroll to analysis
            </button>
          ) : (
            <Link
              to="/checkpoint"
              className="rounded-full border border-slate-700/70 bg-slate-900/60 px-4 py-1.5 text-[0.68rem] uppercase tracking-[0.2em] text-slate-300/90 shadow-inner transition hover:border-cyan-400 hover:text-cyan-400"
            >
              Open checkpoint
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;