'use client';

import { useState } from 'react';

// Map potentially tricky skill names to Simple Icons slugs
const iconSlugs: Record<string, string> = {
    'Java': 'java',
    'Python': 'python',
    'JavaScript': 'javascript',
    'TypeScript': 'typescript',
    'Spring Boot': 'springboot',
    'Node.js': 'nodedotjs',
    'React': 'react',
    'Next.js': 'nextdotjs',
    'FastAPI': 'fastapi',
    'PostgreSQL': 'postgresql',
    'MongoDB': 'mongodb',
    'TensorFlow': 'tensorflow',
    'Docker': 'docker',
    'AWS': 'amazonwebservices',
    'Git': 'git',
    'Tailwind CSS': 'tailwindcss',
};

// Curated list of main skills for the hero section
const MAIN_STACK = [
    'React',
    'Next.js',
    'TypeScript',
    'Node.js',
    'Python',
    'FastAPI',
    'Java',
    'Spring Boot',
    'PostgreSQL',
    'MongoDB',
    'TensorFlow',
    'Docker',
    'AWS',
    'Git'
];

const SkillBadge = ({ name }: { name: string }) => {
    const slug = iconSlugs[name] || name.toLowerCase().replace(/[^a-z0-9]/g, '');
    const iconUrl = `https://cdn.simpleicons.org/${slug}`; // Use default colored icon
    const [imgError, setImgError] = useState(false);

    return (
        <div className="flex items-center gap-2 px-3 py-1.5 bg-secondary/30 backdrop-blur-sm rounded-full border border-border/40 hover:border-primary/20 hover:bg-secondary/50 transition-all duration-300 mx-2 whitespace-nowrap group">
            {!imgError && (
                <img
                    src={iconUrl}
                    alt=""
                    className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-all 
                             grayscale group-hover:grayscale-0 
                             dark:brightness-0 dark:invert dark:group-hover:brightness-100 dark:group-hover:invert-0"
                    onError={() => setImgError(true)}
                />
            )}
            <span className="text-xs font-medium text-muted-foreground/80 group-hover:text-foreground transition-colors">{name}</span>
        </div>
    );
};

export function TechStack() {
    // Split skills into two rows for better visual effect
    const midpoint = Math.ceil(MAIN_STACK.length / 2);
    const row1 = MAIN_STACK.slice(0, midpoint);
    const row2 = MAIN_STACK.slice(midpoint);

    return (
        <div className="relative flex flex-col gap-3 py-4 overflow-hidden opacity-80 hover:opacity-100 transition-opacity">
            {/* Gradients to fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-background to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-background to-transparent z-10" />

            {/* Row 1 - Regular direction */}
            <div className="flex animate-marquee overflow-hidden w-max">
                {[...row1, ...row1, ...row1, ...row1].map((skill, i) => (
                    <SkillBadge key={`${skill}-${i}`} name={skill} />
                ))}
            </div>

            {/* Row 2 - Reverse direction */}
            <div className="flex animate-marquee-reverse overflow-hidden w-max">
                {[...row2, ...row2, ...row2, ...row2].map((skill, i) => (
                    <SkillBadge key={`${skill}-${i}`} name={skill} />
                ))}
            </div>
        </div>
    );
}
