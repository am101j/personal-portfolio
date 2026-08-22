'use client';

import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { Container, ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { useTheme } from "next-themes";

export function ParticleBackground() {
  const [init, setInit] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  const isLight = mounted && resolvedTheme === "light";

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log(container);
  };

  const options: ISourceOptions = useMemo(
    () => ({
      background: {
        color: {
          value: "transparent",
        },
      },
      fpsLimit: 60,
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: "repulse",
          },
        },
        modes: {
          repulse: {
            distance: 150,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: isLight
            ? // Light: deepened teal / burnt orange / dark slate so dots read
              // as darker-than-background marks instead of washing out.
              ["#0d8577", "#0d8577", "#0d8577", "#c2540a", "#334155", "#334155"]
            : ["#14c9b8", "#14c9b8", "#14c9b8", "#fc6e0a", "#ffffff", "#ffffff"],
        },
        links: {
          // Dark: faint white lines on black. Light: faint dark-slate lines.
          color: isLight ? "#475569" : "#ffffff",
          distance: 150,
          enable: true,
          opacity: isLight ? 0.28 : 0.5,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: true,
          speed: 2,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            area: 800,
          },
          value: 150,
        },
        opacity: {
          value: isLight ? 0.5 : 0.6,
        },
        shape: {
          type: 'circle',
        },
        size: {
          value: { min: 1, max: 3 },
        },
      },
      detectRetina: true,
    }),
    [isLight],
  );

  // Wait for next-themes to resolve before painting, so we never flash the
  // wrong palette. `key` forces a full re-init when the theme flips.
  if (init && mounted) {
    return (
      <Particles
        key={isLight ? "light" : "dark"}
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
        className="absolute inset-0 z-0"
      />
    );
  }

  return null;
};
