import React from 'react';
import { cn } from '@/utils/cn';

interface ChapterLayoutProps extends React.HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
    className?: string;
    id?: string;
}

export const ChapterLayout = React.forwardRef<HTMLElement, ChapterLayoutProps>(
    ({ children, className, id, ...props }, ref) => {
        return (
            <section
                ref={ref}
                id={id}
                className={cn(
                    "relative w-full min-h-screen flex flex-col justify-center overflow-visible",
                    "snap-start snap-always",
                    className
                )}
                {...props}
            >
                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    {children}
                </div>
            </section>
        );
    }
);

ChapterLayout.displayName = "ChapterLayout";
