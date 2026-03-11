import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const UploadSection = () => {
  const scope = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        '.upload-card',
        { y: 60, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: scope.current,
            start: 'top 80%',
          },
        },
      );
    },
    { scope },
  );

  return (
    <section
      ref={scope}
      id="stage-upload"
      className="relative flex min-h-screen items-center justify-center bg-gradient-to-b from-checkpoint-bg via-slate-950 to-black px-4 py-24"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-1/4 h-40 w-40 -translate-x-1/2 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute bottom-0 right-10 h-52 w-52 translate-y-1/3 rounded-full bg-purple-500/20 blur-3xl" />
      </div>

      <div className="upload-card relative z-10 grid w-full max-w-6xl gap-10 rounded-3xl border border-slate-800/70 bg-slate-950/70 p-8 shadow-[0_0_80px_rgba(15,23,42,0.95)] lg:grid-cols-[1.1fr,0.9fr] lg:p-12">
        <div className="flex flex-col justify-between gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
              Stage 1 · Upload
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-50 sm:text-3xl">
              CT scan intake & anonymisation checkpoint.
            </h2>
            <p className="mt-3 text-sm text-slate-400">
              Drag and drop a DICOM series or CT slice set. We hash identifiers, normalise voxel
              spacing, and pre-filter for thoracic coverage before the model sees a single pixel.
            </p>
          </div>

          <div className="rounded-3xl border border-dashed border-cyan-500/40 bg-gradient-to-br from-cyan-500/10 via-slate-950 to-slate-950/80 p-6 shadow-glow-cyan">
            <div className="flex flex-col items-center justify-center gap-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-900/70 ring-1 ring-cyan-500/40">
                <span className="text-3xl text-cyan-300">📤</span>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-100">
                  Drop your CT scan here to simulate intake.
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  This is a demo. No real PHI is uploaded. We emulate the pipeline for visualisation
                  only.
                </p>
              </div>
              <button
                type="button"
                className="mt-2 inline-flex items-center gap-2 rounded-full border border-cyan-400/70 bg-slate-950/80 px-5 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-cyan-100 shadow-inner-soft transition hover:border-cyan-300 hover:text-cyan-100"
              >
                <span>Choose sample scan</span>
              </button>
            </div>
          </div>

          <dl className="grid gap-3 text-xs text-slate-400 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3">
              <dt className="text-[0.65rem] uppercase tracking-[0.18em] text-slate-500">
                DICOM fields
              </dt>
              <dd className="mt-1 text-sm font-semibold text-slate-100">Anonymised locally</dd>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3">
              <dt className="text-[0.65rem] uppercase tracking-[0.18em] text-slate-500">
                Normalisation
              </dt>
              <dd className="mt-1 text-sm font-semibold text-slate-100">
                HU clamping, z-score scaling
              </dd>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3">
              <dt className="text-[0.65rem] uppercase tracking-[0.18em] text-slate-500">
                Throughput
              </dt>
              <dd className="mt-1 text-sm font-semibold text-slate-100">~2.3s per volume</dd>
            </div>
          </dl>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="absolute inset-4 rounded-3xl bg-gradient-to-br from-cyan-500/15 via-slate-950 to-purple-500/10 blur-3xl" />
          <div className="relative flex h-full w-full max-w-md flex-col justify-between rounded-3xl border border-slate-800/80 bg-slate-950/80 p-4 shadow-inner-soft">
            <div className="mb-4 flex items-center justify-between text-[0.65rem] text-slate-500">
              <span className="uppercase tracking-[0.18em]">Intake Log</span>
              <span>Simulated</span>
            </div>
            <div className="flex-1 space-y-2 rounded-2xl bg-slate-950/90 p-3 text-[0.65rem] font-mono text-slate-400">
              <p>
                [00:00:00.112] <span className="text-cyan-300">dicom.load</span> · 431 slices
              </p>
              <p>
                [00:00:00.396] <span className="text-cyan-300">phi.strip</span> · 17 identifiers
                removed
              </p>
              <p>
                [00:00:00.911] <span className="text-cyan-300">volume.normalize</span> · thorax ROI
                isolated
              </p>
              <p>
                [00:00:01.742] <span className="text-cyan-300">queue.submit</span> · AACNN-ViT model
                @ checkpoint-2026-03
              </p>
            </div>
            <div className="mt-4 flex items-center justify-between text-[0.65rem] text-slate-500">
              <span>Latency (p95)</span>
              <span className="font-semibold text-cyan-300">2.43s</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UploadSection;