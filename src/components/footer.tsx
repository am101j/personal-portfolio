import { resumeData } from '@/lib/resume-data';
import Link from 'next/link';
import { Github, Linkedin, Mail } from 'lucide-react';

export function Footer() {
    return (
        <footer className="py-8 px-4 border-t border-border/50">
            <div className="max-w-4xl mx-auto">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} {resumeData.name}. Built with Next.js
                    </p>

                    <div className="flex items-center gap-4">
                        <Link
                            href={resumeData.contact.github}
                            target="_blank"
                            className="text-muted-foreground hover:text-primary transition-colors"
                            aria-label="GitHub"
                        >
                            <Github className="w-4 h-4" />
                        </Link>
                        <Link
                            href={resumeData.contact.linkedin}
                            target="_blank"
                            className="text-muted-foreground hover:text-primary transition-colors"
                            aria-label="LinkedIn"
                        >
                            <Linkedin className="w-4 h-4" />
                        </Link>
                        <Link
                            href={`mailto:${resumeData.contact.email}`}
                            className="text-muted-foreground hover:text-primary transition-colors"
                            aria-label="Email"
                        >
                            <Mail className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
