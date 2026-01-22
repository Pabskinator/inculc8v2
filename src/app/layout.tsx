import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/utils/cn";
import { SceneProvider } from "@/context/scene-context";
import { SmoothScrollWrapper } from "@/components/layout/SmoothScrollWrapper";
import Experience from "@/components/canvas/Experience";
import { AutomationCore } from "@/components/canvas/AutomationCore";
import { CustomCursor } from "@/components/ui/CustomCursor";
import ScrollToTopSpaceship from "@/components/ui/ScrollToTopSpaceship";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata: Metadata = {
    metadataBase: new URL('https://inculc8.solutions'),
    title: {
        default: "Inculc8 Solutions | Premium Automation Studio",
        template: "%s | Inculc8 Solutions"
    },
    description: "World class websites and autonomous automation systems for ambitious businesses. High-fidelity engineering for the digital frontier.",
    keywords: ["Automation", "Web Design", "Next.js", "Tactical UI", "AI Systems", "Digital Experience"],
    authors: [{ name: "Inculc8 Team" }],
    creator: "Inculc8 Solutions",
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://inculc8.solutions",
        title: "Inculc8 Solutions | Premium Automation Studio",
        description: "World class websites and autonomous automation systems for ambitious businesses.",
        siteName: "Inculc8 Solutions",
    },
    twitter: {
        card: "summary_large_image",
        title: "Inculc8 Solutions | Premium Automation Studio",
        description: "World class websites and autonomous automation systems for ambitious businesses.",
        creator: "@inculc8",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={cn(outfit.variable, mono.variable, "antialiased bg-background text-foreground font-sans")}>
                <SceneProvider>
                    <SmoothScrollWrapper>
                        {/* 3D Background Layer */}
                        <Experience>
                            <AutomationCore />
                        </Experience>

                        {/* Custom UI Elements */}
                        <CustomCursor />
                        <ScrollToTopSpaceship />

                        {/* Main Content Layer */}
                        <Header />
                        <main className="relative z-10">
                            {children}
                        </main>
                        <Footer />
                    </SmoothScrollWrapper>
                </SceneProvider>
            </body>
        </html>
    );
}
