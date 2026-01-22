'use client';

import { ChapterLayout } from '@/components/layout/ChapterLayout';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Shield, CheckCircle2, Activity, Zap, MessageSquare, Quote } from 'lucide-react';
import { GlowCard } from '@/components/ui/spotlight-card';
import { cn } from '@/utils/cn';
import React, { useRef, useState, useEffect } from 'react';

const REVIEWS = [
    {
        quote: "Direct revenue lift of 40% within 30 days of deployment.",
        author: "Sarah J.",
        role: "CMO, TechFlow",
        metric: "40% LIFT",
        id: "TCK_902"
    },
    {
        quote: "The automation protocol saved us 80+ engineering hours monthly.",
        author: "Mike R.",
        role: "Head of Ops, ScaleUp",
        metric: "80h SAVED",
        id: "OPS_114"
    },
    {
        quote: "Interface fidelity is beyond anything we've achieved internally.",
        author: "Elena T.",
        role: "Product Lead, LuxHomes",
        metric: "UI_ELITE",
        id: "DSN_202"
    },
    {
        quote: "A machine that generates leads while we sleep. True automation.",
        author: "David K.",
        role: "Founder, GrowthEngine",
        metric: "24/7 OPS",
        id: "LND_001"
    },
    {
        quote: "Complexity handled with surgical precision. Incredible team.",
        author: "Rachel L.",
        role: "CTO, FintechCore",
        metric: "PRECISION",
        id: "ENG_882"
    },
    {
        quote: "The visual story telling approach is a game changer for sales.",
        author: "James W.",
        role: "CEO, NexaVibe",
        metric: "SALES_UP",
        id: "V_771"
    }
];

// Firefox Detection Hook
function useIsFirefox() {
    const [isFirefox, setIsFirefox] = useState(false);
    useEffect(() => {
        setIsFirefox(typeof navigator !== 'undefined' && /firefox/i.test(navigator.userAgent));
    }, []);
    return isFirefox;
}

