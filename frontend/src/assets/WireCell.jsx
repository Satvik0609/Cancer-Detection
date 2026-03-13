import { useEffect, useRef } from "react";

export default function WireCell() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const W = canvas.width, H = canvas.height;
    const cx = W / 2, cy = H / 2;

    const TURNS = 1.8;
    const STEPS = 120;
    const RADIUS = 55;
    const HEIGHT = 300;
    const BASE_PAIRS = 12;
    const TILT_X = 0.28; // ~16° tilt

    function project(x, y, z) {
      const y2 = y * Math.cos(TILT_X) - z * Math.sin(TILT_X);
      const z2 = y * Math.sin(TILT_X) + z * Math.cos(TILT_X);
      const scale = 1 + z2 / 600;
      return { x: cx + x * scale, y: cy + y2 * scale, z: z2 };
    }

    function lerp(a, b, t) { return a + (b - a) * t; }

    function drawHelix(t) {
      ctx.clearRect(0, 0, W, H);

      const strands = [];
      for (let i = 0; i <= STEPS; i++) {
        const frac = i / STEPS;
        const theta = frac * TURNS * Math.PI * 2 + t;
        const yPos = (frac - 0.5) * HEIGHT;
        strands.push({
          x1: Math.cos(theta) * RADIUS, y1: yPos, z1: Math.sin(theta) * RADIUS,
          x2: Math.cos(theta + Math.PI) * RADIUS, y2: yPos, z2: Math.sin(theta + Math.PI) * RADIUS,
        });
      }

      const bpElems = [];
      for (let b = 0; b < BASE_PAIRS; b++) {
        const frac = b / (BASE_PAIRS - 1);
        const idx = Math.min(Math.round(frac * STEPS), strands.length - 1);
        const s = strands[idx];
        const p1 = project(s.x1, s.y1, s.z1);
        const p2 = project(s.x2, s.y2, s.z2);
        bpElems.push({ s, sortZ: (p1.z + p2.z) / 2 });
      }

      const allEl = [];
      for (let i = 0; i < strands.length - 1; i++) {
        const s = strands[i], sn = strands[i + 1];
        const p1a = project(s.x1, s.y1, s.z1), p2a = project(sn.x1, sn.y1, sn.z1);
        const p1b = project(s.x2, s.y2, s.z2), p2b = project(sn.x2, sn.y2, sn.z2);
        allEl.push({ type: "seg1", s, sn, p1: p1a, p2: p2a, sortZ: (p1a.z + p2a.z) / 2 });
        allEl.push({ type: "seg2", s, sn, p1: p1b, p2: p2b, sortZ: (p1b.z + p2b.z) / 2 });
      }
      for (const bp of bpElems) allEl.push({ type: "bp", ...bp });
      allEl.sort((a, b) => a.sortZ - b.sortZ);

      for (const el of allEl) {
        if (el.type === "seg1" || el.type === "seg2") {
          const { p1, p2 } = el;
          const depth = Math.max(0, Math.min(1, (p1.z + p2.z) / (2 * RADIUS) / 2 + 0.5));
          const alpha = lerp(0.3, 1.0, depth);
          const r = Math.round(lerp(160, 239, depth));
          const g = Math.round(lerp(25, 68, depth));
          const bv = Math.round(lerp(25, 68, depth));
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(${r},${g},${bv},${alpha})`;
          ctx.lineWidth = lerp(1.0, 2.8, depth);
          ctx.stroke();
        }

        if (el.type === "bp") {
          const { s, sortZ } = el;
          const depth = Math.max(0, Math.min(1, sortZ / RADIUS / 2 + 0.5));
          const alpha = lerp(0.2, 0.85, depth);
          const p1 = project(s.x1, s.y1, s.z1);
          const p2 = project(s.x2, s.y2, s.z2);
          const midX = (p1.x + p2.x) / 2, midY = (p1.y + p2.y) / 2;

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(239,68,68,${alpha * 0.45})`;
          ctx.lineWidth = lerp(0.5, 1.5, depth);
          ctx.stroke();

          const dotR = lerp(1.5, 3.5, depth);
          const dotA = lerp(0.4, 1.0, depth);
          for (const [px, py, dr, da] of [
            [p1.x, p1.y, dotR, dotA],
            [p2.x, p2.y, dotR, dotA],
            [midX, midY, dotR * 0.55, dotA * 0.55],
          ]) {
            ctx.beginPath();
            ctx.arc(px, py, dr, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(239,68,68,${da})`;
            ctx.fill();
          }
        }
      }
    }

    let rafId;
    function loop(ts) {
      drawHelix((ts / 7000) * Math.PI * 2);
      rafId = requestAnimationFrame(loop);
    }
    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={300}
      height={400}
      style={{ display: "block", background: "transparent" }}
      className="opacity-90"
    />
  );
}