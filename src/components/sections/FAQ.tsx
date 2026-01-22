'use client';

import { ChapterLayout } from '@/components/layout/ChapterLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown, Cpu, Hash, Terminal, ShieldCheck, Zap } from 'lucide-react';
import { cn } from '@/utils/cn';

const QA = [
    {
        id: "ARCH_01",
        q: "WHAT IS THE STANDARD BUILD LATENCY?",
        a: "TYPICAL ENGAGEMENT CYCLES RANGE FROM 3.5 TO 7.2 DAYS FOR CORE ARCHITECTURE. COMPLEX DISTRIBUTED SYSTEMS WITH INTEGRATED AUTOMATION PROTOCOLS REQUIRE 2-4 WEEKS FOR FULL DEPLOYMENT AND OPTIMIZATION.",
        status: "OPTIMAL"
    },
    {
        id: "COMM_02",
        q: "DO YOU PROVIDE STRATEGIC MESSAGING & COPY?",
        a: "YES. WE UTILIZE PSYCHOGRAPHIC DATA ANALYSIS TO CRAFT HIGH-CONVERSION TECHNICAL MESSAGING. WE DON'T JUST DESIGN INTERFACES; WE ARCHITECT SALES MACHINES.",
        status: "VERIFIED"
    },
    {
        id: "INTG_03",
        q: "SYSTEM COMPATIBILITY: HUBSPOT / NOTION / AIRTABLE?",
        a: "OUR CORE IS BUILT FOR MAXIMUM INTEROPERABILITY. WE ARE SPECIALISTS IN MAKE.COM AND CUSTOM WEBHOOK ARCHITECTURES, CONNECTING ANY DATA SOURCE TO YOUR GROWTH ENGINE WITH ZERO FRICTION.",
        status: "COMPATIBLE"
    },
    {
        id: "MAINT_04",
        q: "DO YOU OFFER PERSISTENT SYSTEM MAINTENANCE?",
        a: "AFFIRMATIVE. WE DEPLOY POST-LAUNCH MONITORING PACKAGES FOR CONTINUOUS OPTIMIZATION, PERFORMANCE TUNING, AND ITERATIVE AUTOMATION SCALING.",
        status: "PERSISTENT"
    }
];

export function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <ChapterLayout className="bg-transparent py-32" id="faq">
            <div className="relative z-10 w-full max-w-4xl mx-auto px-6">

                {/* Protocol Header: Knowledge Retrieval */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div className="space-y-4">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-3 text-blue-500"
                        >
                            <Terminal className="w-4 h-4" />
                            <span className="text-[10px] font-mono uppercase tracking-[0.4em]">Information_Protocol_v3.2</span>
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-none"
                        >
                            SIGNAL <br />
                            <span className="text-white/20">RETRIEVAL</span>
                        </motion.h2>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="flex flex-col items-end gap-2"
                    >
                        <div className="flex gap-2">
                            <div className="w-12 h-1 bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-blue-500"
                                    animate={{ width: ["0%", "100%", "0%"] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                />
                            </div>
                        </div>
                        <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">Protocol_Sync: Nominal</span>
                    </motion.div>
                </div>

                {/* Schema Grid */}
                <div className="grid grid-cols-1 gap-4">
                    {QA.map((item, i) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className={cn(
                                "group relative border transition-all duration-500 overflow-hidden rounded-2xl",
                                openIndex === i
                                    ? "bg-white/5 border-white/20 shadow-[0_0_50px_-12px_rgba(255,255,255,0.1)]"
                                    : "bg-black/20 border-white/5 hover:border-white/10"
                            )}
                        >
                            {/* Technical Sidebar */}
                            <div
                                className="p-8 cursor-pointer flex items-center justify-between"
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                            >
                                <div className="flex items-center gap-6">
                                    <div className="hidden md:flex flex-col items-center gap-1 opacity-20 group-hover:opacity-40 transition-opacity">
                                        <Hash className="w-3 h-3 text-white" />
                                        <div className="w-[1px] h-8 bg-gradient-to-b from-white to-transparent" />
                                    </div>

                                    <div className="space-y-1">
                                        <div className="flex items-center gap-3">
                                            <span className="text-[10px] font-mono text-neon-purple font-bold tracking-widest">{item.id}</span>
                                            <div className="h-[1px] w-4 bg-white/10" />
                                            <span className="text-[9px] font-mono text-gray-500 uppercase tracking-tighter">{item.status}</span>
                                        </div>
                                        <h3 className={cn(
                                            "text-lg md:text-xl font-bold tracking-tight uppercase transition-colors",
                                            openIndex === i ? "text-white" : "text-gray-400 group-hover:text-gray-200"
                                        )}>
                                            {item.q}
                                        </h3>
                                    </div>
                                </div>

                                <motion.div
                                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                                    className={cn(
                                        "w-10 h-10 rounded-full border flex items-center justify-center transition-colors",
                                        openIndex === i ? "border-neon-purple bg-neon-purple/20 text-neon-purple" : "border-white/10 text-gray-500 group-hover:border-white/20"
                                    )}
                                >
                                    <ChevronDown className="w-4 h-4" />
                                </motion.div>
                            </div>

                            <AnimatePresence>
                                {openIndex === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                                    >
                                        <div className="px-8 pb-8 md:pl-24 relative">
                                            {/* Data Line Decoration */}
                                            <div className="absolute left-8 md:left-14 top-0 bottom-8 w-[1px] bg-gradient-to-b from-neon-purple/50 via-neon-purple/20 to-transparent" />

                                            <div className="flex flex-col gap-6">
                                                <p className="text-gray-400 text-sm md:text-base leading-relaxed font-medium tracking-wide max-w-2xl">
                                                    {item.a}
                                                </p>

                                                <div className="flex flex-wrap gap-4">
                                                    <div className="flex items-center gap-2 px-3 py-1 rounded bg-white/5 border border-white/5">
                                                        <ShieldCheck className="w-3 h-3 text-neon-purple" />
                                                        <span className="text-[9px] font-mono text-gray-400 uppercase">Verification_Secure</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 px-3 py-1 rounded bg-white/5 border border-white/5">
                                                        <Zap className="w-3 h-3 text-neon-purple" />
                                                        <span className="text-[9px] font-mono text-gray-400 uppercase">Auto_Update_Active</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Background Pattern */}
                            <div className="absolute top-0 right-0 p-4 opacity-[0.02] pointer-events-none transition-opacity group-hover:opacity-[0.05]">
                                <Cpu className="w-32 h-32" />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom Protocol Footer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-16 flex flex-col md:flex-row items-center justify-between border-t border-white/5 pt-8 gap-4"
                >
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Node_Alpha: Live</span>
                        </div>
                        <div className="w-[1px] h-4 bg-white/10" />
                        <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Registry: 0x9928-883</span>
                    </div>

                    <button
                        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                        className="text-[10px] font-mono text-neon-purple uppercase tracking-[0.3em] font-black hover:text-white transition-colors"
                    >
                        [ ARCHITECT_CONNECTION_ESTABLISHED ]
                    </button>
                </motion.div>
            </div>
        </ChapterLayout>
    );
}
