
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BookOpen } from "lucide-react";

const BigBenIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="currentColor" className="w-full h-full">
      <path d="M52.5,95h-5V85h5ZM40,95h5V85h-5Zm20,0h5V85h-5Z" />
      <path d="M50,4,30,9.33V20H70V9.33ZM50,18a4,4,0,1,1,4-4A4,4,0,0,1,50,18Z" />
      <path d="M50,22a3,3,0,1,1,3-3A3,3,0,0,1,50,22Z" />
      <path d="M50,28a2,2,0,1,1,2-2A2,2,0,0,1,50,28Z" />
      <rect x="40" y="25" width="20" height="55" />
      <path d="M65,80H35V20H25V85H75V20H65Z" />
    </svg>
);

const CNICon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="currentColor" className="w-full h-full">
      <path d="M45,95V85h10V95Z" />
      <path d="M50,5,30,15V30H70V15Z" />
      <path d="M50,18a4,4,0,1,1,4-4A4,4,0,0,1,50,18Z" />
      <path d="M45,35h10v5H45Z" />
      <path d="M50,45a5,5,0,1,1,5-5A5,5,0,0,1,50,45Z" />
      <path d="M35,50H65L50,80Z" />
    </svg>
);

const educationData = [
    {
      institution: 'University of Waterloo',
      degree: 'Bachelor of Computer Science',
      duration: '2024 - Present',
      location: 'Waterloo, Canada',
      icon: <CNICon />
    },
    {
      institution: 'Reading Grammar School',
      degree: 'A Levels: Computer Science, Further Maths, Physics',
      duration: '2022 - 2024',
      location: 'Reading, United Kingdom',
      icon: <BigBenIcon />
    },
];

export function EducationSection() {
  return (
    <section id="education" className="py-8 md:py-12">
      <h2 className="text-center font-headline text-2xl font-bold tracking-tighter sm:text-3xl mb-6">
        Education
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {educationData.map((edu, index) => (
            <Card key={index} className="transform transition-transform duration-300 hover:scale-105 hover:shadow-lg bg-secondary">
                <CardHeader className="p-5">
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/50 text-accent-foreground p-2 ring-1 ring-border">
                            {edu.icon}
                        </div>
                        <div className="flex-1">
                            <CardTitle className="text-base font-bold">{edu.institution}</CardTitle>
                            <CardDescription className="text-sm">{edu.degree}</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-5 pt-0">
                    <p className="text-muted-foreground text-sm">{edu.duration}</p>
                    <p className="text-muted-foreground text-sm">{edu.location}</p>
                </CardContent>
            </Card>
        ))}
      </div>
    </section>
  );
}
