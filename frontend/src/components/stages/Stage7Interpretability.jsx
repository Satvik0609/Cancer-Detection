import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Maximize2, Zap, Brain, Focus } from "lucide-react";

const svgBg = "url(\"data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h16v2h-6v6h6v8H8v-6H2v6H0V0zm4 4h2v2H4V4zm8 8h2v2h-2v-2zm-8 0h2v2H4v-2zm8-8h2v2h-2V4z' fill='%230eb9cf' fill-opacity='0.55' fill-rule='evenodd'/%3E%3C/svg%3E\")";

const Stage7Interpretability = ({ onNext, heatmapUrl = null }) => {
    const [isFullScreen, setIsFullScreen] = useState(false);

    return (
        <section
            className="relative h-screen w-full flex items-center justify-center text-white overflow-hidden"
            style={{
                backgroundColor: "#000",
                backgroundImage: svgBg,
                backgroundSize: "12px",
                backgroundRepeat: "repeat",
            }}
        >
            <div className="absolute top-8 left-8 z-20 flex flex-col">
                <p className="text-[10px] uppercase tracking-[0.4em] text-[#0eb9cf] font-bold">Checkpoint</p>
                <p className="text-lg font-black uppercase tracking-widest">Medical <span className="text-[#0eb9cf]">AI</span></p>
            </div>

            <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_20%,black_95%)]" />

            <div className="relative z-10 flex items-center gap-16 px-12 max-w-6xl w-full">
                
                <div className="flex flex-col gap-8 flex-grow">
                    <div className="flex flex-col gap-1">
                        <p className="text-[14px] font-bold uppercase tracking-[0.4em] text-white opacity-80">
                            Neural Interpretability
                        </p>
                        <div className="flex items-end gap-2">
                            <span className="text-[60px] lg:text-[80px] silkscreen-bold text-[#0eb9cf] drop-shadow-[0_0_30px_rgba(220,38,38,0.4)] leading-none uppercase">
                                GRAD-CAM
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-4">
                            <p className="text-white text-xs font-medium uppercase tracking-[0.2em] max-w-md border-l-2 border-[#0eb9cf] pl-4 py-1 leading-relaxed">
                                Grad-CAM (Gradient-weighted Class Activation Mapping) highlights the regions where the model concentrated most during analysis.
                            </p>
                            <p className="bg-[#0eb9cf] text-[#0a2a4a] text-[10px] text-bold uppercase tracking-widest max-w-sm ml-5">
                                Warm colors indicate high activation zones—features the AI identified as most critical for the diagnostic outcome.
                            </p>
                        </div>
                        
                        {/* Interpretability Symbols */}
                        <div className="flex gap-8 mt-2 text-[#0eb9cf]/80">
                            <div className="flex flex-col items-center gap-2">
                                <Brain size={20} className="animate-pulse" />                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <Focus size={20} />                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <Zap size={20} />
                            </div>
                        </div>
                    </div>
                </div>

                <div 
                    onClick={() => setIsFullScreen(true)}
                    className="group relative w-full max-w-md aspect-square bg-black/60 border border-[#0eb9cf] flex items-center justify-center cursor-zoom-in overflow-hidden transition-all hover:border-[#0eb9cf]/60"
                >
                    {/* BACKEND INTEGRATION*/}
                    {heatmapUrl ? (
                        <img src={heatmapUrl} alt="Grad-CAM" className="w-full h-full object-cover opacity-80" />
                    ) : (
                        <div className="flex flex-col items-center gap-4 opacity-30">
                            <Focus size={48} className="text-[#0eb9cf]" />
                            <span className="text-[10px] uppercase tracking-[0.5em] font-bold">Heatmap_Ready</span>
                        </div>
                    )}

                    <div className="absolute top-4 left-4 flex flex-col">
                        <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#0eb9cf]">Activ_Map_V1</span>
                        <div className="h-[1px] w-12 bg-[#0eb9cf]/50 mt-1" />
                    </div>
                    <Maximize2 className="absolute bottom-4 right-4 text-[#0eb9cf]/40 group-hover:text-[#0eb9cf] transition-colors" size={20} />
                    
                    <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(220,38,38,0.05)_50%,transparent_100%)] h-1/2 w-full animate-[scan_4s_linear_infinite]" />
                </div>
            </div>

            {/* Full Screen */}
            <AnimatePresence>
                {isFullScreen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center p-8"
                    >
                        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: svgBg, backgroundSize: "12px" }} />
                        
                        <div className="absolute top-8 left-12 right-12 flex justify-between items-center">
                            <button 
                                onClick={() => setIsFullScreen(false)}
                                className="flex items-center gap-2 text-[#0eb9cf] hover:text-white transition-colors group"
                            >
                                <ChevronLeft className="group-hover:-translate-x-1 transition-transform" />
                                <span className="text-xs font-black uppercase tracking-widest font-mono">Back to Dashboard</span>
                            </button>
                            <div className="text-right">
                                <p className="text-[10px] text-[#0eb9cf] font-bold uppercase tracking-widest">Model Interpretability</p>
                                <h3 className="text-xl font-black uppercase tracking-widest silkscreen-bold">Full Resolution Map</h3>
                            </div>
                        </div>

                        <div className="relative w-full h-full max-w-4xl max-h-[80vh] border border-[#0eb9cf]/30 flex items-center justify-center bg-black/80">
                            {heatmapUrl ? (
                                <img src={heatmapUrl} className="w-full h-full object-contain" />
                            ) : (
                                <div className="text-[#0eb9cf] silkscreen-bold text-4xl uppercase italic">Visualizing Weights...</div>
                            )}
                            
                            {/* Corner HUD Brackets */}
                            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#0eb9cf]" />
                            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#0eb9cf]" />
                            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#0eb9cf]" />
                            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#0eb9cf]" />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Stage7Interpretability;