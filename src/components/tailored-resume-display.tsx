
'use client';
import type { TailorResumeOutput } from "@/ai/flows/tailor-resume-flow";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Check, Lightbulb, User, Building, AlertTriangle } from "lucide-react";

interface TailoredResumeDisplayProps {
    tailoredResume: TailorResumeOutput;
}

export function TailoredResumeDisplay({ tailoredResume }: TailoredResumeDisplayProps) {
    return (
        <div className="space-y-6 animate-fade-in">
            <h3 className="text-xl font-headline font-bold text-center">Your Tailored Resume</h3>

            <Card className="bg-secondary/50">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                        <User className="w-5 h-5 text-primary" />
                        Tailored Summary
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">{tailoredResume.summary}</p>
                </CardContent>
            </Card>

            <Card className="bg-secondary/50">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                        <Lightbulb className="w-5 h-5 text-primary" />
                        Highlighted Achievements
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-4">
                        {tailoredResume.keyAchievements.map((ach, index) => (
                            <li key={index} className="flex items-start gap-4 p-3 rounded-md border bg-background/50">
                                <Check className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                                <div>
                                    <div className="font-semibold text-foreground flex items-center gap-2">
                                        <Building className="h-4 w-4 text-muted-foreground" />
                                        {ach.company} - <span className="text-muted-foreground font-normal">{ach.role}</span>
                                    </div>
                                    <p className="text-muted-foreground text-sm mt-1">{ach.tailoredAchievement}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </div>
    );
}
