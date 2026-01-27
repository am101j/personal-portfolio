
'use client';

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { resumeData } from "@/lib/resume-data";
import { ArrowRight, ExternalLink } from "lucide-react";

export function ProjectsSummarySection() {
  const projects = resumeData.projects.slice(0, 2); // Show first 2

  return (
    <section id="projects-summary" className="py-8 md:py-10">
      <h2 className="text-center font-headline text-2xl font-bold tracking-tighter sm:text-3xl mb-3">
        What I've Built
      </h2>
      <p className="text-center text-muted-foreground md:text-base/relaxed mb-6">
        A selection of my recent projects.
      </p>
      <div className="grid grid-cols-1 gap-4">
        {projects.map((project) => (
          <Card key={project.title} className="flex flex-col overflow-hidden group transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-secondary/50 h-full">
            <CardHeader className="p-4">
              <CardTitle className="text-base">{project.title}</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 flex-grow flex flex-col">
              <div className="aspect-video overflow-hidden rounded-md mb-3 relative">
                {/* @ts-ignore */}
                {project.video ? (
                  /* @ts-ignore */
                  (project.video.endsWith('.mp4') || project.video.endsWith('.webm')) ? (
                    <video
                      /* @ts-ignore */
                      src={project.video}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <iframe
                      /* @ts-ignore */
                      src={project.video}
                      className="w-full h-full object-cover"
                      title={project.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  )
                ) : project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    data-ai-hint={project['data-ai-hint']}
                  />
                ) : (
                  <div className="w-full h-full bg-[#1a1a1a] flex items-center justify-center text-muted-foreground">
                    No Preview
                  </div>
                )}
              </div>
              <p className="text-muted-foreground text-sm mb-3 flex-grow">{project.summary}</p>
              {project.link && project.link !== '#' && (
                <Button asChild variant="secondary" size="sm">
                  <Link href={project.link} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Visit Project
                  </Link>
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="text-center mt-6">
        <Button asChild size="sm">
          <Link href="/projects">
            View All Projects <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