function MarqueeRow({ reviews, speed = 60, reverse = false, isFirefox }: { reviews: typeof REVIEWS, speed?: number, reverse?: boolean, isFirefox: boolean }) {
    const [isPaused, setIsPaused] = useState(false);

    return (
        <div
            className="flex overflow-hidden py-4 relative group/marquee"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Gradient Fade Overlays (Cheaper than Mask) */}
            <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-[#030305] to-transparent z-20" />
            <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-[#030305] to-transparent z-20" />

            <div
                className={cn(
                    "flex gap-6 whitespace-nowrap will-change-transform",
                    reverse ? "animate-marquee-reverse" : "animate-marquee"
                )}
                style={{
                    '--duration': `${speed}s`,
                    '--play-state': isPaused ? 'paused' : 'running',
                    transform: 'translate3d(0,0,0)',
                } as any}
            >
                {/* Double the content for a seamless loop with translateY(-50%) */}
                {[...reviews, ...reviews].map((review, i) => (
                    <ValidationCard key={`${i}-${review.id}`} review={review} isParentPaused={isPaused} isFirefox={isFirefox} />
                ))}
            </div>
        </div>
    );
}

// Mobile Optimization: Reduces 3D transforms and blur
import { useMobile } from '@/hooks/use-mobile';


function ValidationCard({ review, isParentPaused, isFirefox }: { review: typeof REVIEWS[0], isParentPaused: boolean, isFirefox: boolean }) {
    const isMobile = useMobile();

    return (
        <div className="w-[450px] flex-shrink-0 px-3 whitespace-normal transform-gpu">
            <motion.div
                whileHover={isFirefox ? undefined : { scale: 1.02 }}
                transition={{ type: "spring", stiffness: 250, damping: 30 }}
                className="h-full"
            >
                {isFirefox ? (
                    // Firefox Fallback: Simple Card (No Glow/Blur/Heavy Effects)
                    <div
                        className={cn(
                            "relative h-full rounded-2xl border border-white/10 bg-black/60 p-8 flex flex-col justify-between transition-opacity",
                            isParentPaused ? "opacity-60" : "opacity-100"
                        )}
                    >
                        <CardContent review={review} isFirefox={isFirefox} />
                    </div>
                ) : (
                    // Standard Premium Card
                    <GlowCard
                        glowColor="purple"
                        customSize
                        className={cn(
                            "h-full bg-black/60 border-white/5 p-8 flex flex-col justify-between group/card transition-all duration-500",
                            // Performance: Blur removed to prevent compositor lag during marquee movement
                            isParentPaused ? "opacity-40 hover:opacity-100" : "opacity-100"
                        )}
                    >
                        <CardContent review={review} isFirefox={isFirefox} />
                        {/* Technical Overlay */}
                        <div className="absolute top-2 right-4 opacity-0 group-hover/card:opacity-100 transition-opacity">
                            <Activity className="w-3 h-3 text-neon-purple/40 animate-pulse" />
                        </div>
                    </GlowCard>
                )}
            </motion.div>
        </div>
    );
}

function CardContent({ review, isFirefox }: { review: typeof REVIEWS[0], isFirefox: boolean }) {
    return (
        <>
            <div className="flex justify-between items-start mb-6">
                <div className="flex gap-2">
                    <div className="w-8 h-8 rounded bg-neon-purple/20 flex items-center justify-center border border-neon-purple/30">
                        <Quote className="w-4 h-4 text-neon-purple" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">{review.id}</span>
                        <span className="text-[10px] font-mono text-neon-purple/60 uppercase">VERIFIED_TRANSMISSION</span>
                    </div>
                </div>
                <div className="px-3 py-1 rounded-full bg-neon-purple/10 border border-neon-purple/20 text-[9px] font-black text-neon-purple uppercase tracking-tighter">
                    {review.metric}
                </div>
            </div>

            <p className="text-xl font-medium text-white/90 leading-snug tracking-tight mb-8">
                "{review.quote}"
            </p>

            <div className="flex items-center justify-between pt-6 border-t border-white/5">
                <div className="flex flex-col">
                    <span className="font-bold text-white text-sm uppercase">{review.author}</span>
                    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">{review.role}</span>
                </div>
                <div className="flex gap-1">
                    {[1, 2, 3].map((s) => (
                        <div
                            key={s}
                            className={cn(
                                "w-1 h-3 bg-neon-purple/40 rounded-full transition-all",
                                !isFirefox && "group-hover/card:h-4"
                            )}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}

export function Testimonials() {
    const containerRef = useRef(null);
    const [isReady, setIsReady] = useState(false);
    const isMobile = useMobile();
    const isFirefox = useIsFirefox();

    useEffect(() => {
        setIsReady(true);
    }, []);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
        layoutEffect: false
    });

    if (!isReady) return <div className="h-screen bg-black" />;

    return (
        <ChapterLayout className="bg-transparent overflow-visible" id="reviews">
            <div ref={containerRef} className="relative z-10 w-full py-32">

                {/* Background HUD Decor */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03] overflow-hidden">
                    <div className="absolute top-20 left-10 font-mono text-[8vw] leading-none text-white font-black select-none">
                        VALIDATION
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-6 mb-24 relative">
                    <motion.div
                        className="text-blue-500 font-mono text-[10px] tracking-[0.5em] uppercase mb-4"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                    >
                        Success_Telemetry_Delta
                    </motion.div>
                    <div className="flex flex-col md:flex-row items-baseline gap-8">
                        <motion.h2
                            className="text-7xl md:text-9xl font-black text-white tracking-tighter uppercase leading-none"
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                        >
                            COMMAND <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-white">VERIFICATION</span>
                        </motion.h2>

                        <div className="max-w-sm">
                            <p className="text-gray-500 font-mono text-xs leading-relaxed uppercase">
                                Real-time verification of partner outcomes. Our systems convert ambition into predictable, high-performance digital infrastructure.
                            </p>
                            <div className="mt-4 flex gap-4">
                                <div className="flex items-center gap-2">
                                    <Shield className="w-3 h-3 text-neon-purple" />
                                    <span className="text-[9px] font-mono text-gray-400">ENCRYPTED_TRUST</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="w-3 h-3 text-neon-purple" />
                                    <span className="text-[9px] font-mono text-gray-400">VERIFIED_ROI</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Perspective Container - 3D Tilt Removed for Performance */}
                <div className="relative space-y-4">
                    <MarqueeRow reviews={REVIEWS.slice(0, 3)} speed={isFirefox ? 120 : 80} isFirefox={isFirefox} />
                    <MarqueeRow reviews={REVIEWS.slice(3)} speed={isFirefox ? 140 : 100} reverse isFirefox={isFirefox} />
                </div>

                {/* Bottom Stats */}
                <div className="mt-24 max-w-7xl mx-auto px-6 grid grid-cols-2 xl:grid-cols-4 gap-y-8 gap-x-4 md:gap-8">
                    {[
                        { label: "Partner Satisfaction", val: "100%", sub: "NOMINAL" },
                        { label: "System Uptime", val: "99.9%", sub: "OPTIMAL" },
                        { label: "Engineering ROI", val: "3.4x", sub: "AVERAGE" },
                        { label: "Support Latency", val: "< 2H", sub: "FAST_SYNC" }
                    ].map((s, i) => (
                        <div key={i} className="space-y-1">
                            <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">{s.label}</div>
                            <div className="text-4xl font-black text-white">{s.val}</div>
                            <div className="text-[9px] font-mono text-neon-purple uppercase">{s.sub}</div>
                        </div>
                    ))}
                </div>
            </div>
        </ChapterLayout>
    );
}
