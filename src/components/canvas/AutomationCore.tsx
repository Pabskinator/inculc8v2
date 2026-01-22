'use client';

import React, { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial, Instance, Instances } from '@react-three/drei';
import * as THREE from 'three';
import { usePathname } from 'next/navigation';
import { useScene } from '@/context/scene-context';

// Optimized AutomationCore with reliable mouse follow and throttled updates
export function AutomationCore() {
    const meshRef = useRef<THREE.Group>(null);
    const coreRef = useRef<THREE.Mesh>(null);
    const materialRef = useRef<any>(null);
    const particleRefs = useRef<THREE.Group[]>([]);
    const [isHovered, setIsHovered] = useState(false);

    const pathname = usePathname();
    const { scrollProgress } = useScene();

    const isBlogPage = pathname?.startsWith('/blog');
    const isVisible = !isBlogPage;

    // Pointer tracking that always works, regardless of R3F event system
    const pointerRef = useRef({ x: 0, y: 0 });
    useEffect(() => {
        let rafId = 0;
        let latestX = 0;
        let latestY = 0;

        const onMove = (e: PointerEvent) => {
            latestX = e.clientX;
            latestY = e.clientY;

            if (rafId) return;
            rafId = window.requestAnimationFrame(() => {
                rafId = 0;
                pointerRef.current.x = (latestX / window.innerWidth) * 2 - 1;
                pointerRef.current.y = -(latestY / window.innerHeight) * 2 + 1;
            });
        };

        window.addEventListener('pointermove', onMove, { passive: true });
        return () => {
            if (rafId) window.cancelAnimationFrame(rafId);
            window.removeEventListener('pointermove', onMove);
        };
    }, []);

    // Reduced particles (60) is good
    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < 60; i++) {
            temp.push({
                factor: 20 + Math.random() * 100,
                speed: 0.01 + Math.random() / 200,
                xFactor: -50 + Math.random() * 100,
                yFactor: -50 + Math.random() * 100,
                zFactor: -50 + Math.random() * 100,
                initialScale: Math.random() * 0.5 + 0.5,
            });
        }
        return temp;
    }, []);

    // Throttle timers
    const particleAccum = useRef(0);
    const materialAccum = useRef(0);

    useFrame((state, delta) => {
        // Visibility toggle without unmounting
        if (meshRef.current) meshRef.current.visible = isVisible;
        if (!isVisible) return;

        const elapsed = state.clock.elapsedTime;
        const pointer = pointerRef.current;

        // 1) Core follow and scale: keep at full FPS for responsiveness
        const core = coreRef.current;
        if (core) {
            const isHero = scrollProgress < 0.2;
            const isServices = scrollProgress >= 0.2 && scrollProgress < 0.4;
            const isProcess = scrollProgress >= 0.4 && scrollProgress < 0.6;
            const isDemo = scrollProgress >= 0.6 && scrollProgress < 0.8;

            const pulse = isDemo ? Math.sin(elapsed * 8) * 0.2 + 1.2 : (isHovered ? 1.15 : 1.0);
            const targetScale = isHero ? 1.5 : (isServices ? 0.8 : (isProcess ? 0.5 : pulse));

            // Use damp for consistent smoothing across FPS
            const nextScale = THREE.MathUtils.damp(core.scale.x, targetScale, 8, delta);
            core.scale.setScalar(nextScale);

            // Locked rotation
            core.rotation.set(0, 0, 0);

            // Follow pointer
            const targetX = pointer.x * 0.6;
            const targetY = pointer.y * 0.6;
            core.position.x = THREE.MathUtils.damp(core.position.x, targetX, 14, delta);
            core.position.y = THREE.MathUtils.damp(core.position.y, targetY, 14, delta);
        }

        // 2) Material uniforms: throttle to 20fps (expensive)
        const mat = materialRef.current;
        if (mat) {
            materialAccum.current += delta;
            if (materialAccum.current >= 1 / 20) {
                materialAccum.current = 0;

                const mouseSpeed = Math.abs(pointer.x) + Math.abs(pointer.y);
                const intensity = Math.min(1, Math.sqrt(pointer.x * pointer.x + pointer.y * pointer.y));

                mat.thickness = THREE.MathUtils.damp(mat.thickness, 0.6 + intensity * 0.2, 6, delta);
                mat.distortionScale = THREE.MathUtils.damp(mat.distortionScale, 0.45 + intensity * 0.2, 6, delta);
                mat.temporalDistortion = THREE.MathUtils.damp(mat.temporalDistortion, 0.15 + mouseSpeed * 0.2, 6, delta);
            }
        }

        // 3) Particles: throttle to 30fps (saves CPU and instance updates)
        particleAccum.current += delta;
        if (particleAccum.current < 1 / 30) return;
        particleAccum.current = 0;

        for (let i = 0; i < particles.length; i++) {
            const ref = particleRefs.current[i];
            if (!ref) continue;

            const p = particles[i];
            const t = p.factor + elapsed * (0.5 + p.speed * 5);

            ref.position
                .set(
                    p.xFactor + Math.cos(t) * 1.5 + Math.sin(t * 0.5),
                    p.yFactor + Math.sin(t) * 1.5 + Math.cos(t * 0.5),
                    p.zFactor + Math.cos(t * 0.3)
                )
                .normalize()
                .multiplyScalar(3.2);

            ref.rotation.x = p.factor + elapsed * 0.1;
            ref.rotation.y = p.factor + elapsed * 0.2;
        }
    });

    return (
        <group ref={meshRef}>
            {/* Main Neural Core (Optimized Premium Glass) */}
            <mesh
                ref={coreRef}
                onPointerEnter={() => setIsHovered(true)}
                onPointerLeave={() => setIsHovered(false)}
            >
                <icosahedronGeometry args={[1, 6]} /> {/* Reduced poly count (15 -> 6) */}
                <MeshTransmissionMaterial
                    ref={materialRef}
                    samples={2} // Extremely minimal samples for speed (4 -> 2)
                    resolution={128} // Low resolution buffer (256 -> 128)
                    thickness={0.7}
                    roughness={0.3} // Increased roughness hides low sample count
                    anisotropy={0.5}
                    chromaticAberration={0.04}
                    color="#0ea5e9"
                    distortion={0.6}
                    distortionScale={0.5}
                    temporalDistortion={0.2}
                    side={THREE.FrontSide} // FrontSide only for performance
                />
            </mesh>

            {/* Particle Cloud (Neural Network) */}
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

                {particles.map((p, i) => (
                    <group
                        key={i}
                        ref={(el) => { if (el) particleRefs.current[i] = el; }}
                        scale={p.initialScale} // Set scale once
                    >
                        <Instance />
                    </group>
                ))}
            </Instances>
        </group>
    );
}
