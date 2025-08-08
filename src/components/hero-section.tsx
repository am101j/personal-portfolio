
'use client';

import { Button } from "@/components/ui/button";
import { Github, Linkedin, ArrowRight, Code, Coffee, Briefcase, FileCode, Bot, BrainCircuit, Rocket, Globe } from "lucide-react";
import Link from "next/link";
import { resumeData } from "@/lib/resume-data";
import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { ResumeTailorSection } from './resume-tailor-section';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import dynamic from 'next/dynamic';

const DynamicParticleBackground = dynamic(
  () => import('./particle-background').then(m => m.ParticleBackground),
  { ssr: false }
);

const CrypticAnimation = ({ text }: { text: string }) => {
    const [displayedText, setDisplayedText] = useState('');
    const [isScrambling, setIsScrambling] = useState(true);
    const chars = '!<>-_\\/[]{}—=+*^?#';

    useEffect(() => {
        let animationFrameId: number;
        
        const stopScrambleTimeout = setTimeout(() => {
            setIsScrambling(false);
        }, 1500);

        const animate = () => {
            if (!isScrambling) {
                setDisplayedText(text);
                if (animationFrameId) {
                    cancelAnimationFrame(animationFrameId);
                }
                return;
            }

            const scrambled = text
                .split('')
                .map(() => chars[Math.floor(Math.random() * chars.length)])
                .join('');
            setDisplayedText(scrambled);
            
            animationFrameId = requestAnimationFrame(animate);
        };

        animationFrameId = requestAnimationFrame(animate);

        return () => {
            clearTimeout(stopScrambleTimeout);
            cancelAnimationFrame(animationFrameId);
        };
    }, [isScrambling, text]);

    return (
        <span className="font-headline tracking-widest text-primary">
            {displayedText}
        </span>
    );
};

const CodeBlock = () => {
    const codeStyle = "font-code text-left text-sm md:text-base";
    const keywordStyle = "text-orange-500";
    const functionStyle = "text-primary";
    const stringStyle = "text-accent-foreground";
    const commentStyle = "text-muted-foreground/80";
    const indentStyle = "pl-4";

    return (
        <pre className={`${codeStyle} bg-secondary/30 p-4 rounded-lg overflow-x-auto border`}>
            <code>
                <div>
                    <span className={keywordStyle}>if</span> work_mode:
                </div>
                <div className={indentStyle}>
                    <span className={commentStyle}># building intelligent software solutions...</span>
                </div>
                 <div className={indentStyle}>
                    <span className={functionStyle}>computer_science_student</span>(<span>'UWaterloo'</span>)
                </div>
                 <div className={indentStyle}>
                    <span className={functionStyle}>software_engineer_intern</span>()
                </div>
                <div><span className={keywordStyle}>else</span>:</div>
                <div className={indentStyle}>
                    <span className={functionStyle}>play_guitar</span>()
                </div>
                <div className={indentStyle}>
                     <span className={functionStyle}>choreograph_dance</span>()
                </div>
            </code>
        </pre>
    )
}


export function HeroSection() {
  const fullText = "Hey, I'm Abeer";
  const [tailorSheetOpen, setTailorSheetOpen] = useState(false);


  return (
    <section id="home" className="relative flex items-center justify-center text-center overflow-hidden py-12 md:py-16">
      <DynamicParticleBackground />
      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
             <Sheet open={tailorSheetOpen} onOpenChange={setTailorSheetOpen}>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <SheetTrigger asChild>
                       <Button size="icon" className="absolute -top-4 right-4 rounded-full h-10 w-10 bg-[hsl(var(--crimson-mango))] text-white hover:bg-[hsl(var(--crimson-mango))] hover:opacity-90">
                          <Bot className="h-5 w-5" />
                          <span className="sr-only">AI Resume Tailor</span>
                       </Button>
                    </SheetTrigger>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Click me!</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>AI Resume Tailor</SheetTitle>
                  <SheetDescription>
                    Paste a job description below. My AI agent will tailor my resume to highlight the most relevant skills and experiences.
                  </SheetDescription>
                </SheetHeader>
                <div className="py-4">
                  <ResumeTailorSection onSuccessfulTailor={() => {}} />
                </div>
              </SheetContent>
            </Sheet>
            
            <div className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 min-h-[44px]">
              <CrypticAnimation text={fullText} />
            </div>
            <div className="max-w-2xl mx-auto text-base md:text-lg text-muted-foreground mb-6">
                <p className="text-sm text-muted-foreground mb-2 text-left animate-color-cycle">my algorithm of life:</p>
                <CodeBlock />
            </div>

            <div className="flex justify-center items-center gap-x-8 gap-y-4 flex-wrap mt-6 mb-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                    <BrainCircuit className="h-5 w-5 text-primary" />
                    <span>Creative Problem-Solving</span>
                </div>
                 <div className="flex items-center gap-2">
                    <Rocket className="h-5 w-5 text-primary" />
                    <span>Impact-Driven Results</span>
                </div>
                <div className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-primary" />
                    <span>Global Perspective</span>
                </div>
            </div>

            <div className="flex justify-center items-center gap-x-8 gap-y-2 flex-wrap mb-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                    <Code />
                    <span>100000+ Lines of Code</span>
                </div>
                 <div className="flex items-center gap-2">
                    <Coffee />
                    <span>1000+ Coffees Consumed</span>
                </div>
            </div>

            <div className="flex justify-center gap-4">
                <Button asChild size="lg">
                    <Link href="#contact">
                        Get in touch
                    </Link>
                </Button>
                 <Button asChild variant="outline" size="lg">
                    <Link href="/projects">
                        View my work
                    </Link>
                </Button>
            </div>
        </div>
      </div>
    </section>
  )
}
