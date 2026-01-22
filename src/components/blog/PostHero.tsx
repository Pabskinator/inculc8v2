'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BlogPost } from '@/types/blog';

interface PostHeroProps {
    post: BlogPost;
}

export default function PostHero({ post }: PostHeroProps) {
    return (
        <header className="relative h-[70vh] w-full overflow-hidden">
            <div className="absolute inset-0 bg-black/60 z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />

            {/* Tactical Scanlines */}
            <div className="absolute inset-0 z-20 pointer-events-none opacity-30 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_4px,3px_100%]" />

            <motion.img
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.7 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover grayscale"
                onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2000';
                }}
            />

            {/* Header Content Overlay */}
            <div className="absolute inset-0 z-30 flex flex-col justify-end pb-20 px-6 sm:px-10 max-w-7xl mx-auto w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                >
                    <div className="flex items-center gap-4 mb-8">
                        <Link href="/blog" className="group flex items-center gap-2 text-cyan-500/60 font-mono text-xs uppercase tracking-[0.2em] hover:text-cyan-400 transition-colors">
                            <span className="text-lg group-hover:-translate-x-1 transition-transform">←</span> Return_to_Intelligence
                        </Link>
                        <span className="text-white/20">|</span>
                        <span className="text-cyan-500 font-mono text-xs uppercase tracking-[0.2em]">{post.category}</span>
                    </div>

                    <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-tighter mb-8 max-w-4xl leading-[0.9]">
                        {post.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-x-12 gap-y-6 pt-8 border-t border-white/10 uppercase font-mono text-[10px] tracking-widest text-white/40">
                        <div className="flex flex-col gap-1">
                            <span className="text-cyan-500/40">Author // Unit</span>
                            <span className="text-white/80">{post.author.name} // {post.author.role}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-cyan-500/40">Deployment // Date</span>
                            <span className="text-white/80">{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-cyan-500/40">Data_Weight // Read</span>
                            <span className="text-white/80">{post.readingTime} Est.</span>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Floating HUD Brackets */}
            <div className="absolute top-10 left-10 w-20 h-20 border-t-2 border-l-2 border-cyan-500/30 z-30 pointer-events-none" />
            <div className="absolute bottom-10 right-10 w-20 h-20 border-b-2 border-r-2 border-cyan-500/30 z-30 pointer-events-none" />
        </header>
    );
}
