'use client';

import { ChapterLayout } from '@/components/layout/ChapterLayout';
import { motion } from 'framer-motion';
import { GlareCard } from '@/components/ui/glare-card';
import { Check, Cpu, Zap, Shield } from 'lucide-react';
import { cn } from '@/utils/cn';

const PLANS = [
    {
        name: "SQUAD",
        price: "₱50k",
        sub: "Baseline_Tactical_Fit",
        features: ["High-Conversion Landing Node", "Professional Edge Deployment", "Performance Optimization", "Essential Security Buffer"],
        icon: Zap
    },
    {
        name: "COMMAND",
        price: "₱70k",
        sub: "Operational_Intelligence",
        features: ["Landing Node + Deployment", "AI Content Core (Blog Alpha)", "CRM Data Integration", "Priority Scaling Nodes", "Behavioral Signal Tracking"],
        popular: true,
        icon: Cpu
    },
    {
        name: "OVERLORD",
        price: "Custom",
        sub: "Architectural_Domination",
        features: ["Bespoke Neural Architecture", "Workflow Entropy Analysis", "Infinite User Throughput", "Legacy System Bridge", "24/7 Ops Engagement"],
        icon: Shield
    }
];

export function Pricing() {
    return (
        <ChapterLayout className="bg-transparent" id="pricing">
            <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center justify-center py-24">

                {/* Section Header: Tactical Investment */}
                <div className="text-center mb-24 space-y-4">
                    <motion.div
                        className="text-blue-500 font-mono text-[10px] tracking-[0.5em] uppercase"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                    >
                        Resource_Allocation_Framework
                    </motion.div>
                    <motion.h2
                        className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                    >
                        INVESTMENT
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full items-stretch">
                    {PLANS.map((p, i) => (
                        <PricingCard key={i} plan={p} index={i} />
                    ))}
                </div>
            </div>
        </ChapterLayout>
    );
}

function PricingCard({ plan, index }: { plan: typeof PLANS[0], index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15, duration: 0.8 }}
            viewport={{ once: true }}
            className={cn(
                "relative transition-all duration-500 flex flex-col",
                plan.popular ? "lg:scale-105 z-20" : "lg:scale-95 z-10 opacity-70 hover:opacity-100"
            )}
        >
            <GlareCard className={cn(
                "relative p-12 flex flex-col h-full rounded-sm",
                plan.popular ? "bg-[#050510] border-blue-500/30" : "bg-black/40 border-white/5"
            )}>
                {/* Tactical Marker Badge */}
                {plan.popular && (
                    <div className="absolute top-6 right-8 bg-blue-500/10 text-blue-400 text-[9px] font-mono font-bold px-4 py-1.5 border border-blue-500/30 rounded-sm tracking-[0.3em]">
                        OPTIMAL_PATH
                    </div>
                )}

                {/* Header: Resource Node */}
                <div className="mb-14">
                    <div className="flex items-center gap-3 mb-5">
                        <plan.icon className={cn("w-5 h-5", plan.popular ? "text-blue-500" : "text-gray-600")} />
                        <span className="text-[10px] font-mono text-gray-400 tracking-[0.4em] uppercase">{plan.sub}</span>
                    </div>
                    <h3 className="text-4xl font-black text-white mb-2 uppercase tracking-tighter">{plan.name}</h3>
                    <div className="flex items-baseline gap-2">
                        <span className="text-5xl font-black text-white tracking-tighter font-mono">{plan.price}</span>
                        <span className="text-[9px] font-mono text-blue-500/50 uppercase tracking-widest font-bold"> // SIG_INIT</span>
                    </div>
                </div>

                {/* Features List: Capabilities */}
                <div className="flex-1 space-y-5 mb-16">
                    {plan.features.map((feat, fi) => (
                        <div key={fi} className="flex items-start gap-4">
                            <div className={cn(
                                "mt-1 w-4 h-4 rounded-sm flex-shrink-0 flex items-center justify-center border transition-all duration-300",
                                plan.popular ? "border-blue-500/50 bg-blue-500/10" : "border-white/10 bg-white/5"
                            )}>
                                <Check className={cn("w-2.5 h-2.5", plan.popular ? "text-blue-500" : "text-white/40")} />
                            </div>
                            <span className="text-[14px] text-gray-400 group-hover:text-white transition-colors font-sans leading-snug">
                                {feat}
                            </span>
                        </div>
                    ))}
                </div>

                {/* CTA: Initiation */}
                <button
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    className={cn(
                        "w-full py-5 rounded-sm font-mono font-bold uppercase text-[10px] tracking-[0.4em] transition-all duration-500",
                        plan.popular
                            ? "bg-blue-600 text-white shadow-[0_0_30px_-5px_#2563eb] hover:shadow-[0_0_50px_-5px_#2563eb] hover:-translate-y-1"
                            : "bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-white/30"
                    )}
                >
                    {plan.price === "Custom" ? "INITIATE_CONSULT" : "INITIATE_PROCUREMENT"}
                </button>
            </GlareCard>
        </motion.div>
    );
}
