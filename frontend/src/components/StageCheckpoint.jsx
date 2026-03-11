import { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import StageInput from './stages/StageInput';
import StageSegmentation from './stages/StageSegmentation';
import StageMetrics from './stages/StageMetrics';
import StageSummary from './stages/StageSummary';

gsap.registerPlugin(useGSAP);

const StageCheckpoint = () => {
  const [currentStage, setCurrentStage] = useState(0);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [scanData, setScanData] = useState(null);
  const stageContainer = useRef(null);

  const stages = [
    {
      id: 0,
      title: 'Input',
      description: 'Upload & Anonymize',
      component: StageInput,
    },
    {
      id: 1,
      title: 'Segmentation',
      description: 'Tumor Detection',
      component: StageSegmentation,
    },
    {
      id: 2,
      title: 'Metrics',
      description: 'Analysis Results',
      component: StageMetrics,
    },
    {
      id: 3,
      title: 'Summary',
      description: 'Final Report',
      component: StageSummary,
    },
  ];

  useGSAP(
    () => {
      // Stage transition animation
      const tl = gsap.timeline();
      tl.to('.stage-content', {
        opacity: 0,
        scale: 0.95,
        duration: 0.3,
        ease: 'power2.inOut',
      }).to(
        '.stage-content',
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: 'power3.out',
        },
        0.2,
      );

      // Stage title animation
      gsap.fromTo(
        '.stage-title',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
      );

      // Progress bar animation
      const progress = (currentStage / (stages.length - 1)) * 100;
      gsap.to('.stage-progress-bar', {
        width: `${progress}%`,
        duration: 0.8,
        ease: 'power3.inOut',
      });
    },
    { dependencies: [currentStage] },
  );

  const handleNext = () => {
    if (currentStage < stages.length - 1) {
      setCurrentStage(currentStage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStage > 0) {
      setCurrentStage(currentStage - 1);
    }
  };

  const CurrentStageComponent = stages[currentStage].component;

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-black via-slate-950 to-black">
      <div className="checkpoint-noise" aria-hidden />

      {/* Stage Indicator Header */}
      <div className="fixed inset-x-0 top-0 z-30 border-b border-discord-green/20 bg-black/40 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <div className="text-sm font-semibold text-cyber-green">
                  Stage {currentStage + 1} of {stages.length}
                </div>
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-800">
                  <div className="stage-progress-bar h-full w-0 bg-gradient-to-r from-discord-green to-cyber-green shadow-glow-green-neon" />
                </div>
              </div>
            </div>
            <div className="hidden flex-col items-end gap-1 sm:flex">
              <h2 className="stage-title text-lg font-bold text-cyber-green">
                {stages[currentStage].title}
              </h2>
              <p className="text-xs text-slate-400">{stages[currentStage].description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stage Content Container */}
      <div ref={stageContainer} className="flex min-h-screen items-center justify-center pt-24 pb-24">
        <div className="stage-content w-full max-w-6xl px-6 py-12">
          <CurrentStageComponent
            onNext={handleNext}
            onPrevious={handlePrevious}
            canProceed={currentStage < stages.length - 1}
            uploadedFile={uploadedFile}
            setUploadedFile={setUploadedFile}
            scanData={scanData}
            setScanData={setScanData}
            currentStage={currentStage}
          />
                    <button
            onClick={handlePrevious}
            disabled={currentStage === 0}
            className="group flex items-center gap-2 rounded-full border border-slate-600 bg-slate-900/60 px-5 py-2 text-sm font-semibold text-slate-300 transition disabled:opacity-30 disabled:cursor-not-allowed hover:enabled:border-discord-green hover:enabled:text-discord-green"
          >
            <span>←</span>
            <span>Previous</span>
          </button>
                    <button
            onClick={handleNext}
            disabled={currentStage === stages.length - 1}
            className="group flex items-center gap-2 rounded-full border border-discord-green bg-gradient-to-r from-discord-green/20 to-cyber-green/20 px-5 py-2 text-sm font-semibold text-cyber-green shadow-glow-green transition hover:enabled:shadow-glow-green-neon disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <span>Next</span>
            <span className="text-lg leading-none">→</span>
          </button>
        </div>
      </div>
      </div>
  );
};

export default StageCheckpoint;
