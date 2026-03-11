import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const StageSegmentation = ({ onNext, uploadedFile, setScanData }) => {
  const scope = useRef(null);
  const imageRef = useRef(null);
  const [isScanning, setIsScanning] = useState(false);

  useGSAP(
    () => {
      gsap.fromTo(
        '.segmentation-card',
        { opacity: 0, scale: 0.95, rotationY: 45 },
        {
          opacity: 1,
          scale: 1,
          rotationY: 0,
          duration: 0.8,
          ease: 'back.out',
          perspective: 1200,
        },
      );
    },
    { scope },
  );

  const startScan = () => {
    setIsScanning(true);

    const tl = gsap.timeline();

    // Scan line animation
    tl.to('.scan-line', {
      top: '100%',
      duration: 3,
      ease: 'power2.inOut',
    });

    // Reveal tumor overlay
    tl.to(
      '.tumor-overlay',
      {
        opacity: 0.8,
        duration: 1.2,
        ease: 'power3.out',
      },
      0.5,
    );

    // Highlight metrics
    tl.fromTo(
      '.metric-highlight',
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out', stagger: 0.1 },
      1.5,
    );

    setTimeout(() => {
      setScanData({
        tumorDetected: true,
        confidence: 94.2,
        diameter: 3.2,
        location: 'Right Upper Lobe',
      });
      setIsScanning(false);
    }, 3500);
  };

  return (
    <div ref={scope} className="space-y-8">
      {/* Segmentation Preview */}
      <div className="segmentation-card glass-bento-green p-8">
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-cyber-green mb-2">Tumor Segmentation</h3>
          <p className="text-sm text-slate-400">
            AI laser scanning to detect and outline tumor regions with precision
          </p>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-cyber-green/50 bg-slate-900/50 aspect-video flex items-center justify-center">
          {/* Mock CT Image */}
          <div
            ref={imageRef}
            className="relative w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center"
          >
            {/* Placeholder CT visualization */}
            <div className="text-center">
              <div className="text-6xl mb-4">🫁</div>
              <p className="text-slate-400 text-sm">CT Scan Visualization</p>
            </div>

            {/* Scan Line */}
            {isScanning && <div className="scan-line" />}

            {/* Tumor Overlay */}
            <div className="tumor-overlay absolute inset-0 opacity-0 bg-gradient-to-b from-transparent via-discord-green/50 to-transparent pointer-events-none" />

            {/* Highlighted metrics during scan */}
            {isScanning && (
              <>
                <div className="metric-highlight absolute top-1/3 left-1/4 h-32 w-32 rounded-full border-2 border-cyber-green/80 opacity-0 animate-pulse-green" />
                <div className="metric-highlight absolute top-1/2 right-1/4 h-24 w-24 rounded-full border-2 border-cyber-green/80 opacity-0 animate-pulse-green animation-delay-100" />
              </>
            )}
          </div>
        </div>

        {/* Scan Controls */}
        <div className="mt-6 flex items-center gap-4">
          <button
            onClick={startScan}
            disabled={isScanning || !uploadedFile}
            className="flex items-center gap-2 rounded-full border border-cyber-green bg-gradient-to-r from-discord-green/30 to-cyber-green/30 px-6 py-2 text-sm font-semibold text-cyber-green transition hover:enabled:shadow-glow-green disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <span>{isScanning ? 'Scanning...' : 'Start Laser Scan'}</span>
            {isScanning && <span className="animate-spin">⚡</span>}
          </button>
          <p className="text-xs text-slate-500">
            {isScanning ? 'Processing tumor detection...' : 'Ready to analyze'}
          </p>
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-bento p-4">
          <p className="text-xs uppercase tracking-wider text-discord-green font-semibold">
            Detection Method
          </p>
          <p className="text-sm text-slate-300 mt-2">AACNN-ViT Segmentation Model</p>
        </div>
        <div className="glass-bento p-4">
          <p className="text-xs uppercase tracking-wider text-discord-green font-semibold">
            Processing Time
          </p>
          <p className="text-sm text-slate-300 mt-2">~3.2 seconds per volume</p>
        </div>
        <div className="glass-bento p-4">
          <p className="text-xs uppercase tracking-wider text-discord-green font-semibold">
            Output Format
          </p>
          <p className="text-sm text-slate-300 mt-2">3D segmentation mask + metrics</p>
        </div>
      </div>

      {/* Next Button */}
      <div className="flex justify-end">
        <button
          onClick={onNext}
          disabled={isScanning}
          className="flex items-center gap-2 rounded-full border border-discord-green bg-gradient-to-r from-discord-green/20 to-cyber-green/20 px-6 py-3 text-sm font-semibold text-cyber-green shadow-glow-green transition hover:enabled:shadow-glow-green-neon disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <span>View Metrics</span>
          <span className="text-lg">→</span>
        </button>
      </div>
    </div>
  );
};

export default StageSegmentation;
