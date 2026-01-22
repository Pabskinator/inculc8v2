'use client';

import React from 'react';
import { useSmoothScroll } from '@/hooks/use-smooth-scroll';

export function SmoothScrollWrapper({ children }: { children: React.ReactNode }) {
    useSmoothScroll();
    return <>{children}</>;
}
