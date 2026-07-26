'use client';

import { MinimalHeader } from '@/components/minimal-header';
import { InteractiveTerminal } from '@/components/interactive-terminal';
import { resumeData } from '@/lib/resume-data';
import { TechStack } from '@/components/tech-stack';
import { Github, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

// Inline logo map — arrow comes first, then logo, then role
const companyLogos: Record<string, React.ReactNode> = {
    Shopify: (
        <Image
            src="/shopify-logo.png"
            alt="Shopify"
            width={64}
            height={24}
            className="object-contain max-h-6 w-auto invert mix-blend-screen opacity-70 group-hover:opacity-100 transition-opacity"
        />
    ),
    'Ernst & Young': (
        <Image
            src="/ernst-young-ey-logo-black-and-white.png"
            alt="Ernst & Young"
            width={80}
            height={32}
            className="object-contain max-h-7 w-auto invert mix-blend-screen opacity-70 group-hover:opacity-100 transition-opacity translate-x-1"
        />
    ),
    Wipro: (
        <Image
            src="/Gemini_Generated_Image_hxws0qhxws0qhxws.png"
            alt="Wipro"
            width={64}
            height={24}
            className="object-contain max-h-6 w-auto invert mix-blend-screen opacity-70 group-hover:opacity-100 transition-opacity"
        />
    ),
    Siemens: (
        <span className="inline-flex items-center justify-center h-7 w-9 rounded-md text-xs font-bold tracking-tight bg-teal-500/15 text-teal-400 border border-teal-500/25 leading-none flex-shrink-0">
            SI
        </span>
    ),
    'West Berkshire Council': (
        <span className="inline-flex items-center justify-center h-7 w-9 rounded-md text-xs font-bold tracking-tight bg-blue-500/15 text-blue-400 border border-blue-500/25 leading-none flex-shrink-0">
            WB
        </span>
    ),
};

export default function HomePage() {
    const cursorGlowRef = useRef<HTMLDivElement>(null);

    // Cursor glow effect
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (cursorGlowRef.current) {
                cursorGlowRef.current.style.left = `${e.clientX}px`;
                cursorGlowRef.current.style.top = `${e.clientY}px`;
            }
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Filter out GeeseHacks from experience
    const recentExperience = resumeData.experience
        .filter(job => job.company !== 'GeeseHacks')
        .slice(0, 3);

    return (
        <div className="flex flex-col min-h-screen bg-background relative overflow-hidden">
            {/* Cursor glow effect */}
            <div
                ref={cursorGlowRef}
                className="pointer-events-none fixed w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2 z-0"
                style={{
                    background: 'radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, transparent 70%)',
                }}
            />

            {/* Noise texture overlay */}
            <div
                className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
            />

            {/* Gradient orbs */}
            <div className="fixed top-20 left-20 w-72 h-72 bg-primary/5 rounded-full blur-[100px] animate-float" />
            <div className="fixed bottom-40 right-20 w-96 h-96 bg-primary/3 rounded-full blur-[120px] animate-float" style={{ animationDelay: '1s' }} />


            <MinimalHeader />

            <main className="flex-grow relative z-10">
                {/* Hero Section - Side by Side Layout */}
                <section className="min-h-screen flex items-center px-6 md:px-12 lg:px-20 pt-16">
                    <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                        {/* Left Side - Intro + Jobs */}
                        <div className="animate-slide-in-left">
                            {/* Minimal Intro with gradient text */}
                            <h1 className="text-4xl md:text-5xl font-serif mb-6">
                                hey, i'm{' '}
                                <span className="bg-gradient-to-r from-primary via-emerald-400 to-primary bg-[length:200%_auto] animate-shimmer bg-clip-text text-transparent">
                                    abeer
                                </span>
                                .
                            </h1>
                            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-10 max-w-md">
                                {resumeData.summary}
                            </p>

                            {/* Experience with badges */}
                            <div className="mb-10">
                                <p className="text-xs text-muted-foreground/60 uppercase tracking-wider mb-4">experience</p>
                                <div className="space-y-3">
                                    {recentExperience.map((job, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center group cursor-default hover-lift p-3 -ml-3 rounded-lg transition-all gap-3 min-w-0"
                                            style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                                        >
                                            {/* Arrow — leftmost */}
                                            <span className="text-primary/50 flex-shrink-0 group-hover:translate-x-1 group-hover:text-primary transition-all">→</span>

                                            {/* Company logo */}
                                            <span className="flex-shrink-0 flex items-center justify-center w-16 h-8">
                                                {companyLogos[job.company] ?? (
                                                    <span className="inline-flex items-center justify-center h-7 w-9 rounded-md text-xs font-bold bg-muted/50 text-muted-foreground border border-border flex-shrink-0">
                                                        {job.company.slice(0, 2).toUpperCase()}
                                                    </span>
                                                )}
                                            </span>

                                            {/* Role + Company — stacked on mobile, inline on sm+ */}
                                            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2 min-w-0">
                                                <span className="text-sm md:text-base text-muted-foreground group-hover:text-foreground transition-colors">
                                                    {job.role}
                                                </span>
                                                <span className="text-xs sm:text-sm text-muted-foreground/50">
                                                    @ {job.company}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Currently Working On */}
                            <div className="mb-10">
                                <p className="text-xs text-muted-foreground/60 uppercase tracking-wider mb-4">currently working on</p>
                                <div className="space-y-3">
                                    <div
                                        className="flex items-center group cursor-default hover-lift p-3 -ml-3 rounded-lg transition-all gap-3 min-w-0"
                                        style={{ animationDelay: `0.6s` }}
                                    >
                                        <span className="text-primary/50 flex-shrink-0 group-hover:translate-x-1 group-hover:text-primary transition-all">→</span>

                                        <span className="flex-shrink-0 flex items-center justify-center w-16 h-8">
                                            <Image
                                                src="/buildbane-logo.svg"
                                                alt="BuildBane"
                                                width={64}
                                                height={24}
                                                className="object-contain max-h-6 w-auto brightness-0 invert opacity-70 group-hover:opacity-100 transition-opacity"
                                            />
                                        </span>

                                        <div className="flex flex-col min-w-0">
                                            <Link href="https://buildbane.com" target="_blank" className="text-sm md:text-base text-muted-foreground group-hover:text-foreground transition-colors hover:underline">
                                                BuildBane
                                            </Link>
                                            <span className="text-xs sm:text-sm text-muted-foreground/50 truncate">
                                                The network for building startups together
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Social Links with hover effects */}
                            <div className="flex gap-5">
                                <Link
                                    href={resumeData.contact.github}
                                    target="_blank"
                                    className="text-muted-foreground hover:text-primary hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(16,185,129,0.5)] transition-all duration-300"
                                    aria-label="GitHub"
                                >
                                    <Github className="w-5 h-5" />
                                </Link>
                                <Link
                                    href={resumeData.contact.linkedin}
                                    target="_blank"
                                    className="text-muted-foreground hover:text-primary hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(16,185,129,0.5)] transition-all duration-300"
                                    aria-label="LinkedIn"
                                >
                                    <Linkedin className="w-5 h-5" />
                                </Link>
                                <Link
                                    href={`mailto:${resumeData.contact.email}`}
                                    className="text-muted-foreground hover:text-primary hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(16,185,129,0.5)] transition-all duration-300"
                                    aria-label="Email"
                                >
                                    <Mail className="w-5 h-5" />
                                </Link>
                            </div>

                            {/* Tech Stack Marquee */}
                            <div className="mt-12 w-full max-w-lg">
                                <p className="text-xs text-muted-foreground/60 uppercase tracking-wider mb-4">technical arsenal</p>
                                <TechStack />
                            </div>
                        </div>

                        {/* Right Side - Terminal */}
                        <div className="animate-slide-in-right lg:pl-8">
                            <InteractiveTerminal />
                        </div>
                    </div>

                </section>

            </main>

            {/* Minimal Footer */}
            <footer className="py-6 px-6 border-t border-[#111] relative z-10">
                <div className="max-w-6xl mx-auto text-center text-xs text-muted-foreground">
                    <p>© {new Date().getFullYear()} {resumeData.name}</p>
                </div>
            </footer>
        </div >
    );
}
