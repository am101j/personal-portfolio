
'use client';

import { resumeData } from "@/lib/resume-data";
import { Building, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

export function ExperienceSummarySection() {
  const experiences = resumeData.experience.slice(0, 3); // Show first 3

  return (
    <section id="experience-summary" className="py-8 md:py-10">
       <h2 className="text-center font-headline text-2xl font-bold tracking-tighter sm:text-3xl mb-3">
        Where I've Worked
      </h2>
       <p className="text-center text-muted-foreground md:text-base/relaxed mb-6">
        A brief look at my professional journey.
      </p>
      <div className="relative pl-4 before:absolute before:left-0 before:top-0 before:h-full before:w-0.5 before:bg-border">
        {experiences.map((job, index) => (
          <div key={index} className="relative mb-6 pl-6">
            <div className="absolute left-[-18px] top-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground ring-4 ring-background">
              <Building className="h-4 w-4" />
            </div>
            <Card className="transform transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg bg-secondary/50">
                <CardHeader className="p-4">
                    <CardTitle className="text-base">{job.role}</CardTitle>
                    <CardDescription className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 pt-1">
                        <span className="font-semibold text-primary text-sm">{job.company}</span>
                         <span className="text-muted-foreground text-xs">{job.duration}</span>
                    </CardDescription>
                </CardHeader>
            </Card>
          </div>
        ))}
      </div>
      <div className="text-center mt-6">
        <Button asChild size="sm">
          <Link href="/experience">
            View Full Experience <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
