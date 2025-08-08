
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { resumeData } from "@/lib/resume-data";
import { Code, Server, Wrench } from "lucide-react";

const skillCategories = [
  {
    title: "Languages",
    icon: <Code className="w-8 h-8 text-accent" />,
    skills: resumeData.technicalSkills.languages,
  },
  {
    title: "Frameworks & Libraries",
    icon: <Server className="w-8 h-8 text-accent" />,
    skills: resumeData.technicalSkills.frameworks,
  },
  {
    title: "Developer Tools",
    icon: <Wrench className="w-8 h-8 text-accent" />,
    skills: resumeData.technicalSkills.developerTools,
  },
];

export function SkillsSection() {
  return (
    <section id="skills" className="py-8 md:py-12">
      <h2 className="text-center font-headline text-2xl font-bold tracking-tighter sm:text-3xl mb-8">
        Technical Skills
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {skillCategories.map((category) => (
          <div key={category.title} className="text-center flex flex-col items-center">
            {category.icon}
            <h3 className="font-headline text-lg font-semibold mt-4 mb-3">{category.title}</h3>
            <div className="flex flex-wrap gap-2 justify-center">
              {category.skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="text-sm px-3 py-1">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
