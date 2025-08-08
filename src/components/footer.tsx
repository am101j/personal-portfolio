
'use client';

import Link from "next/link";
import { Github, Linkedin, User } from "lucide-react";
import { resumeData } from "@/lib/resume-data";
import { useState, useEffect } from "react";

export function Footer() {
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-secondary text-secondary-foreground mt-16 border-t">
      <div className="container mx-auto py-8 px-4 md:px-6 flex flex-col sm:flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <User className="h-5 w-5" />
          <p className="text-sm">
            &copy; {year} {resumeData.name}. All rights reserved.
          </p>
        </div>
        <div className="flex items-center gap-4 mt-4 sm:mt-0">
          <Link href={resumeData.contact.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
            <Github size={20} />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link href={resumeData.contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
            <Linkedin size={20} />
            <span className="sr-only">LinkedIn</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
