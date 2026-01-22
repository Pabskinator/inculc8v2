'use client';

import React, { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial, Instance, Instances } from '@react-three/drei';
import * as THREE from 'three';
import { useScene } from '@/context/scene-context';

export function AutomationCore() {
    const meshRef = useRef<THREE.Group>(null);
    const coreRef = useRef<THREE.Mesh>(null);
    const materialRef = useRef<any>(null);
    const mouseRef = useRef({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const { scrollProgress } = useScene();

    // Global Mouse Listener to bypass UI blockage
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Convert to normalized R3F coordinates (-1 to 1)
            mouseRef.current = {
                x: (e.clientX / window.innerWidth) * 2 - 1,
                y: -(e.clientY / window.innerHeight) * 2 + 1
            };
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Create random data points for the "Neural Cloud"
    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < 150; i++) {
            const t = Math.random() * 100;
            const factor = 20 + Math.random() * 100;
            const speed = 0.01 + Math.random() / 200;
            const xFactor = -50 + Math.random() * 100;
            const yFactor = -50 + Math.random() * 100;
            const zFactor = -50 + Math.random() * 100;
            temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
        }
        return temp;
    }, []);

    useFrame((state, delta) => {
        if (coreRef.current) {
            const isHero = scrollProgress < 0.2;
            const isServices = scrollProgress >= 0.2 && scrollProgress < 0.4;
            const isProcess = scrollProgress >= 0.4 && scrollProgress < 0.6;
            const isDemo = scrollProgress >= 0.6 && scrollProgress < 0.8;

            // --- Scale & Pulse ---
            const pulse = isDemo ? Math.sin(state.clock.elapsedTime * 8) * 0.2 + 1.2 : (isHovered ? 1.15 : 1.0);
            const targetScale = isHero ? 1.5 : (isServices ? 0.8 : (isProcess ? 0.5 : pulse));

            coreRef.current.scale.setScalar(THREE.MathUtils.lerp(coreRef.current.scale.x, targetScale, delta * 4));

            // Prison is LOCKED - explicitly set rotation to zero
            coreRef.current.rotation.x = 0;
            coreRef.current.rotation.y = 0;
            coreRef.current.rotation.z = 0;

            // --- Magnetic Parallax Protocol (Nudge) ---
            // The entire mesh physically shifts to follow the cursor
            const targetPosX = mouseRef.current.x * 0.4;
            const targetPosY = mouseRef.current.y * 0.4;
            coreRef.current.position.x = THREE.MathUtils.lerp(coreRef.current.position.x, targetPosX, delta * 3);
            coreRef.current.position.y = THREE.MathUtils.lerp(coreRef.current.position.y, targetPosY, delta * 3);

            // --- Blue Fire Distortion Protocol ---
            if (materialRef.current) {
                const mouseSpeed = Math.abs(mouseRef.current.x) + Math.abs(mouseRef.current.y);
                const intensity = Math.sqrt(mouseRef.current.x ** 2 + mouseRef.current.y ** 2);

                // Calibrated ranges for "Stable" behavior
                // thickness: 0.8 base (standard glass) -> 1.0 (slight focus)
                materialRef.current.thickness = THREE.MathUtils.lerp(materialRef.current.thickness, 0.8 + intensity * 0.2, delta * 1);

                // distortion: 0.6 base -> 0.8 (gentler shift)
                materialRef.current.distortionScale = THREE.MathUtils.lerp(materialRef.current.distortionScale, 0.6 + intensity * 0.2, delta * 1);

                // speed: 0.3 base -> 0.5 (much slower internal animation)
                materialRef.current.temporalDistortion = THREE.MathUtils.lerp(materialRef.current.temporalDistortion, 0.3 + mouseSpeed * 0.2, delta * 1);

                // aberration: subtle color split
                materialRef.current.chromaticAberration = THREE.MathUtils.lerp(materialRef.current.chromaticAberration, 0.04 + intensity * 0.02, delta * 1);
            }
        }
    });

    return (
        <group ref={meshRef}>
            {/* Main Neural Core (Premium Glass) */}
            <mesh
                ref={coreRef}
                onPointerEnter={() => setIsHovered(true)}
                onPointerLeave={() => setIsHovered(false)}
            >
                <icosahedronGeometry args={[1, 15]} /> {/* High poly for smooth glass */}
                <MeshTransmissionMaterial
                    ref={materialRef}
                    backside
                    samples={8}
                    resolution={512}
                    thickness={0.8}
                    roughness={0.2}
                    anisotropy={1}
                    chromaticAberration={0.06}
                    color="#0ea5e9"
                    distortion={0.8}
                    distortionScale={0.6}
                    temporalDistortion={0.4}
                    side={THREE.DoubleSide}
                />
            </mesh>

            {/* Particle Cloud (Neural Network) - COMPLETELY STATIC */}
            <Instances range={200}>
                <dodecahedronGeometry args={[0.02, 0]} />
                <meshStandardMaterial
                    emissive="#a0a0a0"
                    emissiveIntensity={0.8}
                    toneMapped={false}
                    color="#ffffff"
                    roughness={0.2}
                    metalness={0.8}
                />

                {particles.map((data, i) => (
                    <Particle key={i} {...data} />
                ))}
            </Instances>
        </group>
    );
}

// Particle Component for Instanced Cloud
function Particle({ factor, xFactor, yFactor, zFactor, speed }: any) {
    const ref = useRef<THREE.Group>(null);
    const initialScale = useMemo(() => Math.random() * 0.5 + 0.5, []);

    useFrame((state) => {
        if (!ref.current) return;

        // Faster, smooth orbit using stable clock time
        const t = factor + state.clock.elapsedTime * (0.5 + speed * 5);

        ref.current.position.set(
            xFactor + Math.cos(t) * 1.5 + Math.sin(t * 0.5),
            yFactor + Math.sin(t) * 1.5 + Math.cos(t * 0.5),
            zFactor + Math.cos(t * 0.3)
        ).normalize().multiplyScalar(3.2);

        // STABLE SCALE
        ref.current.scale.setScalar(initialScale);

        // Continuous smooth rotation
        ref.current.rotation.x = factor + state.clock.elapsedTime * 0.1;
        ref.current.rotation.y = factor + state.clock.elapsedTime * 0.2;
    });

    return <group ref={ref}><Instance /></group>;
}
