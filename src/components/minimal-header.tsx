'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { resumeData } from '@/lib/resume-data';

export function MinimalHeader() {
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        if (pathname === '/') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            window.location.href = '/';
        }
    };

    return (
        <header
            className={`fixed top-0 z-50 w-full transition-all duration-300 ${isScrolled ? 'bg-background/80 backdrop-blur-md border-b border-border/20' : ''
                }`}
        >
            <div className="max-w-4xl mx-auto px-8 md:px-16 flex h-20 items-center justify-between">
                {/* Minimal Name/Logo */}
                <Link
                    href="/"
                    onClick={handleHomeClick}
                    className="text-lg font-light italic tracking-tight text-foreground/90 hover:text-foreground transition-colors duration-300"
                >
                    {resumeData.name}
                </Link>

                {/* Ultra-minimal nav - text only */}
                <nav className="hidden md:flex items-center gap-8">
                    <Link
                        href="/about"
                        className={`text-sm transition-colors duration-300 ${pathname === '/about'
                            ? 'text-foreground'
                            : 'text-muted-foreground hover:text-foreground'
                            }`}
                    >
                        About
                    </Link>
                    <Link
                        href="/experience"
                        className={`text-sm transition-colors duration-300 ${pathname === '/experience'
                            ? 'text-foreground'
                            : 'text-muted-foreground hover:text-foreground'
                            }`}
                    >
                        Experience
                    </Link>
                    <Link
                        href="/projects"
                        className={`text-sm transition-colors duration-300 ${pathname === '/projects'
                            ? 'text-foreground'
                            : 'text-muted-foreground hover:text-foreground'
                            }`}
                    >
                        Projects
                    </Link>
                </nav>
                {/* Simple contact link */}
                <div className="flex items-center gap-6">
                    <a
                        href={resumeData.resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-primary hover:text-primary/80 transition-colors duration-300"
                    >
                        Resume
                    </a>
                    <Link
                        href={`mailto:${resumeData.contact.email}`}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                    >
                        Contact
                    </Link>
                </div>
            </div>
        </header>
    );
}