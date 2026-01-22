'use client';

import { ChapterLayout } from '@/components/layout/ChapterLayout';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Search, Compass, Cpu, Rocket, ChevronRight } from 'lucide-react';
import { cn } from '@/utils/cn';

const STEPS = [
    {
        num: "01",
        title: "Audit",
        desc: "Deep dive into your current metrics.",
        icon: Search,
        telemetry: ["STATUS: SCANNING", "DATA_POINTS: 12.4K", "SYST_COMP: 98.2%"],
        accent: "text-blue-400"
    },
    {
        num: "02",
        title: "Strategy",
        desc: "Blueprinting the conversion path.",
        icon: Compass,
        telemetry: ["MODEL: PREDICTIVE", "ROI_EST: +340%", "PATH: OPTIMIZED"],
        accent: "text-purple-400"
    },
    {
        num: "03",
        title: "Build",
        desc: "Development with Next.js/WebGL.",
        icon: Cpu,
        telemetry: ["STACK: NEXT_JS_GL", "PERF_SCORE: 100", "CORE: ACTIVATED"],
        accent: "text-cyan-400"
    },
    {
        num: "04",
        title: "Launch",
        desc: "Deployment & automated scaling.",
        icon: Rocket,
        telemetry: ["SERVER: EDGE_GLOBAL", "UPTIME: 99.99%", "FUEL: FULL"],
        accent: "text-red-400"
    }
];

export function Process() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
        layoutEffect: false
    });

    return (
        <ChapterLayout className="bg-transparent" id="method">
            <div className="relative z-10 w-full max-w-5xl mx-auto h-full flex flex-col justify-center py-20" ref={containerRef}>

                {/* Header Section: Mission Protocols */}
                <div className="text-center mb-32 space-y-4">
                    <motion.div
                        className="flex items-center justify-center gap-3 text-blue-500 font-mono text-[10px] tracking-[0.5em] uppercase"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                    >
                        <span className="w-12 h-px bg-blue-500/30" />
                        Strategic_Mission_Protocols
                        <span className="w-12 h-px bg-blue-500/30" />
                    </motion.div>
                    <motion.h2
                        className="text-6xl md:text-8xl font-black text-white tracking-tight uppercase"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        THE PROTOCOL
                    </motion.h2>
                </div>

                <div className="relative">
                    {/* Background Progress Rail */}
                    <div className="absolute left-8 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[2px] bg-white/5" />

                    {/* Active Progress Line */}
                    <motion.div
                        className="absolute left-8 md:left-1/2 md:-translate-x-1/2 top-0 w-[2px] bg-gradient-to-b from-cyan-400 via-blue-500 to-purple-600 shadow-[0_0_15px_rgba(0,240,255,0.5)] z-0"
                        style={{ height: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
                    >
                        {/* The Signal Pulse */}
                        <motion.div
                            className="absolute top-0 -left-[3px] w-2 h-2 bg-white rounded-full shadow-[0_0_15px_#fff]"
                            style={{ top: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
                        />
                    </motion.div>

                    <div className="space-y-32 py-10">
                        {STEPS.map((step, i) => (
                            <ProtocolStep key={i} step={step} index={i} />
                        ))}
                    </div>
                </div>

            </div>
        </ChapterLayout>
    );
}

function ProtocolStep({ step, index }: any) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <div ref={ref} className={cn(
            "relative flex items-center md:flex-row gap-12 md:gap-0",
            index % 2 === 0 ? "flex-row" : "md:flex-row-reverse flex-row"
        )}>

            {/* Center Graphic: The Holographic Node */}
            <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 z-20 flex items-center justify-center">

                {/* Complex Rotating Rings */}
                <motion.div
                    className="absolute w-32 h-32 border border-cyan-500/10 rounded-full"
                    animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                    className="absolute w-24 h-24 border border-white/5 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                    className="absolute w-20 h-20 border-2 border-transparent border-t-cyan-400/40 rounded-full"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />

                {/* The Core Node */}
                <div className="relative w-16 h-16 bg-[#030305] border border-white/20 rounded-full flex items-center justify-center group shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]">
                    <step.icon className={cn("w-7 h-7 text-gray-500 transition-all duration-700 group-hover:scale-110", isInView && "text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]")} />

                    {/* Targeting HUD Overlay */}
                    <div className="absolute inset-[-4px] border border-cyan-400/20 rounded-full scale-110 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                    {/* Position HUD */}
                    <div className="absolute -bottom-8 text-[8px] font-mono text-cyan-400/40 tracking-widest uppercase">
                        LOC_0{index + 1}
                    </div>

                    {/* Glowing Pulse */}
                    {isInView && (
                        <motion.div
                            className="absolute inset-0 bg-cyan-400/20 rounded-full"
                            animate={{ scale: [1, 2], opacity: [0.3, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                    )}
                </div>
            </div>

            {/* Side Content: The Narrative */}
            <div className={cn(
                "pl-24 md:pl-0 w-full md:w-1/2",
                index % 2 === 0 ? "md:pr-24 md:text-right" : "md:pl-24 md:text-left"
            )}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative"
                >
                    {/* Big Background Number */}
                    <span className="absolute top-0 opacity-10 font-black text-9xl -z-10 leading-none select-none -translate-y-12 bg-clip-text text-transparent bg-gradient-to-b from-white to-transparent">
                        {step.num}
                    </span>

                    <h3 className="text-4xl font-bold text-white mb-4 flex items-center gap-4 md:justify-end justify-start group">
                        {index % 2 !== 0 && <span className="text-cyan-400 text-[10px] font-mono tracking-[0.5em] hidden md:inline opacity-0 group-hover:opacity-100 transition-opacity">SYS_INIT // </span>}
                        {step.title}
                        {index % 2 === 0 && <span className="text-cyan-400 text-[10px] font-mono tracking-[0.5em] hidden md:inline opacity-0 group-hover:opacity-100 transition-opacity"> // SYS_INIT</span>}
                    </h3>

                    <p className="text-gray-400 text-lg max-w-md mx-0 ml-auto leading-relaxed font-sans">
                        {step.desc}
                    </p>

                    {/* Telemetry Annotations */}
                    <div className={cn("mt-8 flex flex-wrap gap-2 transition-all duration-700 delay-500",
                        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
                        index % 2 === 0 ? "md:justify-end" : "justify-start")}>
                        {step.telemetry.map((t: string, ti: number) => (
                            <span key={ti} className="text-[9px] font-mono border border-white/10 bg-white/5 px-3 py-1 text-gray-400 uppercase tracking-tighter hover:border-cyan-400/50 hover:text-cyan-200 transition-colors">
                                {t}
                            </span>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Spacer for two-column desktop layout */}
            <div className="hidden md:block w-1/2" />
        </div>
    );
}
