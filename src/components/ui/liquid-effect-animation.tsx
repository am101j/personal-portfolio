'use client';

import { useEffect, useRef } from 'react';
import type { LiquidApp } from 'threejs-components/build/backgrounds/liquid1.min.js';

/**
 * Cursor-driven liquid surface — the `threejs-components` liquid1 background,
 * loaded from the installed package instead of a CDN <script> tag.
 *
 * The demo dresses the water in a purple mirror photo, which would replace the
 * site's palette. Here the water is dressed in the site's own tokens: the
 * surface sits at exactly the page background colour when it is still, and the
 * only thing that shows is emerald caught by the tilted face of a wave — so
 * the ripples read as faint dark-green water on the same blackish ground.
 */

/** Radius the library uses for its own per-pointer-event drips. */
const LIBRARY_DRIP_RADIUS = 0.025;

type Props = {
    /** Size of each touch the cursor leaves, in normalised units. */
    rippleRadius?: number;
    /** Height of each touch. These stack along the path, so keep it small. */
    rippleStrength?: number;
    /** Distance between touches along the path, in CSS px. */
    step?: number;
    /** Most touches one pointer event may lay down, so a big jump is capped. */
    maxSteps?: number;
    /** Strength multiplier at a slow drift, and at a fast sweep. */
    minBite?: number;
    maxBite?: number;
    /** 0.99–0.999. Higher = ripples cascade further and die away slower. */
    attenuation?: number;
    /** Wet sheen of the surface. */
    metalness?: number;
    roughness?: number;
    /** How brightly the surface picks up the emerald horizon. */
    envIntensity?: number;
    /** Multiplier applied to that on a pale page, where the same value reads louder. */
    lightIntensityScale?: number;
    /** How far the waves bend the surface texture. */
    displacementScale?: number;
    className?: string;
};

/**
 * Resolves a CSS colour expression (including `hsl(var(--token))`) into the
 * `rgb(r, g, b)` string three.js can parse.
 */
function resolveColor(expression: string, fallback: string) {
    const probe = document.createElement('div');
    probe.style.cssText = 'position:absolute;width:0;height:0;visibility:hidden';
    probe.style.color = expression;
    document.body.appendChild(probe);
    const resolved = getComputedStyle(probe).color;
    probe.remove();
    return resolved && resolved !== 'rgba(0, 0, 0, 0)' ? resolved : fallback;
}

/**
 * The surface itself: a flat sheet of the page background. Nothing to see
 * while the water is still — every visible ripple comes from what the tilted
 * wave faces reflect.
 */
function surfaceTexture(background: string) {
    const canvas = document.createElement('canvas');
    canvas.width = 4;
    canvas.height = 4;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    ctx.fillStyle = background;
    ctx.fillRect(0, 0, 4, 4);

    return canvas.toDataURL('image/png');
}

/**
 * Equirectangular environment. Straight up — what a flat surface reflects — is
 * matched to the page, so still water is indistinguishable from the ground.
 * The emerald sits at the horizon, where only a tilted wave face can catch it.
 *
 * On a pale page that same trick has to run the other way round: reflections
 * only ever add light, so the surface is dimmed and the sky is made bright,
 * which puts the flat areas back at the page colour and leaves wave faces
 * catching the darker emerald instead.
 */
function envTexture(sky: string, emerald: string, teal: string, mint: string, deep: string) {
    const size = 256;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    // Graded rather than one flat band: a shallow wave face catches the deep
    // teal, a steeper one the emerald, and only the sharpest crest reaches the
    // pale mint. That spread is what gives the highlight somewhere to travel.
    const gradient = ctx.createLinearGradient(0, 0, 0, size);
    gradient.addColorStop(0, sky);
    gradient.addColorStop(0.33, sky);
    gradient.addColorStop(0.42, teal);
    gradient.addColorStop(0.5, emerald);
    gradient.addColorStop(0.55, mint);
    gradient.addColorStop(0.61, emerald);
    gradient.addColorStop(0.68, deep);
    gradient.addColorStop(0.82, sky);
    gradient.addColorStop(1, sky);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);

    return canvas.toDataURL('image/png');
}

