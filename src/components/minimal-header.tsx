'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { resumeData } from '@/lib/resume-data';
import { Menu, X } from 'lucide-react';

export function MinimalHeader() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [pathname]);

    const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        setMobileMenuOpen(false);
        if (pathname === '/') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            window.location.href = '/';
        }
    };

    const navLinks = [
        { href: '/about', label: 'About' },
        { href: '/experience', label: 'Experience' },
        { href: '/projects', label: 'Projects' },
    ];

    return (
        <header
            className={`fixed top-0 z-50 w-full transition-all duration-300 ${isScrolled || mobileMenuOpen ? 'bg-background/90 backdrop-blur-md border-b border-border/20' : ''}`}
        >
            <div className="max-w-4xl mx-auto px-6 md:px-16 flex h-20 items-center justify-between">
                {/* Minimal Name/Logo */}
                <Link
                    href="/"
                    onClick={handleHomeClick}
                    className="text-lg font-light italic tracking-tight text-foreground/90 hover:text-foreground transition-colors duration-300"
                >
                    {resumeData.name}
                </Link>

                {/* Desktop nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map(({ href, label }) => (
                        <Link
                            key={href}
                            href={href}
                            className={`text-sm transition-colors duration-300 ${pathname === href ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                        >
                            {label}
                        </Link>
                    ))}
                </nav>

                {/* Desktop right links */}
                <div className="hidden md:flex items-center gap-6">
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

                {/* Mobile hamburger */}
                <button
                    className="md:hidden text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setMobileMenuOpen(prev => !prev)}
                    aria-label="Toggle menu"
                >
                    {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
            </div>

            {/* Mobile dropdown */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-background/95 backdrop-blur-md border-b border-border/20 px-6 pb-6">
                    <nav className="flex flex-col gap-4 pt-2">
                        {navLinks.map(({ href, label }) => (
                            <Link
                                key={href}
                                href={href}
                                className={`text-sm transition-colors duration-300 ${pathname === href ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {label}
                            </Link>
                        ))}
                        <div className="flex items-center gap-6 pt-2 border-t border-border/20">
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
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Contact
                            </Link>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
}