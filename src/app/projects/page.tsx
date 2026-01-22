'use client';

import { MinimalHeader } from "@/components/minimal-header";
import { Footer } from "@/components/footer";
import { resumeData } from "@/lib/resume-data";
import { ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function ProjectsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a]">
      <MinimalHeader />

      <main className="flex-grow pt-32 pb-20 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Simple heading */}
          <h1 className="text-3xl md:text-4xl font-headline font-bold mb-12 animate-slide-in-left">
            projects
          </h1>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumeData.projects.map((project, index) => (
              <div
                key={index}
                className="group bg-[#111] rounded-lg border border-[#222] overflow-hidden hover:border-primary/30 transition-all duration-300 hover-lift animate-fade-in-up"
                style={{ animationDelay: `${0.1 + index * 0.1}s` }}
              >
                {/* Project Image */}
                {project.image && (
                  <div className="relative aspect-video bg-[#0a0a0a] overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111] to-transparent opacity-60" />
                  </div>
                )}

                {/* Project Info */}
                <div className="p-4">
                  {/* Header with links */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      {project.github && project.github !== '#' && (
                        <Link
                          href={project.github}
                          target="_blank"
                          className="text-muted-foreground hover:text-primary hover:scale-110 transition-all"
                        >
                          <Github className="w-4 h-4" />
                        </Link>
                      )}
                      {project.link && project.link !== '#' && (
                        <Link
                          href={project.link}
                          target="_blank"
                          className="text-muted-foreground hover:text-primary hover:scale-110 transition-all"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                      )}
                    </div>
                  </div>

                  {/* Summary */}
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {project.summary}
                  </p>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 text-xs text-muted-foreground bg-[#1a1a1a] rounded hover:text-primary hover:bg-primary/10 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
