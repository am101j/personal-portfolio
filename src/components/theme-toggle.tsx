"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

type ViewTransitionDocument = Document & {
    startViewTransition?: (callback: () => void) => { finished: Promise<void> }
}

const WAVE_MS = 600

export function ThemeToggle() {
    const { setTheme, resolvedTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)
    const buttonRef = React.useRef<HTMLButtonElement>(null)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    const isDark = resolvedTheme === "dark"

    const toggle = React.useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        const root = document.documentElement
        const next = isDark ? "light" : "dark"
        const button = buttonRef.current
        const doc = document as ViewTransitionDocument
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

        // Swap the class ourselves so the View Transition snapshot is taken against
        // the final DOM; next-themes then persists the choice to storage.
        const applyTheme = () => {
            root.classList.remove(isDark ? "dark" : "light")
            root.classList.add(next)
            root.style.colorScheme = next
            setTheme(next)
        }

        if (reducedMotion || typeof doc.startViewTransition !== "function" || !button) {
            // No View Transitions (or the user opted out of motion): fall back to a
            // plain colour cross-fade driven by a temporary class on <html>.
            if (!reducedMotion) {
                root.classList.add("theme-transition")
                window.setTimeout(() => root.classList.remove("theme-transition"), WAVE_MS)
            }
            applyTheme()
            return
        }

        // The wave starts under the pointer, falling back to the middle of the button
        // when the toggle was reached by keyboard (where the click reports 0, 0).
        const rect = button.getBoundingClientRect()
        const pointed = event.clientX !== 0 || event.clientY !== 0
        const x = pointed ? event.clientX : rect.left + rect.width / 2
        const y = pointed ? event.clientY : rect.top + rect.height / 2
        const radius = Math.hypot(
            Math.max(x, window.innerWidth - x),
            Math.max(y, window.innerHeight - y)
        )

        // A data attribute, not a class: next-themes rewrites the class attribute
        // wholesale when the theme is set, which would drop the flag mid-animation and
        // leave the browser to fall back on its default cross-fade.
        root.dataset.themeWave = "1"

        // Named only for the duration of the transition — two live elements sharing a
        // view-transition-name aborts the whole animation, and the header renders a
        // desktop and a mobile toggle.
        button.style.viewTransitionName = "theme-toggle"

        const transition = doc.startViewTransition(applyTheme)

        // The circle is animated from here rather than from a CSS keyframe reading
        // custom properties. The ::view-transition pseudo-elements live in their own
        // tree, and relying on a var to reach them is what left the wipe opening from
        // the middle of the page instead of from the pointer.
        transition.ready
            .then(() => {
                root.animate(
                    {
                        clipPath: [
                            `circle(0px at ${x}px ${y}px)`,
                            `circle(${radius}px at ${x}px ${y}px)`,
                        ],
                    },
                    {
                        duration: WAVE_MS,
                        easing: "cubic-bezier(0.33, 0, 0.2, 1)",
                        fill: "forwards",
                        pseudoElement: "::view-transition-new(root)",
                    },
                )
            })
            .catch(() => { /* transition skipped; the theme still switched */ })

        transition.finished.finally(() => {
            delete root.dataset.themeWave
            button.style.viewTransitionName = ""
        })
    }, [isDark, setTheme])

    if (!mounted) {
        return (
            <button
                className="relative w-9 h-9 flex items-center justify-center text-muted-foreground"
                aria-label="Toggle theme"
            >
                <Sun className="h-[1.2rem] w-[1.2rem] opacity-0" />
            </button>
        )
    }

    return (
        <button
            ref={buttonRef}
            onClick={toggle}
            className="relative w-9 h-9 flex items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
            aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
            title={`Switch to ${isDark ? "light" : "dark"} mode`}
        >
            {/* Clipped well so the icons slide out of view rather than overflowing. */}
            <span className="relative block h-[1.2rem] w-[1.2rem] overflow-hidden">
                <Sun
                    className={`absolute inset-0 h-[1.2rem] w-[1.2rem] transition-all duration-300 ease-in-out ${
                        isDark ? "translate-y-full opacity-0" : "translate-y-0 opacity-100"
                    }`}
                />
                <Moon
                    className={`absolute inset-0 h-[1.2rem] w-[1.2rem] transition-all duration-300 ease-in-out ${
                        isDark ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
                    }`}
                />
            </span>
        </button>
    )
}
