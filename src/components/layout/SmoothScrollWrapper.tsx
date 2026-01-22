'use client';

import React from 'react';
import { useSmoothScroll } from '@/hooks/use-smooth-scroll';

export function SmoothScrollWrapper({ children }: { children: React.ReactNode }) {
    useSmoothScroll();
    return (
        <div className="w-full relative overflow-x-hidden">
            {children}
        </div>
    );
}
