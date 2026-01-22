'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { cn } from '@/utils/cn';
import { Menu, X } from 'lucide-react';

const NAV_ITEMS = [
    { label: 'SERVICES', href: '#services' },
    { label: 'PROJECTS', href: '#projects' },
    { label: 'METHOD', href: '#method' },
    { label: 'BLOG', href: '/blog', isExternal: true },
    { label: 'METRICS', href: '#metrics' },
    { label: 'PRICING', href: '#pricing' },
    { label: 'REVIEWS', href: '#reviews' },
    { label: 'FAQ', href: '#faq' },
];

export function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    const isHome = pathname === '/';

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <motion.header
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b border-transparent",
                    scrolled ? "py-4 bg-[#030305]/90 backdrop-blur-xl border-white/10 shadow-lg" : "py-8 bg-transparent"
                )}
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
                <div className="container mx-auto px-6 flex items-center justify-between">

                    {/* Logo: Intergalactic Agency Branding */}
                    <div
                        className="flex items-center gap-3 cursor-pointer group"
                        onClick={() => {
                            if (isHome) {
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            } else {
                                router.push('/');
                            }
                        }}
                    >
                        <div className="relative w-10 h-10 flex items-center justify-center">
                            <motion.div
                                className="absolute inset-0 bg-blue-600/20 rounded-lg border border-blue-500/50"
                                animate={{ rotate: [0, 90, 0] }}
                                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            />
                            <span className="relative font-black text-white text-xl tracking-tighter">8</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold text-lg tracking-[0.2em] text-white leading-none">
                                INCULC8
                            </span>
                            <span className="text-[10px] font-mono text-blue-500/80 tracking-widest uppercase">Special_Ops_Unit</span>
                        </div>
                    </div>

                    <nav className="hidden xl:flex items-center gap-6">
                        {NAV_ITEMS.map((item) => (
                            <button
                                key={item.label}
                                onClick={() => {
                                    if (item.isExternal) {
                                        router.push(item.href);
                                    } else {
                                        if (isHome) {
                                            const element = document.getElementById(item.href.substring(1));
                                            element?.scrollIntoView({ behavior: 'smooth' });
                                        } else {
                                            router.push('/' + item.href);
                                        }
                                    }
                                }}
                                className="text-[10px] font-mono font-bold text-gray-400 hover:text-white transition-colors relative group tracking-[0.2em] uppercase"
                                aria-label={item.label}
                            >
                                [{item.label}]
                                <span className="absolute -bottom-1 left-0 w-0 h-px bg-blue-500 group-hover:w-full transition-all duration-300 shadow-[0_0_10px_#3b82f6]" />
                            </button>
                        ))}
                    </nav>

                    {/* CTA: Transmission Initiation */}
                    <div className="hidden lg:block">
                        <button
                            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                            className="px-6 py-2.5 rounded-sm bg-white/5 border border-white/10 text-[10px] font-mono font-bold uppercase tracking-[0.3em] hover:bg-white/10 hover:border-white/40 transition-all duration-300 backdrop-blur-md group relative overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                Initiate_Transmission
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                            </span>
                            <div className="absolute inset-x-0 bottom-0 h-[1px] bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                        </button>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="xl:hidden text-white"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <Menu />
                    </button>
                </div>
            </motion.header>

            {/* Mobile Menu Overlay: Command Center */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        className="fixed inset-0 z-[60] bg-[#030305] flex flex-col items-center justify-center p-6"
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "spring", damping: 30, stiffness: 200 }}
                    >
                        <button
                            className="absolute top-8 right-6 text-white p-2"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <X size={32} className="text-blue-500" />
                        </button>

                        <div className="absolute inset-0 pointer-events-none opacity-5">
                            <div className="h-full w-full bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
                        </div>

                        <nav className="flex flex-col items-center gap-6 w-full max-w-sm">
                            <div className="text-blue-500 font-mono text-[10px] tracking-[0.5em] mb-4 uppercase">Operational_Nodes</div>
                            {NAV_ITEMS.map((item, i) => (
                                <motion.button
                                    key={item.label}
                                    onClick={() => {
                                        setMobileMenuOpen(false);
                                        if (item.isExternal) {
                                            router.push(item.href);
                                        } else {
                                            if (isHome) {
                                                const element = document.getElementById(item.href.substring(1));
                                                element?.scrollIntoView({ behavior: 'smooth' });
                                            } else {
                                                router.push('/' + item.href);
                                            }
                                        }
                                    }}
                                    className="text-2xl font-black text-white hover:text-blue-500 transition-colors uppercase tracking-tighter w-full text-center py-2 border-b border-white/5"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                >
                                    {item.label}
                                </motion.button>
                            ))}
                            <motion.button
                                onClick={() => {
                                    setMobileMenuOpen(false);
                                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="mt-8 w-full py-5 rounded-sm bg-blue-600 text-white font-black text-xs uppercase tracking-[0.4em] shadow-[0_0_30px_-5px_#2563eb]"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.4 }}
                            >
                                Initiate_Transmission
                            </motion.button>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
