declare module 'threejs-components/build/backgrounds/liquid1.min.js' {
    /** Minimal surface of the parts this project drives. */
    export type LiquidApp = {
        three: { renderer: unknown };
        liquidPlane: {
            uniforms: { displacementScale: { value: number } };
            material: {
                metalness: number;
                roughness: number;
                envMapIntensity: number;
                emissiveIntensity: number;
                emissive: { setStyle: (style: string) => void };
                needsUpdate: boolean;
            };
            attenuation: number;
            addDrop: (x: number, y: number, radius: number, strength: number) => void;
        };
        loadImage: (url: string | null) => Promise<void>;
        loadEnvMap: (url: string | null) => Promise<void>;
        setRain: (enabled: boolean) => void;
        setRainTime: (seconds: number) => void;
        dispose: () => void;
    };

    export default function LiquidBackground(canvas: HTMLCanvasElement): LiquidApp;
}
