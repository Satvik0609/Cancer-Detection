import { useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const StageMetrics = ({ onNext, scanData, setScanData }) => {
  const scope = useRef(null);
  const metricsRef = useRef({});

  useGSAP(
    () => {
      gsap.fromTo(
        '.metric-card',
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          ease: 'back.out',
          stagger: 0.1,
        },
      );

      // Animate counters
      Object.values(metricsRef.current).forEach((el) => {
        if (!el) return;
        const target = parseFloat(el.dataset.target || '0');
        const suffix = el.dataset.suffix || '';

        gsap.fromTo(
          el,
          { innerText: '0' },
          {
            innerText: target,
            duration: 2,
            ease: 'power3.out',
            snap: { innerText: 0.1 },
            modifiers: {
              innerText: (v) => `${Number(v).toFixed(1)}${suffix}`,
            },
          },
        );
      });
    },
    { scope },
  );

  // Mock data if not scanned yet
  useEffect(() => {
    if (!scanData) {
      setScanData({
        tumorDetected: true,
        confidence: 94.2,
        diameter: 3.2,
        location: 'Right Upper Lobe',
      });
    }
  }, [scanData, setScanData]);

  const metrics = [
    {
      title: 'Tumor Confidence',
      value: (scanData?.confidence || 94.2).toString(),
      suffix: '%',
      icon: '🎯',
      size: 'large',
    },
    {
      title: 'Tumor Diameter',
      value: (scanData?.diameter || 3.2).toString(),
      suffix: 'cm',
      icon: '📏',
      size: 'medium',
    },
    {
      title: 'Detection Status',
      value: scanData?.tumorDetected ? 'Positive' : 'Negative',
      suffix: '',
      icon: '🔍',
      size: 'medium',
    },
    {
      title: 'Location',
      value: scanData?.location || 'Right Upper Lobe',
      suffix: '',
      icon: '📍',
      size: 'medium',
    },
    {
      title: 'Model Accuracy',
      value: '96.8',
      suffix: '%',
      icon: '✓',
      size: 'small',
    },
    {
      title: 'Processing Time',
      value: '3.2',
      suffix: 's',
      icon: '⚡',
      size: 'small',
    },
  ];

  return (
    <div ref={scope} className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold text-cyber-green mb-2">Analysis Metrics</h3>
        <p className="text-sm text-slate-400">
          Detailed tumor analysis and detection confidence scores
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-max">
        {metrics.map((metric, idx) => (
          <div
            key={idx}
            className={`metric-card glass-bento-green p-6 flex flex-col justify-between ${
              metric.size === 'large' ? 'lg:col-span-2 lg:row-span-2' : metric.size === 'medium' ? '' : 'sm:col-span-1'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-xs uppercase tracking-wider text-discord-green font-semibold">
                  {metric.title}
                </p>
              </div>
              <div className="text-3xl">{metric.icon}</div>
            </div>

            <div className="flex items-baseline gap-2">
              <span
                ref={(el) => (metricsRef.current[idx] = el)}
                data-target={metric.value}
                data-suffix={metric.suffix}
                className="text-glow-green text-3xl sm:text-4xl font-bold"
              >
                {metric.suffix === '%' ? (metric.size === 'large' ? '0%' : '0%') : '0'}
              </span>
              <span className="text-sm text-slate-400">{metric.suffix}</span>
            </div>

            {metric.size === 'large' && (
              <div className="mt-4 text-xs text-slate-400 border-t border-slate-700/50 pt-4">
                High confidence tumor detection with clear segmentation boundaries
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Risk Assessment */}
      <div className="glass-bento-green p-6">
        <div className="flex items-start gap-4">
          <div className="text-3xl">⚠️</div>
          <div className="flex-1">
            <h4 className="font-semibold text-cyber-green mb-2">Risk Assessment</h4>
            <p className="text-sm text-slate-300 mb-4">
              Based on tumor size ({scanData?.diameter || 3.2}cm) and location ({scanData?.location || 'Right Upper Lobe'}), 
              this lesion requires urgent clinical correlation and possible biopsy consideration.
            </p>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-2 rounded-full bg-slate-700 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-discord-green to-cyber-green w-3/4" />
              </div>
              <span className="text-sm font-semibold text-cyber-green">HIGH RISK</span>
            </div>
          </div>
        </div>
      </div>

      {/* Technical Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="glass-bento p-4">
          <p className="text-xs uppercase tracking-wider text-discord-green font-semibold">
            Model Used
          </p>
          <p className="text-sm text-slate-300 mt-2">AACNN-ViT v2.1</p>
        </div>
        <div className="glass-bento p-4">
          <p className="text-xs uppercase tracking-wider text-discord-green font-semibold">
            Validation Dataset
          </p>
          <p className="text-sm text-slate-300 mt-2">LUNA16 (AUC: 0.968)</p>
        </div>
      </div>

      {/* Next Button */}
      <div className="flex justify-end">
        <button
          onClick={onNext}
          className="flex items-center gap-2 rounded-full border border-discord-green bg-gradient-to-r from-discord-green/20 to-cyber-green/20 px-6 py-3 text-sm font-semibold text-cyber-green shadow-glow-green transition hover:shadow-glow-green-neon"
        >
          <span>Generate Report</span>
          <span className="text-lg">→</span>
        </button>
      </div>
    </div>
  );
};

export default StageMetrics;
