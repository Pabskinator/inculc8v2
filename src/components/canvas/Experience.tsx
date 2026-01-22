'use client';

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Preload, AdaptiveDpr, AdaptiveEvents } from '@react-three/drei';

type ExperienceProps = {
    children?: React.ReactNode;
};

export default function Experience({ children }: ExperienceProps) {
    return (
        <div className="fixed inset-0 z-0">
            <Canvas
                shadows={false}
                dpr={[1, 1.25]} // Strict DPR clamp for mobile/performance
                gl={{
                    antialias: false,
                    alpha: true,
                    stencil: false,
                    depth: true,
                    powerPreference: "high-performance"
                }}
                camera={{ position: [0, 0, 5], fov: 35 }}
            >
                <AdaptiveDpr pixelated />
                {/* AdaptiveEvents removed to allow manual pointer tracking */}

                {/* Global Lighting - No Shadows */}
                <ambientLight intensity={0.6} />
                <directionalLight position={[10, 10, 5]} intensity={0.8} />

                {/* Optimized Environment */}
                <Environment preset="city" resolution={64} />

                {/* 3D Content */}
                {children}

                {/* Removed Preload to prevent initial load hitch */}
            </Canvas>
        </div>
    );
}
