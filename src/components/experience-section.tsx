
'use client';

import { resumeData } from "@/lib/resume-data";
import { Building, Calendar, CheckCircle, ChevronDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Badge } from "./ui/badge";

interface ExperienceSectionProps {
  summary?: boolean;
}

export function ExperienceSection({ summary = false }: ExperienceSectionProps) {
  const experiences = summary ? resumeData.experience.slice(0, 2) : resumeData.experience;
  const [openStates, setOpenStates] = useState<boolean[]>(Array(experiences.length).fill(summary ? false : true));

  const toggleOpen = (index: number) => {
    setOpenStates(prev => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  };

  return (
    <section id="experience" className="py-12 md:py-16">
      <h2 className="text-center font-headline text-2xl font-bold tracking-tighter sm:text-3xl mb-12">
        Work Experience
      </h2>
      <div className="relative pl-6 before:absolute before:left-0 before:top-0 before:h-full before:w-0.5 before:bg-border">
        {experiences.map((job, index) => (
          <div key={index} className="relative mb-8 pl-8">
            <div className="absolute left-[-18px] top-1 flex h-8 w-8 items-center justify-center rounded-full bg-neon-gradient text-primary-foreground ring-8 ring-background">
              <Building className="h-4 w-4" />
            </div>
            <Collapsible open={openStates[index]} onOpenChange={() => toggleOpen(index)} className="w-full">
              <div className="p-4 rounded-lg bg-secondary/50 border">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                    <div>
                        <h3 className="text-lg font-semibold">{job.role}</h3>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-muted-foreground mt-1">
                          <span className="font-semibold text-primary">{job.company}</span>
                          <span className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            {job.duration}
                          </span>
                        </div>
                    </div>
                     <CollapsibleTrigger asChild className="mt-4 sm:mt-0">
                        <Button variant="ghost" size="sm">
                          {openStates[index] ? 'Hide Details' : 'Show Details'}
                          <ChevronDown className={`h-4 w-4 ml-2 transition-transform ${openStates[index] ? 'rotate-180' : ''}`} />
                        </Button>
                      </CollapsibleTrigger>
                </div>
                
                <CollapsibleContent>
                  <div className="mt-4 pt-4 border-t">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {job.technologies.map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs">{tech}</Badge>
                        ))}
                      </div>
                      <ul className="space-y-2 text-sm">
                        {job.description.map((point, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>
          </div>
        ))}
      </div>
    </section>
  );
}
