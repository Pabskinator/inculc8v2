'use client';

import { ChapterLayout } from '@/components/layout/ChapterLayout';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { cn } from '@/utils/cn';
import { GlareCard } from '@/components/ui/glare-card';

const WORK = [
    {
        client: "Nebula",
        cat: "FinTech",
        year: "2024",
        img: "/images/projects/nebula.png"
    },
    {
        client: "Arkitekt",
        cat: "Real Estate",
        year: "2023",
        img: "/images/projects/arkitekt.png"
    },
    {
        client: "Velox",
        cat: "Automotive",
        year: "2024",
        img: "/images/projects/velox.png"
    }
];

export function FeaturedWork() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
        layoutEffect: false
    });

    return (
        <ChapterLayout className="bg-transparent overflow-visible 2xl:overflow-hidden" id="projects">
            <div className="relative z-10 w-full h-auto 2xl:h-full flex flex-col justify-start 2xl:justify-center pt-32 2xl:pt-0" ref={containerRef}>
                <div className="px-8 md:px-20 mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-4 text-blue-500 font-mono text-[10px] tracking-[0.5em] uppercase"
                    >
                        <span className="w-12 h-px bg-blue-500/30" />
                        Engagement_History
                    </motion.div>
                    <h2 className="text-5xl md:text-7xl font-black text-white mt-4 tracking-tighter uppercase">
                        MISSION_LOGS
                    </h2>
                </div>

                <div className="flex flex-col 2xl:flex-row gap-16 2xl:gap-12 px-6 md:px-20 w-full max-w-[100vw] overflow-hidden 2xl:overflow-visible pb-24 pt-10 2xl:pb-32">
                    {WORK.map((item, i) => (
                        <ProjectCard key={i} item={item} index={i} scrollYProgress={scrollYProgress} />
                    ))}
                </div>
            </div>
        </ChapterLayout>
    );
}

// Check for mobile/tablet via window matchMedia to disable parallax
function useIsTabletOrMobile() {
    const [isSmall, setIsSmall] = useState(false);
    useEffect(() => {
        const check = () => setIsSmall(window.innerWidth < 1536); // Match 2xl breakpoint
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);
    return isSmall;
}

function ProjectCard({ item, index, scrollYProgress }: any) {
    const isSmall = useIsTabletOrMobile();
    const y = useTransform(scrollYProgress, [0, 1], [0, (index + 1) * -40]);

    return (
        <motion.div
            className="flex-none w-full h-auto 2xl:flex-1 2xl:w-auto 2xl:first:ml-0 2xl:h-[70vh] 2xl:min-w-[450px] group"
            style={{ y: isSmall ? 0 : y }}
        >
            <GlareCard className="relative overflow-hidden bg-[#0a0a0c] flex items-center justify-center border-white/5 w-full aspect-square 2xl:aspect-auto 2xl:h-full">
                {/* Background Image: Tactical Recon */}
                <motion.div
                    className="absolute inset-0 grayscale group-hover:grayscale-0 transition-all duration-700 bg-cover bg-center opacity-80 group-hover:opacity-100"
                    style={{ backgroundImage: `url(${item.img})` }}
                    whileHover={{ scale: 1.05 }}
                />

                {/* CRT / Scanline Overlay */}
                <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />

                {/* Hover Content: Transmission Protocol */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 bg-blue-950/20 backdrop-blur-sm">
                    <button className="bg-white text-black px-10 py-4 rounded-sm font-mono font-bold uppercase tracking-[0.4em] text-[10px] hover:bg-blue-500 hover:text-white transition-all shadow-2xl relative overflow-hidden group/btn">
                        <span className="relative z-10">DECRYPT_INTEL</span>
                        <div className="absolute inset-x-0 bottom-0 h-1 bg-black/20" />
                    </button>
                </div>

                {/* Corner Markers */}
                <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-white/20" />
                <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-white/20" />
                <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-white/20" />
                <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-white/20" />
            </GlareCard>

            {/* Metadata: Tactical Callout */}
            <div className="relative mt-6 2xl:absolute 2xl:-bottom-16 2xl:mt-0 left-0 pointer-events-none w-full">
                <div className="flex items-end justify-between">
                    <div>
                        <motion.h3
                            className="text-4xl font-black text-white tracking-tighter uppercase"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            {item.client}
                        </motion.h3>
                        <motion.p
                            className="text-[9px] font-mono font-bold uppercase tracking-[0.4em] text-blue-500/80 mt-2 flex items-center gap-3"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                        >
                            <span className="w-6 h-px bg-blue-500/30" />
                            DEPLOYED // {item.cat} // {item.year}
                        </motion.p>
                    </div>
                    <div className="text-[8px] font-mono text-gray-600 tracking-widest pb-1">
                        MSN_ID: {item.client.toUpperCase()}_0{index + 1}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
