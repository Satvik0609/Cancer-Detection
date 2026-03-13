import React from 'react';
import lung from '../../assets/images/lung.png';

const svgBg = "url(\"data:image/svg+xml,%3Csvg width='8' height='8' viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h16v2h-6v6h6v8H8v-6H2v6H0V0zm4 4h2v2H4V4zm8 8h2v2h-2v-2zm-8 0h2v2H4v-2zm8-8h2v2h-2V4z' fill='%2323a559' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E\")";

const Stage1OrganSelection = ({ onNext, onSelectOrgan }) => {
    const organs = [
        { name: 'Lung'}, 
        { name: 'Prostate'},
        { name: 'Oral'},
        { name: 'Breast'},
    ];

    return (
        <section
            className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-black text-slate-100"
            style={{
                backgroundImage: svgBg,
                backgroundSize: "12px",
                backgroundRepeat: "repeat"
            }}
        >
            {/* Top Left Branding */}
            <div className="absolute top-8 left-8 z-20 flex flex-col">
                <p className="text-[10px] uppercase tracking-[0.4em] text-[#23a559] font-bold">Checkpoint</p>
                <p className="text-lg font-black uppercase tracking-widest">Medical <span className="text-[#23a559]">AI</span></p>
            </div>

            <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_20%,black_95%)] pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-6xl px-4">
                <h1 className="text-[#23a559] text-4xl md:text-5xl font-black uppercase tracking-[0.2em] mb-12 text-center drop-shadow-[0_0_20px_rgba(35,165,89,0.2)]">
                    Select Organ
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-8xl">
                    {organs.map((organ) => (
                        <button
                            key={organ.name}
                            onClick={() => {
                                if (onSelectOrgan) onSelectOrgan(organ.name);
                                onNext();
                            }}
                            className="group relative w-full cursor-pointer"
                        >
                            <span className="absolute inset-0 translate-x-[4px] translate-y-[4px] bg-[#23a559]/40 transition-transform group-hover:translate-x-[6px] group-hover:translate-y-[6px]" />

                            <span className="relative z-10 block border border-[#23a559]/50 bg-black/80 backdrop-blur-sm py-22 transition-all group-hover:border-[#23a559] group-hover:-translate-x-1 group-hover:-translate-y-1">
                                <div className="flex flex-col items-center gap-4">
                                    {organ.image ? (
                                        <img src={organ.image} alt={organ.name} className="h-16 w-16 object-contain" />
                                    ) : (
                                        <span className="text-4xl">{organ.icon}</span>
                                    )}
                                    <div className="flex items-center gap-3">
                                        <span className="text-[#23a559] text-[10px]">▶</span>
                                        <span className="text-[#23a559] font-bold tracking-[0.4em] text-sm uppercase">
                                            {organ.name}
                                        </span>
                                    </div>
                                </div>
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Stage1OrganSelection;