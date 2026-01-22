'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BlogPost } from '@/types/blog';

interface BlogGridProps {
    posts: BlogPost[];
}

export default function BlogGrid({ posts }: BlogGridProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
                <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group relative h-full flex flex-col bg-black/40 backdrop-blur-md border border-white/5 hover:border-cyan-500/40 transition-colors"
                >
                    {/* Image Container */}
                    <Link href={`/blog/${post.slug}`} className="relative h-64 overflow-hidden block">
                        <div className="absolute inset-0 bg-cyan-900/10 mix-blend-overlay z-10" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10" />

                        {/* Tactical Scanlines on Image */}
                        <div className="absolute inset-0 z-20 pointer-events-none opacity-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_4px,3px_100%]" />

                        <img
                            src={post.coverImage}
                            alt={post.title}
                            className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000';
                            }}
                        />

                        {/* HUD Corners for image */}
                        <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity z-30" />
                        <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity z-30" />
                    </Link>

                    {/* Content Area */}
                    <div className="p-8 flex-grow flex flex-col relative">
                        {/* Category Tag */}
                        <div className="flex items-center gap-3 mb-6">
                            <span className="w-1.5 h-1.5 bg-cyan-400" />
                            <span className="text-[10px] uppercase font-mono tracking-widest text-cyan-500/60">
                                {post.category} // INTEL_{index + 1}
                            </span>
                        </div>

                        <Link href={`/blog/${post.slug}`} className="block group/title">
                            <h2 className="text-2xl font-bold leading-tight mb-4 group-hover/title:text-cyan-400 transition-colors">
                                {post.title}
                            </h2>
                        </Link>

                        <p className="text-white/60 text-sm leading-relaxed mb-8 flex-grow">
                            {post.excerpt}
                        </p>

                        {/* Meta Info */}
                        <footer className="pt-6 border-t border-white/5 flex items-center justify-between">
                            <span className="text-[10px] font-mono text-white/40 uppercase">
                                {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                            </span>
                            <span className="text-[10px] font-mono text-cyan-500/40 uppercase tracking-tighter">
                                Read_Time: {post.readingTime}
                            </span>
                        </footer>

                        {/* Decorative scanline pulse */}
                        <motion.div
                            className="absolute bottom-0 left-0 h-[1px] bg-cyan-500/30 z-0"
                            initial={{ width: 0 }}
                            whileHover={{ width: '100%' }}
                        />
                    </div>
                </motion.article>
            ))}
        </div>
    );
}
