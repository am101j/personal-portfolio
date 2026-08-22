'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';

interface Node {
    id: string;
    label: string;
    x: number;
    y: number;
    vx: number;
    vy: number;
    category: 'frontend' | 'backend' | 'ai' | 'data' | 'cloud';
}

interface Connection {
    from: string;
    to: string;
}

const TECH_STACK: Omit<Node, 'x' | 'y' | 'vx' | 'vy'>[] = [
    { id: 'react', label: 'React', category: 'frontend' },
    { id: 'nextjs', label: 'Next.js', category: 'frontend' },
    { id: 'typescript', label: 'TypeScript', category: 'frontend' },
    { id: 'python', label: 'Python', category: 'backend' },
    { id: 'fastapi', label: 'FastAPI', category: 'backend' },
    { id: 'graphql', label: 'GraphQL', category: 'backend' },
    { id: 'tensorflow', label: 'TensorFlow', category: 'ai' },
    { id: 'langchain', label: 'LangChain', category: 'ai' },
    { id: 'postgresql', label: 'PostgreSQL', category: 'data' },
    { id: 'aws', label: 'AWS', category: 'cloud' },
    { id: 'gcp', label: 'GCP', category: 'cloud' },
    { id: 'docker', label: 'Docker', category: 'cloud' },
];

const CONNECTIONS: Connection[] = [
    { from: 'react', to: 'nextjs' },
    { from: 'react', to: 'typescript' },
    { from: 'nextjs', to: 'graphql' },
    { from: 'nextjs', to: 'fastapi' },
    { from: 'python', to: 'fastapi' },
    { from: 'python', to: 'tensorflow' },
    { from: 'python', to: 'langchain' },
    { from: 'fastapi', to: 'postgresql' },
    { from: 'graphql', to: 'postgresql' },
    { from: 'langchain', to: 'gcp' },
    { from: 'tensorflow', to: 'aws' },
    { from: 'postgresql', to: 'aws' },
    { from: 'aws', to: 'docker' },
    { from: 'gcp', to: 'docker' },
];

const CATEGORY_COLORS: Record<string, string> = {
    frontend: '#10b981',  // emerald
    backend: '#10b981',
    ai: '#10b981',
    data: '#10b981',
    cloud: '#10b981',
};

