import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
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
      // Changed to pure black (bg-black) and removed gradients
      className="fixed inset-x-0 top-0 z-50 border-b border-red-900/30 bg-black backdrop-blur-md"
    >
      <div className="mx-auto flex h-16 max-w-[1400px] items-center px-8">
        <Link to="/" className="flex items-center gap-4">
          <div className="relative flex h-7 w-7 items-center justify-center border border-[#107f3e] bg-black">
            <div className="h-2 w-2 bg-green-500 animate-pulse" />
          </div>
          
          <div className="leading-tight">
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#107f3e] font-bold">Checkpoint</p>
            <p className="text-sm font-black uppercase tracking-widest text-white">
              Medical <span className="text-[#107f3e]">AI</span>
            </p>
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;