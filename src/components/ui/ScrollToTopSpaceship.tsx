'use client';

/**
 * Tactical Scroll-to-Top HUD Component
 * Glitch and screen effects are strictly gated behind the hover state.
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ScrollToTopSpaceship() {
    const [isVisible, setIsVisible] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            const scrollPos = window.scrollY;
            if (scrollPos > 300) {
                setIsVisible(true);
            } else if (scrollPos < 100) {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const handleScrollToTop = () => {
        if (isClicked) return;
        setIsClicked(true);

        setTimeout(() => {
            // @ts-ignore
            if (window.lenis) {
                // @ts-ignore
                window.lenis.scrollTo(0, { duration: 1.5 });
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }, 100);

        setTimeout(() => {
            setIsClicked(false);
        }, 2000);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="fixed bottom-8 right-8 z-[100]"
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 10 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                >
                    <button
                        className="relative group flex flex-col items-center justify-center px-6 py-4 bg-black/80 backdrop-blur-xl border border-cyan-500/20 overflow-hidden transition-all duration-300 hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] rounded-sm"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        onClick={handleScrollToTop}
                    >
                        {/* CRT Scanline Overlay - Only active on hover */}
                        <div className={`absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] z-0 bg-[length:100%_4px,3px_100%] transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />

                        {/* Scanning HUD Line - Only animate on hover */}
                        {isHovered && (
                            <motion.div
                                className="absolute inset-x-0 h-[2px] bg-cyan-400/20 shadow-[0_0_15px_rgba(6,182,212,0.5)] z-0"
                                initial={{ top: '-10%' }}
                                animate={{ top: '110%' }}
                                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                            />
                        )}

                        {/* Animated HUD Corners */}
                        <motion.div
                            className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-400/80"
                            animate={isHovered ? { translate: [-2, 0, -2], opacity: [0.6, 1, 0.6] } : { translate: 0, opacity: 0.3 }}
                        />
                        <motion.div
                            className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyan-400/80"
                            animate={isHovered ? { translate: [2, 0, 2], opacity: [0.6, 1, 0.6] } : { translate: 0, opacity: 0.3 }}
                        />
                        <motion.div
                            className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyan-400/80"
                            animate={isHovered ? { translate: [-2, 0, -2], opacity: [0.6, 1, 0.6] } : { translate: 0, opacity: 0.3 }}
                        />
                        <motion.div
                            className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-400/80"
                            animate={isHovered ? { translate: [2, 0, 2], opacity: [0.6, 1, 0.6] } : { translate: 0, opacity: 0.3 }}
                        />

                        {/* Glitch Flash on Click */}
                        <AnimatePresence>
                            {isClicked && (
                                <motion.div
                                    className="absolute inset-0 bg-cyan-400/30 z-20"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: [0, 1, 0, 0.8, 0], x: [-5, 5, -2, 0] }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.4 }}
                                />
                            )}
                        </AnimatePresence>

                        {/* Main Content */}
                        <div className="relative z-10 flex flex-col items-center pointer-events-none">
                            <motion.span
                                className="text-[10px] uppercase font-mono tracking-[0.4em] text-cyan-500/40 mb-1"
                                animate={isHovered ? { opacity: [0.4, 0.8, 0.4], skewX: [-5, 5, 0] } : { opacity: 0.4, skewX: 0 }}
                                transition={{ repeat: Infinity, duration: 2 }}
                            >
                                SYS_LINK
                            </motion.span>

                            <div className="relative">
                                {/* RGB Shift Shadows - Hidden by default */}
                                <motion.span
                                    className="absolute inset-0 text-red-500/40 font-bold uppercase font-mono tracking-[0.2em] blur-[1px]"
                                    animate={isHovered ? { x: [-2, 2, -1, 0], opacity: [0, 0.6, 0] } : { opacity: 0, x: 0 }}
                                    transition={{ repeat: Infinity, duration: 0.2 }}
                                >
                                    ASCENT
                                </motion.span>
                                <motion.span
                                    className="absolute inset-0 text-blue-500/40 font-bold uppercase font-mono tracking-[0.2em] blur-[1px]"
                                    animate={isHovered ? { x: [2, -2, 1, 0], opacity: [0, 0.6, 0] } : { opacity: 0, x: 0 }}
                                    transition={{ repeat: Infinity, duration: 0.2, delay: 0.1 }}
                                >
                                    ASCENT
                                </motion.span>

                                <motion.span
                                    className="text-base font-black uppercase font-mono tracking-[0.2em] text-cyan-400"
                                    animate={isHovered ? {
                                        textShadow: [
                                            "0 0 10px rgba(6,182,212,0.8)",
                                            "0 0 25px rgba(6,182,212,0.4)",
                                            "0 0 10px rgba(6,182,212,0.8)"
                                        ],
                                        skewX: [0, -10, 10, 0]
                                    } : { textShadow: "none", skewX: 0 }}
                                    transition={isHovered ? {
                                        textShadow: { repeat: Infinity, duration: 1.5 },
                                        skewX: { repeat: Infinity, duration: 0.3, repeatType: "mirror" }
                                    } : {}}
                                >
                                    ASCENT
                                </motion.span>
                            </div>

                            {/* Signal Indicator */}
                            <div className="flex gap-1.5 mt-2">
                                {[0, 1, 2].map((i) => (
                                    <motion.div
                                        key={i}
                                        className="w-1 h-1 bg-cyan-400/80"
                                        animate={isHovered ? {
                                            height: [4, 12, 6, 8],
                                            opacity: [0.4, 1, 0.6]
                                        } : { height: 4, opacity: 0.3 }}
                                        transition={isHovered ? {
                                            repeat: Infinity,
                                            duration: 0.5,
                                            delay: i * 0.1,
                                            ease: "linear"
                                        } : {}}
                                    />
                                ))}
                            </div>
                        </div>
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
