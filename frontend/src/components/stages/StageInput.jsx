import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const StageInput = ({ onNext, canProceed, uploadedFile, setUploadedFile }) => {
  const scope = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        '.upload-zone',
        { opacity: 0, scale: 0.95, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.7, ease: 'power3.out' },
      );

      gsap.to('.upload-icon', {
        y: -8,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    },
    { scope },
  );

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      // Trigger animation
      gsap.to('.file-preview', {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'back.out',
      });
    }
  };

  return (
    <div ref={scope} className="space-y-8">
      {/* Upload Zone */}
      <div className="upload-zone glass-bento-green p-12">
        <div className="flex flex-col items-center justify-center gap-6">
          <div className="upload-icon h-20 w-20 flex items-center justify-center rounded-3xl bg-gradient-to-br from-discord-green/30 to-cyber-green/20 border border-cyber-green/50">
            <span className="text-5xl">🫁</span>
          </div>

          <div className="text-center">
            <h3 className="text-2xl font-bold text-cyber-green mb-2">Upload CT Scan</h3>
            <p className="text-sm text-slate-300">
              Drop your DICOM file or scan image here. We'll anonymize and process it.
            </p>
          </div>

          <label className="group cursor-pointer w-full">
            <input
              type="file"
              onChange={handleFileUpload}
              accept=".dcm,.nii,.nii.gz,image/*"
              className="hidden"
            />
            <div className="relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-cyber-green/50 bg-cyber-green/5 px-8 py-12 transition group-hover:border-cyber-green group-hover:bg-cyber-green/10">
              <div className="text-4xl mb-3">📤</div>
              <p className="font-semibold text-slate-100 text-center">
                {uploadedFile ? uploadedFile.name : 'Click to upload or drag and drop'}
              </p>
              <p className="text-xs text-slate-400 mt-2">DICOM, NIfTI, or PNG/JPG</p>
            </div>
          </label>
        </div>
      </div>

      {uploadedFile && (
        <div className="file-preview opacity-0 translate-y-4">
          <div className="glass-bento p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">File uploaded:</p>
                <p className="font-semibold text-cyber-green mt-1">{uploadedFile.name}</p>
              </div>
              <div className="h-12 w-12 rounded-full flex items-center justify-center bg-gradient-to-br from-discord-green/30 to-cyber-green/20 border border-cyber-green/50">
                ✓
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-bento p-4">
          <p className="text-xs uppercase tracking-wider text-discord-green font-semibold">
            Anonymization
          </p>
          <p className="text-sm text-slate-300 mt-2">Patient ID & HIPAA fields removed locally</p>
        </div>
        <div className="glass-bento p-4">
          <p className="text-xs uppercase tracking-wider text-discord-green font-semibold">
            Normalization
          </p>
          <p className="text-sm text-slate-300 mt-2">HU scaling and voxel spacing normalized</p>
        </div>
        <div className="glass-bento p-4">
          <p className="text-xs uppercase tracking-wider text-discord-green font-semibold">
            Processing
          </p>
          <p className="text-sm text-slate-300 mt-2">~2.3s per volume on GPU</p>
        </div>
      </div>

      {/* CTA */}
      <div className="flex justify-end">
        <button
          onClick={onNext}
          disabled={!uploadedFile}
          className="flex items-center gap-2 rounded-full border border-discord-green bg-gradient-to-r from-discord-green/20 to-cyber-green/20 px-6 py-3 text-sm font-semibold text-cyber-green shadow-glow-green transition hover:enabled:shadow-glow-green-neon disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <span>Proceed to Segmentation</span>
          <span className="text-lg">→</span>
        </button>
      </div>
    </div>
  );
};

export default StageInput;
