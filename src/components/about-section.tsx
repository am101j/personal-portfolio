
'use client';

import { BrainCircuit, Globe, Rocket, Guitar, Bot, Music } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { resumeData } from "@/lib/resume-data";

const valueAdds = [
    {
        icon: <BrainCircuit className="h-8 w-8 text-primary" />,
        title: "Creative Problem-Solving",
        description: "I thrive on finding elegant solutions to complex challenges, blending analytical thinking with a creative approach to build software that is both functional and user-friendly."
    },
    {
        icon: <Rocket className="h-8 w-8 text-primary" />,
        title: "Impact-Driven Results",
        description: "My focus is on delivering tangible outcomes. I'm passionate about developing software that not only works flawlessly but also provides real-world value and drives progress."
    },
    {
        icon: <Globe className="h-8 w-8 text-primary" />,
        title: "Global Perspective",
        description: "Having lived and studied across three continents, I bring a unique, adaptable mindset that helps me collaborate effectively in diverse teams and build universally appealing products."
    }
];

export function AboutSection() {
    return (
        <section id="about" className="py-12 md:py-16">
            <div className="max-w-3xl mx-auto">
                <h2 className="text-center font-headline text-3xl font-bold tracking-tighter sm:text-4xl mb-4">
                    About Me
                </h2>
                <p className="text-center text-muted-foreground md:text-lg/relaxed mb-12">
                    A developer driven by curiosity and a passion for impact.
                </p>

                <div className="text-left bg-secondary/30 p-6 rounded-lg border mb-12">
                     <p className="mb-4">
                        Hello! I'm {resumeData.name}, a Computer Science student at the University of Waterloo. My journey in tech is fueled by a fascination with building intelligent software that solves real-world problems.
                    </p>
                    <p className="mb-4">
                        I approach development as both an art and a science—a discipline that requires rigorous logic and a creative spark. I love diving deep into code, but I'm equally passionate about understanding the "why" behind the "what," ensuring that every project I undertake has a meaningful impact.
                    </p>
                    <p>
                        Outside of coding, you can find me choreographing dance routines or playing my guitar. These creative outlets balance my analytical side and constantly inspire new ways of thinking.
                    </p>
                </div>

                <div className="mb-12">
                    <h3 className="text-center font-headline text-2xl font-bold tracking-tighter sm:text-3xl mb-8">
                        My Core Values
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                        {valueAdds.map((item) => (
                            <div key={item.title} className="flex flex-col items-center p-4">
                                {item.icon}
                                <h4 className="font-semibold text-lg mt-4 mb-2">{item.title}</h4>
                                <p className="text-sm text-muted-foreground">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
