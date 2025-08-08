
'use client';
import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { SkillsSection } from "@/components/skills-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
import { EducationSection } from "@/components/education-section";
import Link from "next/link";
import { ArrowRight, Building, BookOpen, GraduationCap, ArrowDown, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { resumeData } from "@/lib/resume-data";
import { ResumeTailorSection } from "@/components/resume-tailor-section";

const WiproIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="currentColor" className="w-full h-full text-primary">
      <path d="M50,5A45,45,0,1,0,95,50,45,45,0,0,0,50,5Zm0,82A37,37,0,1,1,87,50,37,37,0,0,1,50,87Z"/>
      <path d="M50,22.5a2.5,2.5,0,1,0,2.5,2.5A2.5,2.5,0,0,0,50,22.5Z"/>
      <path d="M50,30A2.5,2.5,0,1,0,52.5,32.5,2.5,2.5,0,0,0,50,30Z"/>
      <path d="M50,50a2.5,2.5,0,1,0,2.5,2.5A2.5,2.5,0,0,0,50,50Z"/>
      <path d="M50,42.5a2.5,2.5,0,1,0,2.5,2.5A2.5,2.5,0,0,0,50,42.5Z"/>
      <path d="M50,57.5A2.5,2.5,0,1,0,52.5,60,2.5,2.5,0,0,0,50,57.5Z"/>
      <path d="M50,65a2.5,2.5,0,1,0,2.5,2.5A2.5,2.5,0,0,0,50,65Z"/>
      <path d="M50,72.5a2.5,2.5,0,1,0,2.5,2.5A2.5,2.5,0,0,0,50,72.5Z"/>
      <path d="M42.5,26.25a2.5,2.5,0,1,0,2.5,2.5A2.5,2.5,0,0,0,42.5,26.25Z"/>
      <path d="M35,30a2.5,2.5,0,1,0,2.5,2.5A2.5,2.5,0,0,0,35,30Z"/>
      <path d="M27.5,33.75a2.5,2.5,0,1,0,2.5,2.5A2.5,2.5,0,0,0,27.5,33.75Z"/>
      <path d="M20,37.5a2.5,2.5,0,1,0,2.5,2.5A2.5,2.5,0,0,0,20,37.5Z"/>
      <path d="M57.5,26.25a2.5,2.5,0,1,0,2.5,2.5A2.5,2.5,0,0,0,57.5,26.25Z"/>
      <path d="M65,30a2.5,2.5,0,1,0,2.5,2.5A2.5,2.5,0,0,0,65,30Z"/>
      <path d="M72.5,33.75a2.5,2.5,0,1,0,2.5,2.5A2.5,2.5,0,0,0,72.5,33.75Z"/>
      <path d="M80,37.5a2.5,2.5,0,1,0,2.5,2.5A2.5,2.5,0,0,0,80,37.5Z"/>
    </svg>
  );

const currentRoles = [
    {
      role: 'Software Engineer Intern',
      institution: 'Wipro',
      date: 'May to August 2025',
      icon: <WiproIcon />,
    },
    {
      role: 'Software Developer Intern',
      institution: 'West Berkshire Council',
      date: 'June 2023',
      icon: <Building />,
    },
];

const homePageProjects = resumeData.projects.filter(p => [
    'AI Billing Anomaly Reporter',
    'Resistor Classification',
    'WatSpot'
].includes(p.title));


export default function Home() {

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8">
           <div className="max-w-3xl mx-auto">
             <h2 className="text-base font-headline mb-6 text-muted-foreground uppercase tracking-widest">recent work...</h2>
             <ul className="space-y-6">
                {currentRoles.map((role, index) => (
                    <li key={index} className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/50 text-primary p-2 ring-1 ring-border">
                            {role.icon}
                        </div>
                        <div className="flex-1">
                            <p className="font-semibold text-foreground text-lg">{role.institution}</p>
                            <p className="text-muted-foreground">{role.role}</p>
                        </div>
                        <p className="text-sm text-muted-foreground font-headline">{role.date}</p>
                    </li>
                ))}
             </ul>

             <h2 className="text-base font-headline my-8 text-muted-foreground uppercase tracking-widest">recent projects...</h2>
             <ul className="space-y-6">
                {homePageProjects.map((project, index) => (
                    <li key={index} className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/50 text-primary p-2 ring-1 ring-border">
                            <Code />
                        </div>
                        <div className="flex-1">
                            <p className="font-semibold text-foreground text-lg">{project.title}</p>
                        </div>
                    </li>
                ))}
             </ul>

             <div className="flex flex-col items-center text-center mt-12 text-muted-foreground">
                <span className="font-headline text-base">scroll to see more</span>
                <ArrowDown className="h-5 w-5 mt-2 animate-bounce"/>
             </div>
           </div>
        </div>

        <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <div className="space-y-12 md:space-y-16 mt-4">
              <ResumeTailorSection />
              <SkillsSection />
              <EducationSection />
              <ContactSection />
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
