'use client';

import { MinimalHeader } from "@/components/minimal-header";
import { Footer } from "@/components/footer";
import { resumeData } from "@/lib/resume-data";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a]">
      <MinimalHeader />

      <main className="flex-grow pt-32 pb-20 px-4 md:px-8">
        <div className="max-w-xl mx-auto">
          {/* Simple heading */}
          <h1 className="text-3xl md:text-4xl font-headline font-bold mb-12 animate-slide-in-left">
            about
          </h1>

          {/* Bio */}
          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <p className="animate-fade-in-up delay-100 text-lg">
              Hi, I'm <span className="text-primary animate-shimmer">{resumeData.name}</span>.
            </p>
            <p className="animate-fade-in-up delay-200">
              {resumeData.summary}
            </p>
            <p className="animate-fade-in-up delay-300">
              I approach development as both an art and a science—a discipline
              that requires rigorous logic and a creative spark. I love diving
              deep into code, but I'm equally passionate about understanding
              the "why" behind the "what."
            </p>
            <p className="animate-fade-in-up delay-400">
              Currently studying Computer Science at the University of Waterloo.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