export function TechStackNodes() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const nodesRef = useRef<Node[]>([]);
    const animationRef = useRef<number>();
    const [hoveredNode, setHoveredNode] = useState<string | null>(null);
    const mouseRef = useRef({ x: 0, y: 0 });
    const [mounted, setMounted] = useState(false);
    const { resolvedTheme } = useTheme();

    useEffect(() => setMounted(true), []);

    useEffect(() => {
        if (!mounted) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const isLight = resolvedTheme === 'light';
        // Dark keeps the original emerald-500 literal verbatim. Light reads --primary
        // off the document so the diagram tracks the token instead of drifting from it.
        const primary = getComputedStyle(document.documentElement)
            .getPropertyValue('--primary')
            .trim();
        const accent = (alpha: number) =>
            isLight ? `hsl(${primary} / ${alpha})` : `rgba(16, 185, 129, ${alpha})`;
        const palette = isLight
            ? {
                  linkIdle: accent(0.3),
                  linkActive: accent(0.85),
                  // Softer halo — a bright bloom disappears on a light ground.
                  glowInner: accent(0.16),
                  // Solid paper disc instead of a dark slate chip.
                  nodeFill: 'rgba(255, 255, 255, 0.92)',
                  nodeFillHovered: accent(0.14),
                  nodeStrokeIdle: accent(0.45),
                  nodeStrokeActive: accent(0.9),
                  labelIdle: 'rgba(51, 65, 85, 0.9)',
                  labelActive: accent(1),
              }
            : {
                  linkIdle: accent(0.15),
                  linkActive: accent(0.8),
                  glowInner: accent(0.3),
                  nodeFill: 'rgba(30, 41, 59, 0.8)',
                  nodeFillHovered: accent(0.3),
                  nodeStrokeIdle: accent(0.3),
                  nodeStrokeActive: accent(0.8),
                  labelIdle: 'rgba(148, 163, 184, 0.8)',
                  labelActive: accent(1),
              };

        // Set canvas size
        const resize = () => {
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width * window.devicePixelRatio;
            canvas.height = rect.height * window.devicePixelRatio;
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        };
        resize();
        window.addEventListener('resize', resize);

        // Initialize nodes with random positions
        const width = canvas.getBoundingClientRect().width;
        const height = canvas.getBoundingClientRect().height;

        nodesRef.current = TECH_STACK.map((tech) => ({
            ...tech,
            x: Math.random() * (width - 100) + 50,
            y: Math.random() * (height - 60) + 30,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
        }));

        // Mouse tracking
        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouseRef.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            };

            // Check if hovering over a node
            let found = null;
            for (const node of nodesRef.current) {
                const dx = mouseRef.current.x - node.x;
                const dy = mouseRef.current.y - node.y;
                if (Math.sqrt(dx * dx + dy * dy) < 30) {
                    found = node.id;
                    break;
                }
            }
            setHoveredNode(found);
        };
        canvas.addEventListener('mousemove', handleMouseMove);

        // Animation loop
        const animate = () => {
            const width = canvas.getBoundingClientRect().width;
            const height = canvas.getBoundingClientRect().height;

            ctx.clearRect(0, 0, width, height);

            // Update node positions with gentle floating
            for (const node of nodesRef.current) {
                // Add slight attraction to center
                const centerX = width / 2;
                const centerY = height / 2;
                node.vx += (centerX - node.x) * 0.0001;
                node.vy += (centerY - node.y) * 0.0001;

                // Apply velocity with damping
                node.x += node.vx;
                node.y += node.vy;
                node.vx *= 0.99;
                node.vy *= 0.99;

                // Add subtle random movement
                node.vx += (Math.random() - 0.5) * 0.02;
                node.vy += (Math.random() - 0.5) * 0.02;

                // Boundary collision
                if (node.x < 50) { node.x = 50; node.vx *= -0.5; }
                if (node.x > width - 50) { node.x = width - 50; node.vx *= -0.5; }
                if (node.y < 30) { node.y = 30; node.vy *= -0.5; }
                if (node.y > height - 30) { node.y = height - 30; node.vy *= -0.5; }

                // Node repulsion
                for (const other of nodesRef.current) {
                    if (other.id === node.id) continue;
                    const dx = node.x - other.x;
                    const dy = node.y - other.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 100) {
                        const force = (100 - dist) * 0.001;
                        node.vx += (dx / dist) * force;
                        node.vy += (dy / dist) * force;
                    }
                }
            }

            // Draw connections
            ctx.lineWidth = 1;
            for (const conn of CONNECTIONS) {
                const fromNode = nodesRef.current.find(n => n.id === conn.from);
                const toNode = nodesRef.current.find(n => n.id === conn.to);
                if (!fromNode || !toNode) continue;

                const isHighlighted = hoveredNode === conn.from || hoveredNode === conn.to;

                ctx.beginPath();
                ctx.moveTo(fromNode.x, fromNode.y);
                ctx.lineTo(toNode.x, toNode.y);
                ctx.strokeStyle = isHighlighted ? palette.linkActive : palette.linkIdle;
                ctx.lineWidth = isHighlighted ? 2 : 1;
                ctx.stroke();

                // Animated pulse on connections
                if (isHighlighted) {
                    const time = Date.now() * 0.002;
                    const pulsePos = (Math.sin(time) + 1) / 2;
                    const pulseX = fromNode.x + (toNode.x - fromNode.x) * pulsePos;
                    const pulseY = fromNode.y + (toNode.y - fromNode.y) * pulsePos;

                    ctx.beginPath();
                    ctx.arc(pulseX, pulseY, 3, 0, Math.PI * 2);
                    ctx.fillStyle = palette.linkActive;
                    ctx.fill();
                }
            }

            // Draw nodes
            for (const node of nodesRef.current) {
                const isHovered = hoveredNode === node.id;
                const isConnected = CONNECTIONS.some(
                    c => (c.from === hoveredNode && c.to === node.id) ||
                        (c.to === hoveredNode && c.from === node.id)
                );

                // Glow effect
                if (isHovered || isConnected) {
                    ctx.beginPath();
                    ctx.arc(node.x, node.y, 28, 0, Math.PI * 2);
                    const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 28);
                    gradient.addColorStop(0, palette.glowInner);
                    gradient.addColorStop(1, accent(0));
                    ctx.fillStyle = gradient;
                    ctx.fill();
                }

                // Node circle
                ctx.beginPath();
                ctx.arc(node.x, node.y, isHovered ? 24 : 20, 0, Math.PI * 2);
                ctx.fillStyle = isHovered ? palette.nodeFillHovered : palette.nodeFill;
                ctx.fill();
                ctx.strokeStyle = isHovered || isConnected
                    ? palette.nodeStrokeActive
                    : palette.nodeStrokeIdle;
                ctx.lineWidth = isHovered ? 2 : 1;
                ctx.stroke();

                // Node label
                ctx.font = isHovered ? 'bold 11px monospace' : '10px monospace';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillStyle = isHovered || isConnected
                    ? palette.labelActive
                    : palette.labelIdle;
                ctx.fillText(node.label, node.x, node.y);
            }

            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resize);
            canvas.removeEventListener('mousemove', handleMouseMove);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [hoveredNode, mounted, resolvedTheme]);

    return (
        <div className="w-full max-w-2xl mx-auto">
            <canvas
                ref={canvasRef}
                className="w-full h-[300px] rounded-lg border border-[hsl(var(--border)/0.9)] dark:border-border/30 cursor-crosshair"
                style={{ background: 'transparent' }}
            />
            <p className="text-center text-xs text-muted-foreground mt-3">
                hover over nodes to explore connections
            </p>
        </div>
    );
}
