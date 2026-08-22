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

    const toggle = React.useCallback(() => {
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

        // The wave radiates from the button, so it has to reach the furthest corner.
        const rect = button.getBoundingClientRect()
        const x = rect.left + rect.width / 2
        const y = rect.top + rect.height / 2
        const radius = Math.hypot(
            Math.max(x, window.innerWidth - x),
            Math.max(y, window.innerHeight - y)
        )

        root.style.setProperty("--wave-x", `${x}px`)
        root.style.setProperty("--wave-y", `${y}px`)
        root.style.setProperty("--wave-r", `${radius}px`)
        root.classList.add("theme-wave")

        // Named only for the duration of the transition — two live elements sharing a
        // view-transition-name aborts the whole animation, and the header renders a
        // desktop and a mobile toggle.
        button.style.viewTransitionName = "theme-toggle"

        const transition = doc.startViewTransition(applyTheme)
        transition.finished.finally(() => {
            root.classList.remove("theme-wave")
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
