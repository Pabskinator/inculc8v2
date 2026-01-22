'use client';

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Preload } from '@react-three/drei';

type ExperienceProps = {
    children?: React.ReactNode;
};

export default function Experience({ children }: ExperienceProps) {
    return (
        <div className="fixed inset-0 z-0">
            <Canvas
                shadows
                dpr={[1, 1.5]} // Clamp DPR for performance
                gl={{ antialias: false, stencil: false, depth: true }}
                camera={{ position: [0, 0, 5], fov: 35 }}
            >
                {/* Global Lighting */}
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} castShadow />

                {/* Global Environment */}
                <Environment preset="city" />

                {/* 3D Content */}
                {children}

                <Preload all />
            </Canvas>
        </div>
    );
}
