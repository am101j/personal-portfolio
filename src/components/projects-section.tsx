
'use client';

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { resumeData } from "@/lib/resume-data";
import { CheckCircle, ExternalLink, ChevronDown } from "lucide-react";
import { useState } from "react";

interface ProjectsSectionProps {
  summary?: boolean;
}

export function ProjectsSection({ summary = false }: ProjectsSectionProps) {
  const projects = summary ? resumeData.projects.slice(0, 2) : resumeData.projects;
  const [openStates, setOpenStates] = useState<boolean[]>(Array(projects.length).fill(false));

  const toggleOpen = (index: number) => {
    setOpenStates(prev => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  };
  
  return (
    <section id="projects" className="py-8 md:py-12">
      <h2 className="text-center font-headline text-2xl font-bold tracking-tighter sm:text-3xl mb-12">
        Projects
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <Collapsible key={project.title} open={openStates[index]} onOpenChange={() => toggleOpen(index)} className="flex">
            <Card className="flex flex-col overflow-hidden group transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-secondary h-full">
              <CardHeader className="p-4 flex flex-row items-start justify-between">
                <CardTitle className="text-base">{project.title}</CardTitle>
                <div className="flex items-center gap-2 flex-shrink-0">
                    {project.link !== '#' && (
                      <Button asChild size="icon" className="h-8 w-8">
                        <Link href={project.link} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                          <span className="sr-only">Visit Project</span>
                        </Link>
                      </Button>
                    )}
                    {project.github && (
                       <Button asChild size="icon" variant="secondary" className="h-8 w-8">
                        <Link href={project.github} target="_blank" rel="noopener noreferrer">
                          <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 fill-current"><title>GitHub</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                          <span className="sr-only">View Source</span>
                        </Link>
                      </Button>
                    )}
                  </div>
              </CardHeader>
              <CardContent className="p-4 pt-0 flex-grow flex flex-col">
                <div className="aspect-video overflow-hidden rounded-md mb-4">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    data-ai-hint={project['data-ai-hint']}
                  />
                </div>
                <div className="flex flex-wrap gap-1 mb-3">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">{tech}</Badge>
                  ))}
                </div>
                <p className="text-muted-foreground text-sm mb-4 flex-grow">{project.summary}</p>
                 <CollapsibleContent>
                  <ul className="space-y-2 mt-4 text-sm border-t pt-4">
                    {project.description.map((point, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </CollapsibleContent>
              </CardContent>
              <CardFooter className="p-2 border-t mt-auto">
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" className="w-full text-sm">
                      {openStates[index] ? 'Show Less' : 'Show Details'}
                      <ChevronDown className={`h-4 w-4 ml-2 transition-transform ${openStates[index] ? 'rotate-180' : ''}`} />
                    </Button>
                  </CollapsibleTrigger>
              </CardFooter>
            </Card>
          </Collapsible>
        ))}
      </div>
    </section>
  );
}
