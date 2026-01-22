'use client';

import { useEffect, useRef } from 'react';

export function Geometric3D() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size
        const resize = () => {
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width * 2;
            canvas.height = rect.height * 2;
            ctx.scale(2, 2);
        };
        resize();

        // 3D cube vertices
        const vertices = [
            [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
            [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]
        ];

        // Edges connecting vertices
        const edges = [
            [0, 1], [1, 2], [2, 3], [3, 0],
            [4, 5], [5, 6], [6, 7], [7, 4],
            [0, 4], [1, 5], [2, 6], [3, 7]
        ];

        // Inner cube (smaller)
        const innerScale = 0.6;

        let angleX = 0;
        let angleY = 0;
        let angleZ = 0;

        const project = (x: number, y: number, z: number, scale: number = 1): [number, number] => {
            const size = Math.min(canvas.width, canvas.height) / 4;
            const distance = 4;
            const factor = distance / (distance + z * scale);
            return [
                x * scale * factor * size + canvas.width / 4,
                y * scale * factor * size + canvas.height / 4
            ];
        };

        const rotate = (x: number, y: number, z: number): [number, number, number] => {
            // Rotate around X
            let y1 = y * Math.cos(angleX) - z * Math.sin(angleX);
            let z1 = y * Math.sin(angleX) + z * Math.cos(angleX);

            // Rotate around Y
            let x1 = x * Math.cos(angleY) + z1 * Math.sin(angleY);
            let z2 = -x * Math.sin(angleY) + z1 * Math.cos(angleY);

            // Rotate around Z
            let x2 = x1 * Math.cos(angleZ) - y1 * Math.sin(angleZ);
            let y2 = x1 * Math.sin(angleZ) + y1 * Math.cos(angleZ);

            return [x2, y2, z2];
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width / 2, canvas.height / 2);

            // Update rotation
            angleX += 0.003;
            angleY += 0.005;
            angleZ += 0.002;

            // Draw outer cube
            ctx.strokeStyle = 'rgba(16, 185, 129, 0.6)';
            ctx.lineWidth = 1.5;

            for (const [i, j] of edges) {
                const v1 = rotate(...vertices[i] as [number, number, number]);
                const v2 = rotate(...vertices[j] as [number, number, number]);
                const [x1, y1] = project(...v1);
                const [x2, y2] = project(...v2);

                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.stroke();
            }

            // Draw inner cube
            ctx.strokeStyle = 'rgba(16, 185, 129, 0.3)';
            ctx.lineWidth = 1;

            for (const [i, j] of edges) {
                const v1 = rotate(...vertices[i] as [number, number, number]);
                const v2 = rotate(...vertices[j] as [number, number, number]);
                const [x1, y1] = project(v1[0] * innerScale, v1[1] * innerScale, v1[2] * innerScale);
                const [x2, y2] = project(v2[0] * innerScale, v2[1] * innerScale, v2[2] * innerScale);

                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.stroke();
            }

            // Draw vertices as dots
            ctx.fillStyle = 'rgba(16, 185, 129, 0.8)';
            for (const v of vertices) {
                const rotated = rotate(...v as [number, number, number]);
                const [x, y] = project(...rotated);
                ctx.beginPath();
                ctx.arc(x, y, 3, 0, Math.PI * 2);
                ctx.fill();
            }

            requestAnimationFrame(animate);
        };

        animate();
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="w-full h-full"
        />
    );
}
