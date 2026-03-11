import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const StageSummary = ({ scanData }) => {
  const scope = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        '.summary-card',
        { opacity: 0, scale: 0.95, rotationX: 45 },
        {
          opacity: 1,
          scale: 1,
          rotationX: 0,
          duration: 0.8,
          ease: 'back.out',
          perspective: 1200,
        },
      );

      gsap.fromTo(
        '.summary-section',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          stagger: 0.15,
        },
      );

      // Pulse the download button
      gsap.to('.download-button', {
        boxShadow: '0 0 80px rgba(0, 255, 136, 0.3)',
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    },
    { scope },
  );

  const generateReport = () => {
    // Mock report generation
    const reportContent = `
LUNG CANCER DETECTION REPORT
=====================================
Generated: ${new Date().toLocaleString()}

PATIENT INFORMATION:
- Anonymized ID: ANON-${Math.random().toString(36).substring(7).toUpperCase()}
- Scan Type: CT Chest with Contrast
- Device: Siemens SOMATOM

FINDINGS:
- Tumor Detected: YES
- Confidence Score: ${scanData?.confidence || 94.2}%
- Tumor Diameter: ${scanData?.diameter || 3.2} cm
- Location: ${scanData?.location || 'Right Upper Lobe'}

RISK ASSESSMENT: HIGH RISK
Clinical recommendation: Urgent biopsy consideration and specialist consultation

MODEL INFORMATION:
- Model: AACNN-ViT v2.1
- Validation AUC: 0.968
- Processing Time: 3.2s

DISCLAIMER:
This report is for research purposes only and should not be used for clinical decision-making without radiologist review.

=====================================
    `;

    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `lung-cancer-report-${Date.now()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div ref={scope} className="space-y-8 max-w-4xl">
      {/* Main Report Card */}
      <div className="summary-card glass-bento-green p-10 border-2 border-cyber-green/50">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">📋</div>
          <h2 className="text-3xl font-bold text-cyber-green mb-2">Analysis Complete</h2>
          <p className="text-slate-400">Your lung cancer detection report is ready</p>
        </div>

        {/* Key Findings */}
        <div className="summary-section space-y-6 border-t border-cyber-green/20 pt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="glass-bento p-4">
              <p className="text-xs uppercase tracking-wider text-discord-green font-semibold">
                Detection Status
              </p>
              <p className="text-2xl font-bold text-cyber-green mt-3">
                {scanData?.tumorDetected ? '✓ POSITIVE' : '✗ NEGATIVE'}
              </p>
            </div>
            <div className="glass-bento p-4">
              <p className="text-xs uppercase tracking-wider text-discord-green font-semibold">
                Confidence Score
              </p>
              <p className="text-2xl font-bold text-cyber-green mt-3">
                {scanData?.confidence || 94.2}%
              </p>
            </div>
            <div className="glass-bento p-4">
              <p className="text-xs uppercase tracking-wider text-discord-green font-semibold">
                Tumor Diameter
              </p>
              <p className="text-2xl font-bold text-cyber-green mt-3">
                {scanData?.diameter || 3.2} cm
              </p>
            </div>
            <div className="glass-bento p-4">
              <p className="text-xs uppercase tracking-wider text-discord-green font-semibold">
                Location
              </p>
              <p className="text-2xl font-bold text-cyber-green mt-3">
                {scanData?.location || 'Right Upper Lobe'}
              </p>
            </div>
          </div>
        </div>

        {/* Clinical Recommendation */}
        <div className="summary-section mt-8 border-t border-cyber-green/20 pt-8">
          <div className="glass-bento p-6 border border-cyber-green/50 bg-cyber-green/5">
            <div className="flex items-start gap-4">
              <div className="text-3xl">⚕️</div>
              <div>
                <h4 className="font-bold text-cyber-green mb-2">Clinical Recommendation</h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Based on the high confidence detection of a {scanData?.diameter || 3.2}cm lesion in the 
                  {scanData?.location || 'right upper lobe'}, urgent physician consultation is recommended. 
                  Further diagnostic workup including biopsy may be indicated pending clinical judgment.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Model Information */}
        <div className="summary-section mt-8 border-t border-cyber-green/20 pt-8">
          <h4 className="font-semibold text-slate-100 mb-4">Technical Specifications</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="glass-bento p-4">
              <p className="text-xs uppercase tracking-wider text-discord-green font-semibold">
                AI Model
              </p>
              <p className="text-sm text-slate-300 mt-2">AACNN-ViT v2.1</p>
            </div>
            <div className="glass-bento p-4">
              <p className="text-xs uppercase tracking-wider text-discord-green font-semibold">
                Validation AUC
              </p>
              <p className="text-sm text-slate-300 mt-2">0.968 (LUNA16)</p>
            </div>
            <div className="glass-bento p-4">
              <p className="text-xs uppercase tracking-wider text-discord-green font-semibold">
                Processing Time
              </p>
              <p className="text-sm text-slate-300 mt-2">3.2 seconds</p>
            </div>
          </div>
        </div>

        {/* Confidence Visualization */}
        <div className="summary-section mt-8 border-t border-cyber-green/20 pt-8">
          <h4 className="font-semibold text-slate-100 mb-4">Confidence Level</h4>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-400">Detection Confidence</span>
                <span className="text-sm font-semibold text-cyber-green">
                  {scanData?.confidence || 94.2}%
                </span>
              </div>
              <div className="h-3 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-discord-green to-cyber-green shadow-glow-green"
                  style={{ width: `${scanData?.confidence || 94.2}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="summary-section glass-bento p-4 border-yellow-600/30 bg-yellow-600/5">
        <p className="text-xs text-slate-400 leading-relaxed">
          <strong>DISCLAIMER:</strong> This report is for research and demonstration purposes only. 
          It should not be used for actual clinical decision-making without review by a qualified radiologist or 
          medical professional. Always consult healthcare providers for medical decisions.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="summary-section flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={generateReport}
          className="download-button flex items-center justify-center gap-2 rounded-full border border-discord-green bg-gradient-to-r from-discord-green/20 to-cyber-green/20 px-8 py-3 text-sm font-semibold text-cyber-green shadow-glow-green transition hover:shadow-glow-green-neon"
        >
          <span>📥</span>
          <span>Download Report (TXT)</span>
        </button>
        <button
          onClick={() => window.location.href = '/'}
          className="flex items-center justify-center gap-2 rounded-full border border-slate-600 bg-slate-900/60 px-8 py-3 text-sm font-semibold text-slate-300 transition hover:border-discord-green hover:text-discord-green"
        >
          <span>🏠</span>
          <span>Back to Home</span>
        </button>
      </div>

      {/* Next Steps */}
      <div className="summary-section glass-bento p-6">
        <h4 className="font-semibold text-slate-100 mb-4">Recommended Next Steps</h4>
        <ol className="space-y-3 text-sm text-slate-300">
          <li className="flex gap-3">
            <span className="text-cyber-green font-bold flex-shrink-0">1.</span>
            <span>Consult with a pulmonologist or chest radiologist within 72 hours</span>
          </li>
          <li className="flex gap-3">
            <span className="text-cyber-green font-bold flex-shrink-0">2.</span>
            <span>Request CT biopsy or transbronchial lung biopsy for pathological confirmation</span>
          </li>
          <li className="flex gap-3">
            <span className="text-cyber-green font-bold flex-shrink-0">3.</span>
            <span>Perform baseline staging imaging (PET/CT) if malignancy is confirmed</span>
          </li>
          <li className="flex gap-3">
            <span className="text-cyber-green font-bold flex-shrink-0">4.</span>
            <span>Discuss treatment options with multidisciplinary oncology team</span>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default StageSummary;
