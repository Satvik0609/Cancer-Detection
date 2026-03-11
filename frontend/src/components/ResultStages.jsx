import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ResultStages = () => {
  const scope = useRef(null);

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          '.stage-block',
          { opacity: 0, y: 80, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: 'power3.out',
            stagger: 0.25,
            scrollTrigger: {
              trigger: '#journey',
              start: 'top 65%',
            },
          },
        );

        gsap.fromTo(
          '#tumor-outline',
          { drawSVG: '0% 0%' },
          {
            drawSVG: '0% 100%',
            duration: 2.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '#stage-segmentation',
              start: 'top 70%',
              scrub: true,
            },
          },
        );

        const metricCounters = document.querySelectorAll('[data-metric]');
        metricCounters.forEach((el) => {
          const target = Number(el.dataset.to || '0');
          const suffix = el.dataset.suffix || '';
          gsap.fromTo(
            el,
            { innerText: 0 },
            {
              innerText: target,
              duration: 1.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: el,
                start: 'top 80%',
              },
              snap: { innerText: 0.5 },
              modifiers: {
                innerText: (value) => `${Number(value).toFixed(1)}${suffix}`,
              },
            },
          );
        });
      }, scope);

      return () => ctx.revert();
    },
    { scope },
  );

  return (
    <section
      ref={scope}
      id="journey"
      className="relative bg-gradient-to-b from-black via-slate-950 to-black px-4 pb-32 pt-24"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-16 top-10 h-px bg-gradient-to-r from-transparent via-cyan-500/70 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-20">
        <header className="stage-block flex flex-col gap-4 text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-400">
            Scroll Checkpoint · Analysis Journey
          </p>
          <h2 className="max-w-3xl text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
            Follow the model from{' '}
            <span className="bg-gradient-to-r from-cyan-300 via-sky-400 to-purple-300 bg-clip-text text-transparent">
              first slice
            </span>{' '}
            to final risk score.
          </h2>
          <p className="max-w-2xl text-sm text-slate-400">
            Each block below locks into place as you scroll, revealing one checkpoint of the
            AACNN-ViT lung cancer pipeline: raw CT context, segmentation attention, and precision
            metrics.
          </p>
        </header>

        <div
          id="stage-problem"
          className="stage-block grid gap-8 rounded-3xl border border-slate-800/80 bg-slate-950/70 p-8 shadow-[0_0_60px_rgba(15,23,42,0.95)] lg:grid-cols-[1.1fr,0.9fr]"
        >
          <div className="flex flex-col gap-4">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
              Block 2 · The Problem
            </p>
            <h3 className="text-2xl font-semibold text-slate-50">
              Early lung lesions hide in noisy CT volumes.
            </h3>
            <p className="text-sm text-slate-400">
              Reading a thoracic CT means scanning hundreds of slices for millimetre-scale density
              changes. Fatigue, artefacts, and subtle growth over time make early-stage nodules
              notoriously easy to miss.
            </p>
            <p className="text-sm text-slate-400">
              Our interface surfaces exactly what the AACNN-ViT model is attending to, exposing the
              intermediate reasoning instead of a single opaque score.
            </p>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="absolute inset-4 rounded-[2.2rem] bg-gradient-to-br from-cyan-500/10 via-slate-950 to-purple-500/15 blur-3xl" />
            <div className="relative aspect-[4/3] w-full max-w-md overflow-hidden rounded-[2.1rem] border border-slate-800 bg-slate-950/80 shadow-inner-soft">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(34,211,238,0.25)_0,transparent_55%),radial-gradient(circle_at_90%_80%,rgba(129,140,248,0.35)_0,transparent_55%)]" />
              <div className="relative flex h-full flex-col justify-between p-5 text-[0.7rem] text-slate-200">
                <div className="flex items-center justify-between text-[0.65rem] text-slate-400">
                  <span className="uppercase tracking-[0.22em] text-slate-500">CT Context</span>
                  <span>Slice 183 / 431</span>
                </div>
                <div className="mx-auto mt-2 h-40 w-40 rounded-full border border-cyan-400/50 bg-slate-950/90 shadow-inner-soft" />
                <p className="mt-4 text-[0.7rem] text-slate-300">
                  Thin-slice axial lung window, anonymised. Look for the faint density anomaly near
                  the right upper lobe.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          id="stage-segmentation"
          className="stage-block grid gap-8 rounded-3xl border border-slate-800/80 bg-slate-950/80 p-8 shadow-[0_0_80px_rgba(15,23,42,0.95)] lg:grid-cols-[1.1fr,0.9fr]"
        >
          <div className="flex flex-col gap-4">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
              Block 3 · Segmentation
            </p>
            <h3 className="text-2xl font-semibold text-slate-50">
              AACNN-ViT scans the field of view with sub-millimetre attention.
            </h3>
            <p className="text-sm text-slate-400">
              A sweeping beam visualises how the network traverses the CT volume, progressively
              refining a 3D mask of suspicious tissue. The tumour outline you see below is drawn in
              real-time as you scrub the scroll.
            </p>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="absolute inset-4 rounded-[2.4rem] bg-gradient-to-br from-cyan-500/15 via-slate-950 to-fuchsia-500/20 blur-3xl" />
            <div className="relative aspect-square w-full max-w-md overflow-hidden rounded-[2.2rem] border border-slate-800 bg-slate-950/90 shadow-inner-soft">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(15,23,42,0.9)_0,transparent_55%),radial-gradient(circle_at_50%_80%,rgba(15,23,42,0.95)_0,transparent_60%)]" />

              <div className="relative flex h-full flex-col justify-between p-5">
                <div className="flex items-center justify-between text-[0.65rem] text-slate-400">
                  <span className="uppercase tracking-[0.22em] text-cyan-400">Segmentation View</span>
                  <span className="text-slate-500">Model: AACNN-ViT</span>
                </div>

                <div className="relative mx-auto mt-2 h-52 w-52 rounded-full bg-slate-950/90">
                  <div className="absolute inset-[14%] rounded-full border border-slate-700/80" />
                  <div className="absolute inset-[24%] rounded-full border border-slate-800" />

                  <svg
                    className="absolute inset-[12%] h-auto w-auto"
                    viewBox="0 0 200 200"
                    aria-hidden
                  >
                    <defs>
                      <linearGradient id="outlineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#22d3ee" />
                        <stop offset="40%" stopColor="#0ea5e9" />
                        <stop offset="100%" stopColor="#a855f7" />
                      </linearGradient>
                    </defs>
                    <path
                      id="tumor-outline"
                      d="M110 40c10 4 18 9 25 17 7 8 11 18 13 30s1 21-2 31-7 19-14 25c-7 6-16 11-27 13s-22 1-32-3-18-9-24-17-10-18-11-30 0-22 5-31c5-9 12-16 21-22 9-6 19-10 29-12s17-3 22-1z"
                      fill="none"
                      stroke="url(#outlineGradient)"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeDasharray="4 3"
                    />
                  </svg>

                  <div className="absolute inset-[10%]">
                    <div className="absolute inset-0 bg-[conic-gradient(from_220deg_at_50%_50%,rgba(56,189,248,0.15),transparent_45%,rgba(56,189,248,0.7),transparent_60%,rgba(168,85,247,0.5),transparent_80%,rgba(56,189,248,0.3))]" />
                  </div>

                  <div className="absolute inset-[18%] flex items-center justify-center">
                    <div className="h-6 w-6 rounded-full bg-cyan-400/80 shadow-glow-cyan" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          id="stage-metrics"
          className="stage-block rounded-3xl border border-slate-800/80 bg-slate-950/90 p-8 shadow-[0_0_80px_rgba(15,23,42,0.95)]"
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
                Block 4 · Precision Metrics
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-slate-50 sm:text-3xl">
                Tumour geometry and malignancy probability, at a glance.
              </h3>
              <p className="mt-2 max-w-xl text-sm text-slate-400">
                A Bento-style dashboard summarises size, morphology, and malignancy confidence. Each
                card animates as you scroll, mimicking live model readouts.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-4">
            <div className="group rounded-3xl border border-slate-800 bg-gradient-to-br from-cyan-500/15 via-slate-950 to-slate-950/90 p-4 shadow-inner-soft">
              <p className="text-[0.65rem] uppercase tracking-[0.2em] text-cyan-300">Tumour area</p>
              <p
                data-metric
                data-to="213.4"
                data-suffix=" mm²"
                className="mt-3 text-2xl font-semibold text-slate-50"
              >
                0
              </p>
              <p className="mt-1 text-[0.7rem] text-slate-400">Axial cross-section @ index slice</p>
            </div>

            <div className="group rounded-3xl border border-slate-800 bg-gradient-to-br from-purple-500/15 via-slate-950 to-slate-950/90 p-4 shadow-inner-soft">
              <p className="text-[0.65rem] uppercase tracking-[0.2em] text-purple-300">
                Effective diameter
              </p>
              <p
                data-metric
                data-to="18.7"
                data-suffix=" mm"
                className="mt-3 text-2xl font-semibold text-slate-50"
              >
                0
              </p>
              <p className="mt-1 text-[0.7rem] text-slate-400">Volume-equivalent spherical radius</p>
            </div>

            <div className="group rounded-3xl border border-slate-800 bg-gradient-to-br from-emerald-500/15 via-slate-950 to-slate-950/90 p-4 shadow-inner-soft">
              <p className="text-[0.65rem] uppercase tracking-[0.2em] text-emerald-300">
                Malignancy confidence
              </p>
              <p
                data-metric
                data-to="92.3"
                data-suffix="%"
                className="mt-3 text-2xl font-semibold text-slate-50"
              >
                0
              </p>
              <p className="mt-1 text-[0.7rem] text-slate-400">
                AACNN-ViT output · calibrated probability
              </p>
            </div>

            <div className="group flex flex-col justify-between rounded-3xl border border-slate-800 bg-slate-950/90 p-4 shadow-inner-soft">
              <div>
                <p className="text-[0.65rem] uppercase tracking-[0.2em] text-slate-400">
                  Checkpoint verdict
                </p>
                <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-checkpoint-red/60 bg-checkpoint-red/15 px-2 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-red-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-400 shadow-[0_0_10px_rgba(248,113,113,0.9)]" />
                  High risk · requires review
                </p>
              </div>
              <p className="mt-3 text-[0.7rem] text-slate-400">
                This UI is for storytelling. For deployment, scores are thresholded, ensemble-averaged,
                and always paired with radiologist review.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResultStages;