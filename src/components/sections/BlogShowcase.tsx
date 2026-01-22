'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { BlogPost } from '@/types/blog';

interface BlogShowcaseProps {
    posts: BlogPost[];
}

export function BlogShowcase({ posts }: BlogShowcaseProps) {
    // Show only the latest 3 posts
    const latestPosts = posts.slice(0, 3);

    return (
        <section className="py-24 relative overflow-hidden bg-black/50 overflow-hidden">
            {/* HUD Background Decorations */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div className="border-l-2 border-cyan-500 pl-6">
                        <motion.span
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="text-cyan-500/60 font-mono text-[10px] tracking-[0.4em] uppercase block mb-2"
                        >
                            Terminal // Intel_Briefings
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white"
                        >
                            Latest Intelligence
                        </motion.h2>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Link
                            href="/blog"
                            className="group flex items-center gap-3 text-[10px] font-mono font-bold text-cyan-400 hover:text-white transition-colors tracking-[0.2em] uppercase"
                        >
                            View_All_Reports
                            <span className="w-8 h-px bg-cyan-400 group-hover:w-12 transition-all" />
                        </Link>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {latestPosts.map((post, index) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group"
                        >
                            <Link href={`/blog/${post.slug}`} className="block relative">
                                {/* Tactical Card */}
                                <div className="relative aspect-[16/10] overflow-hidden mb-6 border border-white/10 group-hover:border-cyan-500/50 transition-colors">
                                    <div className="absolute inset-0 bg-black/40 z-10 group-hover:bg-transparent transition-colors duration-500" />

                                    {/* Scanlines on Card */}
                                    <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_4px,3px_100%] z-20" />

                                    <img
                                        src={post.coverImage}
                                        alt={post.title}
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000';
                                        }}
                                    />

                                    {/* HUD Corners */}
                                    <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-cyan-400/60 opacity-0 group-hover:opacity-100 transition-opacity z-30" />
                                    <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-cyan-400/60 opacity-0 group-hover:opacity-100 transition-opacity z-30" />
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-1 h-1 bg-cyan-400" />
                                        <span className="text-[9px] font-mono text-cyan-500/60 uppercase tracking-widest">{post.category}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors leading-tight line-clamp-2 uppercase tracking-tight">
                                        {post.title}
                                    </h3>
                                    <div className="flex items-center justify-between text-[8px] font-mono text-white/20 uppercase tracking-[0.2em] pt-4 border-t border-white/5">
                                        <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                        <span>RT: {post.readingTime}</span>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
