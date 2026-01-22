'use client';

import { MinimalHeader } from "@/components/minimal-header";
import { Footer } from "@/components/footer";
import { resumeData } from "@/lib/resume-data";

export default function ExperiencePage() {
  // Filter out GeeseHacks
  const experience = resumeData.experience.filter(job => job.company !== 'GeeseHacks');

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a]">
      <MinimalHeader />

      <main className="flex-grow pt-32 pb-20 px-4 md:px-8">
        <div className="max-w-xl mx-auto">
          {/* Simple heading */}
          <h1 className="text-3xl md:text-4xl font-headline font-bold mb-12 animate-slide-in-left">
            experience
          </h1>

          {/* Experience List */}
          <div className="space-y-8">
            {experience.map((job, index) => (
              <div
                key={index}
                className="group animate-fade-in-up hover-lift p-4 -ml-4 rounded-lg transition-all cursor-default"
                style={{ animationDelay: `${0.1 + index * 0.1}s` }}
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-primary group-hover:translate-x-1 transition-transform inline-block">→</span>
                    <span className="font-medium text-foreground text-lg group-hover:text-primary transition-colors">
                      {job.role}
                    </span>
                    <span className="text-muted-foreground">@</span>
                    <span className="text-primary font-medium">
                      {job.company}
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground whitespace-nowrap">
                    {job.duration}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-1 ml-6">
                  {job.location}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
