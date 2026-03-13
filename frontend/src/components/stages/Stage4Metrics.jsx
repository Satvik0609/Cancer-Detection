import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import TumorCell from '../../assets/WireCell2'; 

const svgBg = "url(\"data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h16v2h-6v6h6v8H8v-6H2v6H0V0zm4 4h2v2H4V4zm8 8h2v2h-2v-2zm-8 0h2v2H4v-2zm8-8h2v2h-2V4z' fill='%2395078e' fill-opacity='0.55' fill-rule='evenodd'/%3E%3C/svg%3E\")";

const Stage4Metrics = ({ onNext, pixelCount = 0, coverageArea = 0 }) => {
    const scope = useRef(null);
    const metricsRef = useRef({});

    useGSAP(() => {
        Object.values(metricsRef.current).forEach((el) => {
            if (!el) return;
            const target = parseFloat(el.dataset.target || '0');

            gsap.fromTo(el,
                { innerText: '0' },
                {
                    innerText: target,
                    duration: 2,
                    ease: 'power3.out',
                    snap: { innerText: 0.1 },
                    modifiers: {
                        innerText: (v) => `${Number(v).toFixed(1)}`,
                    },
                }
            );
        });
    }, { scope });

    return (
        <section
            ref={scope}
            className="relative h-screen w-full flex items-center justify-center text-white overflow-hidden"
            style={{
                backgroundColor: "#000",
                backgroundImage: svgBg,
                backgroundSize: "12px",
                backgroundRepeat: "repeat",
            }}
        >
            <div className="absolute top-8 left-8 z-20 flex flex-col">
                <p className="text-[10px] uppercase tracking-[0.4em] text-[#c90ec0] font-bold">Checkpoint</p>
                <p className="text-lg font-black uppercase tracking-widest">Medical <span className="text-[#c90ec0]">AI</span></p>
            </div>

            <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_20%,black_95%)]" />

            <div className="relative z-10 flex items-center gap-12 px-12 max-w-6xl w-full">
                
                <div className="flex-shrink-0 scale-75 lg:scale-90">
                    <TumorCell />
                </div>

                <div className="flex flex-col gap-8 flex-grow">
                    
                    <div className="flex flex-col gap-1">
                        <p className="text-[14px] font-bold uppercase tracking-[0.4em] text-white opacity-80">
                            Total Pixel Density
                        </p>
                        <div className="flex items-end gap-2">
                            <span 
                                ref={(el) => (metricsRef.current[0] = el)}
                                data-target={pixelCount}
                                className="text-[80px] silkscreen-bold text-[#c90ec0] drop-shadow-[0_0_30px_rgba(236,72,153,0.4)] leading-none"
                            >
                                0
                            </span>
                            <span className="text-white font-bold text-lg mb-4 font-mono">PX</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-1">
                        <p className="text-[14px] font-bold uppercase tracking-[0.4em] text-white opacity-80">
                            Surface Coverage Area
                        </p>
                        <div className="flex items-end gap-2">
                            <span 
                                ref={(el) => (metricsRef.current[1] = el)}
                                data-target={coverageArea}
                                className="text-[80px] silkscreen-bold text-[#c90ec0] drop-shadow-[0_0_30px_rgba(236,72,153,0.4)] leading-none"
                            >
                                0
                            </span>
                            <span className="text-white font-bold text-lg mb-4 font-mono">%</span>
                        </div>
                    </div>

                    <p className="text-white text-xs font-medium uppercase tracking-[0.2em] max-w-md border-l-2 border-[#c90ec0] pl-4 py-1">
                        High-resolution volumetric analysis confirms precise tissue segmentation boundaries.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Stage4Metrics;