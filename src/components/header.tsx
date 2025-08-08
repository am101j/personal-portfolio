
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FileDown, Github, Linkedin, Menu, Rss, Briefcase, Code, Bot, User } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { usePathname } from 'next/navigation';
import { resumeData } from '@/lib/resume-data';

const navLinks = [
  { href: '/about', label: 'About' },
  { href: '/experience', label: 'Experience' },
  { href: '/projects', label: 'Projects' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
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
    setMobileMenuOpen(false);
  };

  const getIconForLink = (label: string) => {
    switch (label) {
        case 'About': return <User />;
        case 'Experience': return <Briefcase />;
        case 'Projects': return <Code />;
        default: return null;
    }
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? 'border-b bg-background/80 backdrop-blur-sm' : ''
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" onClick={handleHomeClick} className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-neon-gradient flex items-center justify-center text-primary-foreground font-bold text-lg">
                A
            </div>
          <span className="font-headline text-lg font-bold">{resumeData.name}</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(link => (
            <Button key={link.href} asChild variant={pathname.startsWith(link.href) ? "secondary" : "ghost"} size="sm">
              <Link href={link.href} target={link.href.startsWith('http') ? '_blank' : undefined}>{link.label}</Link>
            </Button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2">
            <Button asChild variant="outline" size="sm">
              <a href="/AbeerMakin_Resume.pdf" download>
                Resume <FileDown />
              </a>
            </Button>
            <Button asChild variant="ghost" size="icon">
              <Link href={resumeData.contact.github} target="_blank"><Github /></Link>
            </Button>
            <Button asChild variant="ghost" size="icon">
              <Link href={resumeData.contact.linkedin} target="_blank"><Linkedin /></Link>
            </Button>
          </div>
          
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[240px]">
              <div className="flex flex-col gap-4 py-6">
                 <Link href="/" onClick={handleHomeClick} className="flex items-center gap-3 px-4 py-2">
                    <div className="w-8 h-8 rounded-full bg-neon-gradient flex items-center justify-center text-primary-foreground font-bold text-base">
                        A
                    </div>
                  <span className="font-headline text-lg font-bold">{resumeData.name}</span>
                </Link>
                <div className="flex flex-col gap-1 mt-4">
                  {navLinks.map(link => (
                    <Link 
                      key={link.href} 
                      href={link.href} 
                      onClick={() => setMobileMenuOpen(false)}
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      className={`flex items-center gap-3 px-4 py-2 transition-colors text-sm ${pathname.startsWith(link.href) ? "text-foreground bg-accent" : "text-muted-foreground hover:text-foreground"}`}
                    >
                      {getIconForLink(link.label)}
                      {link.label}
                    </Link>
                  ))}
                </div>
                 <div className="flex flex-col gap-2 mt-4 px-4">
                    <Button asChild variant="outline" size="sm" className="w-full">
                      <a href="/AbeerMakin_Resume.pdf" download>
                        Resume <FileDown />
                      </a>
                    </Button>
                    <div className="flex justify-around">
                       <Button asChild variant="ghost" size="icon">
                          <Link href={resumeData.contact.github} target="_blank"><Github /></Link>
                        </Button>
                        <Button asChild variant="ghost" size="icon">
                          <Link href={resumeData.contact.linkedin} target="_blank"><Linkedin /></Link>
                        </Button>
                    </div>
                 </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
