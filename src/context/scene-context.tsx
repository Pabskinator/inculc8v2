'use client';

import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { useScroll, useMotionValueEvent } from 'framer-motion';

type SceneContextType = {
    currentChapter: number;
    setCurrentChapter: (chapter: number) => void;
    scrollProgress: number; // 0 to 1 overall progress
};

const SceneContext = createContext<SceneContextType | undefined>(undefined);

export function SceneProvider({ children }: { children: React.ReactNode }) {
    const [currentChapter, setCurrentChapter] = useState(0);
    const [scrollProgress, setScrollProgress] = useState(0);
    const { scrollYProgress } = useScroll();

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        setScrollProgress(latest);
    });

    return (
        <SceneContext.Provider value={{ currentChapter, setCurrentChapter, scrollProgress }}>
            {children}
        </SceneContext.Provider>
    );
}

export function useScene() {
    const context = useContext(SceneContext);
    if (context === undefined) {
        throw new Error('useScene must be used within a SceneProvider');
    }
    return context;
}
