import type { Theme, ThemeColors, ThemeName } from "../types/themes";

export { type Theme, type ThemeName, type ThemeColors };

export const THEMES: Record<string, Theme> = {
    light_default: {
        background: "#ffffff",
        foreground: "#1a1a1a",
        accent: "#1d4e89",
        muted: "#5c5c5c",
        border: "#e5e5e5",
        surface: "#f6f6f6",
        isDark: false,
    },
    dark_default: {
        background: "#161616",
        foreground: "#f2f2f2",
        accent: "#8cb4e0",
        muted: "#a3a3a3",
        border: "#2e2e2e",
        surface: "#1f1f1f",
        isDark: true,
    },
    light_notepad: {
        isDark: false,
        background: "#ffffff",
        surface: "#f6f6f6",
        foreground: "#1a1a1a",
        muted: "#5c5c5c",
        border: "#e5e5e5",
        accent: "#1d4e89",
    },
    dark_notepad: {
        isDark: true,
        background: "#161616",
        surface: "#1f1f1f",
        foreground: "#f2f2f2",
        muted: "#a3a3a3",
        border: "#2e2e2e",
        accent: "#8cb4e0",
    },
};
