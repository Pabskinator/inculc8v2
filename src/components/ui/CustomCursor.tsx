'use client';

import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export function CustomCursor() {
    const [isHovering, setIsHovering] = useState(false);
    const [coords, setCoords] = useState({ x: 0, y: 0 });

    // Smooth motion values
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Spring physics for smooth following
    const springConfig = { damping: 30, stiffness: 200 };
    const springX = useSpring(cursorX, springConfig);
    const springY = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
            setCoords({ x: e.clientX, y: e.clientY });

            // Detect if hovering over clickable elements
            const target = e.target as HTMLElement;
            const isClickable =
                target.tagName === 'BUTTON' ||
                target.tagName === 'A' ||
                target.closest('button') ||
                target.closest('a') ||
                window.getComputedStyle(target).cursor === 'pointer';

            setIsHovering(!!isClickable);
        };

        window.addEventListener('mousemove', moveCursor);
        return () => window.removeEventListener('mousemove', moveCursor);
    }, [cursorX, cursorY]);

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999] hidden md:block">
            {/* Inner Core: Precision Dot */}
            <motion.div
                className="fixed top-0 left-0 w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_10px_#3b82f6]"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
            />

            {/* Main Reticle: Corner Brackets & Ring */}
            <motion.div
                className="fixed top-0 left-0 flex items-center justify-center border-blue-500"
                style={{
                    x: springX,
                    y: springY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                animate={{
                    width: isHovering ? 64 : 40,
                    height: isHovering ? 64 : 40,
                    opacity: isHovering ? 1 : 0.6,
                    rotate: isHovering ? 90 : 0
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
                {/* Circular Buffer */}
                <div className="absolute inset-0 border border-blue-500/20 rounded-full" />

                {/* Corner Markers (L-Shapes) */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-blue-500 shadow-[0_0_5px_#3b82f6]" />
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-blue-500 shadow-[0_0_5px_#3b82f6]" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-blue-500 shadow-[0_0_5px_#3b82f6]" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-blue-500 shadow-[0_0_5px_#3b82f6]" />

                {/* Tracking Text: Telemetry */}
                <motion.div
                    className="absolute -right-20 top-0 font-mono text-[8px] text-blue-500 whitespace-nowrap opacity-40 text-left"
                    animate={{ opacity: isHovering ? 0.8 : 0.4 }}
                >
                    X:{coords.x}<br />
                    Y:{coords.y}
                </motion.div>

                <div className="absolute -left-16 bottom-0 font-mono text-[8px] text-blue-500 opacity-40 uppercase tracking-widest leading-none">
                    {isHovering ? "LOCK_ON" : "SCAN"}
                </div>
            </motion.div>

            {/* Pulse Wave (Tactical Pings) */}
            <motion.div
                className="fixed top-0 left-0 w-32 h-32 border border-blue-500/10 rounded-full"
                style={{
                    x: springX,
                    y: springY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.1, 0, 0.1],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
        </div>
    );
}
