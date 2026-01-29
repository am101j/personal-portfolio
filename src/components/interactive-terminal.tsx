'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { resumeData } from '@/lib/resume-data';

interface TerminalLine {
    type: 'input' | 'output' | 'error';
    content: string;
}

const COMMANDS = {
    help: `Available commands:
  help      - Show this help message
  about     - Learn about me
  skills    - View my technical skills
  projects  - See my featured projects
  experience - View my work experience
  contact   - Get my contact info
  clear     - Clear the terminal`,

    about: () => `${resumeData.name} - ${resumeData.title}

${resumeData.summary}

Type 'skills' to see what I work with, or 'projects' to see what I've built.`,

    skills: () => {
        const { languages, frameworks, developerTools } = resumeData.technicalSkills;
        return `Technical Skills:

Languages:  ${languages.join(', ')}
Frameworks: ${frameworks.join(', ')}
Tools:      ${developerTools.join(', ')}`;
    },

    projects: () => {
        const top3 = resumeData.projects.slice(0, 3);
        return `Featured Projects:

${top3.map((p, i) => `${i + 1}. ${p.title}
   ${p.summary}`).join('\n\n')}

Visit /projects for the full portfolio.`;
    },

    experience: () => {
        const recent = resumeData.experience.slice(0, 2);
        return `Recent Experience:

${recent.map(e => `${e.role} @ ${e.company}
${e.duration} | ${e.location}
${e.description[0]}`).join('\n\n')}

Visit /experience for full details.`;
    },

    contact: () => `Let's connect!

Email:    ${resumeData.contact.email}
LinkedIn: ${resumeData.contact.linkedin}
GitHub:   ${resumeData.contact.github}`,
};

export function InteractiveTerminal() {
    const [lines, setLines] = useState<TerminalLine[]>([
        { type: 'output', content: `Welcome! I'm ${resumeData.name}.` },
        { type: 'output', content: `Type 'help' to see available commands.` },
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const terminalRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = useCallback(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [lines, scrollToBottom]);

    const typeOutput = useCallback((text: string, callback?: () => void) => {
        setIsTyping(true);
        const words = text.split(' ');
        let currentText = '';
        let wordIndex = 0;

        const typeNextWord = () => {
            if (wordIndex < words.length) {
                currentText += (wordIndex > 0 ? ' ' : '') + words[wordIndex];
                setLines(prev => {
                    const newLines = [...prev];
                    if (newLines[newLines.length - 1]?.type === 'output' && wordIndex > 0) {
                        newLines[newLines.length - 1] = { type: 'output', content: currentText };
                    } else {
                        newLines.push({ type: 'output', content: currentText });
                    }
                    return newLines;
                });
                wordIndex++;
                setTimeout(typeNextWord, 20);
            } else {
                setIsTyping(false);
                callback?.();
            }
        };

        typeNextWord();
    }, []);

    const handleCommand = useCallback((cmd: string) => {
        const trimmedCmd = cmd.trim().toLowerCase();

        setLines(prev => [...prev, { type: 'input', content: `$ ${cmd}` }]);

        if (trimmedCmd === 'clear') {
            setLines([]);
            return;
        }

        if (trimmedCmd === '') {
            return;
        }

        const command = COMMANDS[trimmedCmd as keyof typeof COMMANDS];

        if (command) {
            const output = typeof command === 'function' ? command() : command;
            // Add output lines
            output.split('\n').forEach((line, index) => {
                setTimeout(() => {
                    setLines(prev => [...prev, { type: 'output', content: line }]);
                }, index * 30);
            });
        } else {
            setLines(prev => [...prev, {
                type: 'error',
                content: `Command not found: ${trimmedCmd}. Type 'help' for available commands.`
            }]);
        }
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isTyping) return;
        handleCommand(input);
        setInput('');
    };

    const focusInput = () => {
        inputRef.current?.focus();
    };

    return (
        <div
            className="w-full max-w-2xl mx-auto"
            onClick={focusInput}
        >
            {/* Terminal Window */}
            <div className="rounded-lg border border-border/50 bg-background/80 backdrop-blur-sm overflow-hidden shadow-2xl shadow-primary/5">
                {/* Terminal Header */}
                <div className="flex items-center gap-2 px-4 py-3 bg-secondary/50 border-b border-border/50">
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/80" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                        <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>
                    <span className="text-xs text-muted-foreground ml-2 font-mono">
                        ~/portfolio
                    </span>
                </div>

                {/* Terminal Content */}
                <div
                    ref={terminalRef}
                    className="p-4 font-mono text-sm h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-border"
                >
                    {lines.map((line, i) => (
                        <div
                            key={i}
                            className={`mb-1 ${line.type === 'input'
                                ? 'text-primary'
                                : line.type === 'error'
                                    ? 'text-red-400'
                                    : 'text-muted-foreground'
                                }`}
                        >
                            <span className="whitespace-pre-wrap">{line.content}</span>
                        </div>
                    ))}

                    {/* Input Line */}
                    <form onSubmit={handleSubmit} className="flex items-center gap-2">
                        <span className="text-primary">$</span>
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="flex-1 bg-transparent outline-none text-foreground font-mono caret-primary"
                            autoFocus
                            disabled={isTyping}
                            placeholder={isTyping ? '' : 'type a command...'}
                        />
                        <span className="w-2 h-5 bg-primary animate-pulse" />
                    </form>
                </div>
            </div>

            {/* Hint */}
            <p className="text-center text-xs text-muted-foreground mt-4">
                💡 Click and type <span className="text-primary font-mono">help</span> to explore my background
            </p>
        </div>
    );
}
