'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative z-10 bg-black pt-20 pb-10 border-t border-white/5 overflow-hidden">
            {/* Background HUD Decorations */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
            <div className="absolute top-0 left-0 w-20 h-20 border-t border-l border-cyan-500/5 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-40 h-40 border-b border-r border-cyan-500/5 pointer-events-none" />

            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Brand Info */}
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-3 mb-6 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                            <div className="relative w-8 h-8 flex items-center justify-center">
                                <div className="absolute inset-0 bg-blue-600/10 rounded-sm border border-blue-500/30 group-hover:border-blue-400 group-hover:bg-blue-600/20 transition-all" />
                                <span className="relative font-black text-white text-sm">8</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-bold text-base tracking-[0.2em] text-white">INCULC8</span>
                                <span className="text-[8px] font-mono text-blue-500/60 tracking-widest uppercase">Special_Ops_Unit</span>
                            </div>
                        </div>
                        <p className="text-white/40 text-sm leading-relaxed max-w-sm font-mono uppercase tracking-tight">
                            World-class websites and autonomous automation systems for ambitious crews. Delivering operational excellence through high-fidelity engineering.
                        </p>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex flex-col gap-4">
                        <span className="text-cyan-500 font-mono text-[10px] tracking-[0.3em] uppercase mb-2">Systems //</span>
                        {[
                            { label: 'Services', href: '/#services' },
                            { label: 'Projects', href: '/#projects' },
                            { label: 'Method', href: '/#method' },
                            { label: 'Intelligence', href: '/blog' }
                        ].map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                className="text-xs uppercase font-mono text-white/40 hover:text-white transition-colors tracking-widest"
                            >
                                [{link.label}]
                            </Link>
                        ))}
                    </div>

                    {/* Contact/Social Links */}
                    <div className="flex flex-col gap-4">
                        <span className="text-cyan-500 font-mono text-[10px] tracking-[0.3em] uppercase mb-2">Comms //</span>
                        {[
                            { label: 'Twitter', href: '#' },
                            { label: 'LinkedIn', href: '#' },
                            { label: 'Email', href: '#' },
                            { label: 'Portal', href: '#' }
                        ].map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                className="text-xs uppercase font-mono text-white/40 hover:text-white transition-colors tracking-widest"
                            >
                                {link.label}_X_Link
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col sm:row items-center justify-between gap-6">
                    <div className="flex items-center gap-6 text-[10px] font-mono text-white/20 uppercase tracking-widest">
                        <span>© {currentYear} INCULC8_STUDIOS</span>
                        <span className="hidden sm:inline">//</span>
                        <span className="hidden sm:inline">ALL_SYS_OPERATIONAL</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_8px_#06b6d4]" />
                        <span className="text-[10px] font-mono text-cyan-500/40 uppercase tracking-[0.2em]">
                            Global_Uplink_Active
                        </span>
                    </div>
                </div>
            </div>

            {/* Terminal Scanlines Effect (Subtle) */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.03))] bg-[length:100%_2px,3px_100%]" />
        </footer>
    );
}