/** Mixes two `rgb(r, g, b)` strings, `t` of the way from a to b. */
function mixRgb(a: string, b: string, t: number) {
    const pa = a.match(/\d+(\.\d+)?/g);
    const pb = b.match(/\d+(\.\d+)?/g);
    if (!pa || !pb || pa.length < 3 || pb.length < 3) return a;
    const channel = (i: number) => {
        const value = Number(pa[i]) + (Number(pb[i]) - Number(pa[i])) * t;
        return Math.max(0, Math.min(255, Math.round(value)));
    };
    return `rgb(${channel(0)}, ${channel(1)}, ${channel(2)})`;
}

/** Scales an `rgb(r, g, b)` string by a factor, clamped to 0-255. */
function scaleRgb(colour: string, factor: number) {
    const parts = colour.match(/\d+(\.\d+)?/g);
    if (!parts || parts.length < 3) return colour;
    const [r, g, b] = parts.slice(0, 3).map((value) => {
        return Math.max(0, Math.min(255, Math.round(Number(value) * factor)));
    });
    return `rgb(${r}, ${g}, ${b})`;
}

export function LiquidEffectAnimation({
    rippleRadius = 0.007,
    rippleStrength = 0.055,
    step = 12,
    maxSteps = 12,
    minBite = 0.45,
    maxBite = 1.8,
    attenuation = 0.985,
    metalness = 0.92,
    roughness = 0.22,
    envIntensity = 1.0,
    lightIntensityScale = 0.55,
    displacementScale = 2,
    className,
}: Props) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const appRef = useRef<LiquidApp | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        let disposed = false;
        let observer: MutationObserver | null = null;
        let onPointerMove: ((event: PointerEvent) => void) | null = null;
        let onPointerDown: ((event: PointerEvent) => void) | null = null;

        const dressSurface = async (app: LiquidApp) => {
            const background = resolveColor('hsl(var(--background))', 'rgb(10, 10, 10)');
            const emerald = resolveColor('hsl(var(--primary))', 'rgb(16, 185, 129)');
            const isDark = document.documentElement.classList.contains('dark');

            // Dark page: the surface sits at the page colour and the ripples
            // add emerald. Pale page: the surface is dimmed and the sky is lit,
            // so flat water lands back on the page colour and the ripples read
            // as the darker green instead.
            const emissive = isDark ? background : scaleRgb(background, 0.8);
            const sky = isDark ? background : 'rgb(255, 255, 255)';
            const deep = isDark ? resolveColor('hsl(var(--primary) / 0.35)', emerald) : emerald;
            const teal = mixRgb(emerald, 'rgb(4, 58, 72)', isDark ? 0.5 : 0.35);
            const mint = mixRgb(emerald, 'rgb(214, 255, 238)', isDark ? 0.5 : 0.3);

            // The same reflection carries further on a pale ground, so it is pulled
            // back to keep both themes about equally quiet.
            app.liquidPlane.material.envMapIntensity = isDark
                ? envIntensity
                : envIntensity * lightIntensityScale;

            const surface = surfaceTexture(background);
            const environment = envTexture(sky, emerald, teal, mint, deep);
            if (!surface || !environment || disposed) return;

            // Emissive carries the ground colour, so still water matches the
            // page exactly however the lighting lands.
            app.liquidPlane.material.emissive.setStyle(emissive);
            app.liquidPlane.material.emissiveIntensity = 1;
            app.liquidPlane.material.needsUpdate = true;

            await app.loadImage(surface);
            if (disposed) return;
            await app.loadEnvMap(environment);
        };

        import('threejs-components/build/backgrounds/liquid1.min.js')
            .then(async ({ default: LiquidBackground }) => {
                if (disposed) return;

                const app = LiquidBackground(canvas);
                appRef.current = app;
                if (process.env.NODE_ENV === 'development') {
                    (window as unknown as { __liquidApp?: LiquidApp }).__liquidApp = app;
                }

                // No ambient raindrops — the cursor is the only thing that
                // disturbs this surface.
                app.setRain(false);

                // The library also drips on every single pointer event, which
                // at this attenuation piles up into a full-screen swell. Those
                // are filtered out by their fixed radius so the only ripples
                // left are the spaced ones below.
                const addDrop = app.liquidPlane.addDrop.bind(app.liquidPlane);
                app.liquidPlane.addDrop = (x, y, radius, strength) => {
                    if (radius === LIBRARY_DRIP_RADIUS) return;
                    addDrop(x, y, radius, strength);
                };

                app.liquidPlane.attenuation = attenuation;
                app.liquidPlane.uniforms.displacementScale.value = displacementScale;
                app.liquidPlane.material.metalness = metalness;
                app.liquidPlane.material.roughness = roughness;
                app.liquidPlane.material.envMapIntensity = envIntensity;

                await dressSurface(app);
                if (disposed) return;

                let lastX: number | null = null;
                let lastY: number | null = null;
                let lastTime = 0;

                const touch = (clientX: number, clientY: number, strength: number) => {
                    // Measured against the canvas, not the window: innerWidth includes
                    // the scrollbar, which would drift the ripple off the cursor.
                    const rect = canvas.getBoundingClientRect();
                    const x = ((clientX - rect.left) / rect.width) * 2 - 1;
                    const y = -((clientY - rect.top) / rect.height) * 2 + 1;
                    addDrop(x, y, rippleRadius, strength);
                };

                onPointerMove = (event: PointerEvent) => {
                    if (event.pointerType === 'touch') return;
                    if (lastX === null || lastY === null) {
                        lastX = event.clientX;
                        lastY = event.clientY;
                        lastTime = event.timeStamp;
                        return;
                    }

                    const dx = event.clientX - lastX;
                    const dy = event.clientY - lastY;
                    const distance = Math.hypot(dx, dy);
                    if (distance < step) return;

                    // A finger through water disturbs every point it passes, so
                    // the gap since the last event gets filled in rather than
                    // dropping one ring wherever the pointer happened to land.
                    // Water displaces more the faster you drag through it, so
                    // each touch is weighted by cursor speed in px/ms. A slow
                    // drift barely dents the surface; a quick sweep bites.
                    const elapsed = Math.max(event.timeStamp - lastTime, 1);
                    const speed = distance / elapsed;
                    const bite = Math.max(minBite, Math.min(0.45 + speed * 0.75, maxBite));

                    const steps = Math.min(Math.floor(distance / step), maxSteps);
                    for (let i = 1; i <= steps; i++) {
                        const t = i / steps;
                        touch(lastX + dx * t, lastY + dy * t, rippleStrength * bite);
                    }

                    lastX = event.clientX;
                    lastY = event.clientY;
                    lastTime = event.timeStamp;
                };

                onPointerDown = (event: PointerEvent) => {
                    touch(event.clientX, event.clientY, rippleStrength * 6);
                };

                window.addEventListener('pointermove', onPointerMove, { passive: true });
                window.addEventListener('pointerdown', onPointerDown, { passive: true });

                // Re-dress when the theme flips.
                observer = new MutationObserver(() => void dressSurface(app));
                observer.observe(document.documentElement, {
                    attributes: true,
                    attributeFilter: ['class'],
                });
            })
            .catch((error) => {
                console.error('[liquid] failed to load background:', error);
            });

        return () => {
            disposed = true;
            observer?.disconnect();
            if (onPointerMove) window.removeEventListener('pointermove', onPointerMove);
            if (onPointerDown) window.removeEventListener('pointerdown', onPointerDown);
            appRef.current?.dispose();
            appRef.current = null;
        };
    }, [
        rippleRadius,
        rippleStrength,
        step,
        maxSteps,
        minBite,
        maxBite,
        attenuation,
        metalness,
        roughness,
        envIntensity,
        lightIntensityScale,
        displacementScale,
    ]);

    return (
        <div
            aria-hidden
            className={className ?? 'pointer-events-none fixed inset-0 z-0 m-0 h-full w-full touch-none overflow-hidden'}
        >
            <canvas ref={canvasRef} id="liquid-canvas" className="h-full w-full" />
        </div>
    );
}

export default LiquidEffectAnimation;
