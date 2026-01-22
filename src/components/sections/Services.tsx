'use client';

import { ChapterLayout } from '@/components/layout/ChapterLayout';
import { motion, useInView } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { cn } from '@/utils/cn';
import { ArrowUpRight } from 'lucide-react';
import { Typewriter } from '@/components/ui/typewriter';

export function Services() {
    const [active, setActive] = useState<number | null>(null);
    const containerRef = useRef(null);

    const [hasEntered, setHasEntered] = useState(false);
    const isInView = useInView(containerRef, { once: true, amount: 0.2 });

    useEffect(() => {
        if (isInView) setHasEntered(true);
    }, [isInView]);

    const services = [
        {
            id: 1,
            title: "Autonomous Web Systems",
            desc: "Zero-latency digital flagships engineered for total sector dominance. High-fidelity interfaces with integrated AI logic.",
            tags: ["SECTOR_ALPHA", "PREDICTIVE_UX", "FORCE_MULTIPLIER"]
        },
        {
            id: 2,
            title: "Operational Automation",
            desc: "Kill operational friction. We architect self-healing telemetry pipelines that route mission-critical data in real-time.",
            tags: ["NODE_SYNC", "ASYNC_PROTOCOL", "ZERO_FRICTION"]
        }
    ];

    return (
        <ChapterLayout className="bg-transparent" id="services">
            <div ref={containerRef} className="relative z-10 w-full max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center h-full">

                {/* Title Block: Tactical Capabilities */}
                <div className="lg:pr-12 relative z-20">
                    <div className="overflow-visible py-2">
                        <motion.span
                            className="block text-blue-500 font-mono text-[10px] tracking-[0.5em] mb-4 uppercase"
                            initial={{ opacity: 0, x: -10 }}
                            animate={hasEntered ? { opacity: 1, x: 0 } : {}}
                        >
                            Operational_Asset_Class
                        </motion.span>
                        <h2 className="text-4xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tighter text-white uppercase">
                            <motion.span
                                initial={{ opacity: 0, y: 100 }}
                                animate={hasEntered ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
                                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                className="inline-block whitespace-nowrap"
                            >
                                TACTICAL
                            </motion.span>
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-br from-white to-blue-900 min-h-[1em] inline-block">
                                {hasEntered && (
                                    <Typewriter
                                        text={["DOMINANCE.", "TELEMETRY.", "AUTOMATION."]}
                                        speed={100}
                                        waitTime={2000}
                                        deleteSpeed={50}
                                        initialDelay={800}
                                        cursorChar="_"
                                        className="text-transparent bg-clip-text bg-gradient-to-br from-white to-blue-900"
                                    />
                                )}
                            </span>
                        </h2>
                    </div>
                    <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        animate={hasEntered ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                        transition={{ duration: 0.8, delay: 1.2 }}
                        className="text-lg md:text-xl text-gray-500 max-w-sm border-l-2 border-blue-600/50 pl-6 font-mono tracking-tight"
                    >
                        WE DON'T JUST BUILD INTERFACES. WE DESIGN WEAPONIZED CONVERSION ENGINES.
                    </motion.p>
                </div>

                {/* Interactive Cards: Neural Nodes */}
                <div className="flex flex-col gap-6">
                    {services.map((s, i) => (
                        <motion.div
                            key={s.id}
                            className={cn(
                                "group relative p-10 rounded-sm border transition-all duration-500 overflow-hidden cursor-pointer",
                                active === s.id
                                    ? "bg-blue-600/10 border-blue-500 shadow-[0_0_50px_-12px_rgba(37,99,234,0.3)]"
                                    : "bg-white/5 border-white/10 hover:border-white/30"
                            )}
                            onMouseEnter={() => setActive(s.id)}
                            onMouseLeave={() => setActive(null)}
                            initial={{ opacity: 0, x: 50 }}
                            animate={hasEntered ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                            transition={{
                                duration: 1,
                                delay: 0.5 + (i * 0.2),
                                ease: [0.16, 1, 0.3, 1]
                            }}
                        >
                            {/* Scanning Effect Overlay */}
                            <div className="absolute inset-x-0 top-0 h-[1px] bg-blue-400/50 -translate-y-full group-hover:animate-scan z-20" />

                            {/* Background Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out" />

                            <div className="relative z-10 flex justify-between items-start">
                                <div>
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="text-[10px] font-mono text-blue-500 group-hover:text-white transition-colors">NODE_0{s.id}</span>
                                        <div className="w-10 h-px bg-blue-500/30" />
                                    </div>
                                    <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors uppercase tracking-tight">
                                        {s.title}
                                    </h3>
                                    <p className="text-gray-400 max-w-sm mb-6 leading-relaxed font-sans text-sm">
                                        {s.desc}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {s.tags.map(tag => (
                                            <span key={tag} className="flex items-center gap-2 text-[9px] font-mono font-bold tracking-widest uppercase border border-white/10 px-3 py-1 rounded-sm text-gray-500 group-hover:text-blue-200 group-hover:border-blue-500/50 group-hover:bg-blue-500/10 transition-all duration-300">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="p-3 bg-white/5 border border-white/10 rounded-sm group-hover:border-blue-500/50 group-hover:text-blue-400 transition-all">
                                    <ArrowUpRight size={24} />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </ChapterLayout>
    );
}
