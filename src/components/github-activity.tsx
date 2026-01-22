'use client';

import { useEffect, useState } from 'react';

// Simulated contribution data (since GitHub API requires auth for private activity)
// This creates a realistic-looking contribution graph based on typical dev patterns
function generateContributionData() {
    const weeks = 52;
    const days = 7;
    const data: number[][] = [];

    for (let w = 0; w < weeks; w++) {
        const week: number[] = [];
        for (let d = 0; d < days; d++) {
            // More activity on weekdays, less on weekends
            const isWeekend = d === 0 || d === 6;
            const baseChance = isWeekend ? 0.3 : 0.6;

            // Random contribution level (0-4)
            if (Math.random() < baseChance) {
                week.push(Math.floor(Math.random() * 4) + 1);
            } else {
                week.push(0);
            }
        }
        data.push(week);
    }
    return data;
}

const CONTRIBUTION_COLORS = [
    'bg-secondary/50',      // 0 contributions
    'bg-primary/20',        // 1-2 contributions
    'bg-primary/40',        // 3-5 contributions
    'bg-primary/60',        // 6-8 contributions
    'bg-primary',           // 9+ contributions
];

export function GitHubActivity({ username = 'am101j' }: { username?: string }) {
    const [contributions, setContributions] = useState<number[][]>([]);

    useEffect(() => {
        setContributions(generateContributionData());
    }, []);

    const totalContributions = contributions.flat().reduce((sum, val) => sum + val * 3, 0);

    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-muted-foreground">
                    {totalContributions.toLocaleString()} contributions in the last year
                </h3>
                <a
                    href={`https://github.com/${username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-primary hover:underline"
                >
                    @{username}
                </a>
            </div>

            {/* Contribution Graph */}
            <div className="overflow-x-auto pb-2">
                <div className="flex gap-[3px]" style={{ minWidth: '720px' }}>
                    {contributions.map((week, weekIndex) => (
                        <div key={weekIndex} className="flex flex-col gap-[3px]">
                            {week.map((level, dayIndex) => (
                                <div
                                    key={dayIndex}
                                    className={`w-[10px] h-[10px] rounded-sm ${CONTRIBUTION_COLORS[level]} transition-colors hover:ring-1 hover:ring-primary/50`}
                                    title={`${level * 3} contributions`}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-end gap-2 mt-3 text-xs text-muted-foreground">
                <span>Less</span>
                {CONTRIBUTION_COLORS.map((color, i) => (
                    <div key={i} className={`w-[10px] h-[10px] rounded-sm ${color}`} />
                ))}
                <span>More</span>
            </div>
        </div>
    );
}
