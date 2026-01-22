'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function BlogHeader({ title, subtitle }: { title: string, subtitle: string }) {
    return (
        <header className="mb-20 border-l-4 border-cyan-500 pl-8 relative">
            <div className="absolute top-0 -left-1 w-2 h-full bg-cyan-400/20 blur-sm" />
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
            >
                <span className="text-cyan-500/60 font-mono text-sm tracking-[0.3em] uppercase block mb-4">
                    {subtitle}
                </span>
                <h1 className="text-5xl sm:text-7xl font-bold uppercase tracking-tighter text-white">
                    Mission <span className="text-cyan-400">{title}</span>
                </h1>
            </motion.div>

            {/* HUD Meta Decorations */}
            <div className="absolute top-0 right-0 hidden lg:block text-right opacity-30">
                <div className="text-[10px] font-mono text-cyan-400 mb-1">AUTH_LEVEL: LEVEL_5_OVERRIDE</div>
                <div className="text-[10px] font-mono text-cyan-400">LOC_ID: DATA_CORE_01</div>
            </div>
        </header>
    );
}
