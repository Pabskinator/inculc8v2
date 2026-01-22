'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
        layoutEffect: false
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <section ref={containerRef} className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
            {/* Magnetic Text Interaction Layer */}
            <motion.div
                className="relative z-10 text-center mix-blend-difference"
                style={{ y, opacity }}
            >
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                >
                    <h1 className="text-[12vw] leading-[0.85] font-black tracking-tighter text-white select-none uppercase">
                        COMMAND <br />
                        <span className="text-transparent bg-clip-text bg-no-repeat bg-gradient-to-r from-white via-blue-500 to-blue-800 animate-pulse">
                            THE FRONTIER
                        </span>
                    </h1>
                </motion.div>

                <motion.p
                    className="mt-8 text-lg md:text-xl text-gray-400 max-w-3xl mx-auto font-mono tracking-widest uppercase"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                >
                    PREMIUM WEB ARCHITECTURE & INTELLIGENT <br />
                    <span className="text-blue-500 border-b border-blue-500/20 pb-1">AUTONOMOUS SYSTEMS</span>
                </motion.p>
            </motion.div>

            {/* Scroll Indicator: Tactical Marker */}
            <motion.div
                className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
            >
                <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-blue-500/60 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping" />
                    Initiate_Descent
                </span>
                <div className="w-px h-16 bg-gradient-to-b from-blue-500 to-transparent shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
            </motion.div>
        </section>
    );
}
