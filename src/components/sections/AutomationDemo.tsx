'use client';

import { ChapterLayout } from '@/components/layout/ChapterLayout';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';
import { useEffect, useState } from 'react';
import { GlowCard } from '@/components/ui/spotlight-card';

const METRICS = [
    {
        label: "Lead Velocity",
        value: "842",
        unit: "leads/mo",
        color: "blue",
        detail: "Real-time sync active"
    },
    {
        label: "Conversion Lift",
        value: "+14.2",
        unit: "%",
        color: "purple",
        detail: "A/B Delta Optimal"
    },
    {
        label: "System Uptime",
        value: "99.99",
        unit: "%",
        color: "green",
        detail: "Edge-Global Active"
    },
    {
        label: "OpEx Saved",
        value: "$4.2K",
        unit: "rescued",
        color: "orange",
        detail: "ROI Maximized"
    }
];

// Mobile optimizations for Neomorphic Dashboard
import { useMobile } from '@/hooks/use-mobile';

export function AutomationDemo() {
    const isMobile = useMobile();

    return (
        <ChapterLayout className="bg-transparent" id="metrics">
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">

                {/* Neomorphic Dashboard Container: Command Center */}
                <motion.div
                    className={cn(
                        "w-full max-w-6xl min-h-0 md:min-h-[600px] md:aspect-video rounded-sm border border-white/5 relative overflow-hidden shadow-2xl p-4 md:p-8",
                        // Mobile: Solid dark (fast) + Auto Height, Desktop: Blur (premium)
                        "bg-black/90 h-auto md:bg-black/60 md:backdrop-blur-3xl"
                    )}
                    initial={{ scale: 0.9, opacity: 0, rotateX: 10 }}
                    whileInView={{ scale: 1, opacity: 1, rotateX: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    {/* Header UI: Mission Telemetry */}
                    <div className="flex justify-between items-center mb-12 border-b border-white/5 pb-6">
                        <div className="flex gap-4">
                            <div className="w-3 h-3 rounded-full bg-blue-500/20 border border-blue-500/50" />
                            <div className="w-3 h-3 rounded-full bg-blue-500/10 border border-blue-500/30" />
                            <div className="w-3 h-3 rounded-full bg-blue-500/5 border border-blue-500/10" />
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="font-mono text-[9px] text-gray-600 tracking-[0.4em] uppercase hidden md:block">
                                SIG_INT_RECEPTION_STABLE
                            </div>
                            <div className="font-mono text-[10px] text-blue-500 animate-pulse flex items-center gap-2 font-bold">
                                <span className="w-2 h-2 rounded-full bg-blue-500" />
                                LIVE_TELEMETRY_TX
                            </div>
                        </div>
                    </div>

                    {/* Dynamic Data Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 relative z-10 h-auto md:h-[80%] content-start md:content-stretch">
                        {METRICS.map((metric, i) => (
                            <MetricCard key={i} metric={metric} />
                        ))}
                    </div>

                    {/* Text Overlay: Tactical HUD */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <h2 className="text-9xl font-black text-white mix-blend-overlay opacity-5 tracking-tighter uppercase select-none">
                            NEURAL_SIGNAL
                        </h2>
                    </div>

                </motion.div>
            </div>
        </ChapterLayout>
    );
}

function MetricCard({ metric }: { metric: typeof METRICS[0] }) {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        setScrolled(true);
    }, []);

    return (
        <GlowCard
            glowColor={metric.color as any}
            customSize
            className="flex flex-col justify-between bg-black/40 border-white/5 hover:bg-black/60 transition-colors"
        >
            <div className="relative z-20 space-y-2">
                <div className="text-gray-500 text-[10px] font-mono uppercase tracking-widest">{metric.label}</div>
                <div className="flex items-baseline gap-2">
                    <div className="text-4xl font-black text-white tracking-tight">{metric.value}</div>
                    <div className="text-xs font-bold text-gray-500">{metric.unit}</div>
                </div>
                <div className="text-[10px] font-mono text-cyan-400/40">{metric.detail}</div>
            </div>

            {/* Dynamic Charts */}
            <div className="h-24 flex items-end justify-between gap-1 opacity-40 group-hover:opacity-80 transition-opacity">
                {scrolled && [...Array(6)].map((_, j) => (
                    <motion.div
                        key={j}
                        className={cn(
                            "w-full rounded-t-[1px]",
                            metric.color === 'blue' ? "bg-blue-400" :
                                metric.color === 'purple' ? "bg-purple-400" :
                                    metric.color === 'green' ? "bg-green-400" : "bg-orange-400"
                        )}
                        initial={{ height: "10%" }}
                        animate={{ height: `${20 + Math.random() * 80}%` }}
                        transition={{
                            duration: 1.5 + Math.random(),
                            repeat: Infinity,
                            repeatType: "reverse",
                            delay: j * 0.1
                        }}
                    />
                ))}
            </div>
        </GlowCard>
    );
}
