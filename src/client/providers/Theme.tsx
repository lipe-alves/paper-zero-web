"use client";

import { createContext, useContext, useState, useEffect } from "react";

import { ContextProviderProps, Theme } from "@client/types";
import { THEME_LOCAL_STORAGE_KEY, THEME_LIST } from "@client/constants";

interface ThemeValue {
    theme: Theme;
    setTheme: (newTheme: Theme) => void;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeValue | undefined>(undefined);

function ThemeProvider(props: ContextProviderProps) {
    const { children } = props;
    const [theme, setTheme] = useState<Theme>(getLocalTheme());

    const toggleTheme = () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    };

    useEffect(() => {
        document.body.dataset.theme = theme;
        localStorage.setItem(THEME_LOCAL_STORAGE_KEY, theme);
    }, [theme]);

    return (
        <ThemeContext.Provider
            value={{
                theme,
                setTheme,
                toggleTheme,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
}

function useTheme() {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider!");
    }

    return context;
}

export { ThemeContext, ThemeProvider, useTheme };
export type { ThemeValue };

function getLocalTheme(): Theme {
    const localStorageTheme = getLocalStorageTheme();
    const browserTheme = getBrowserTheme();
    const defaultTheme = "light";
    return localStorageTheme || browserTheme || defaultTheme;
}

function getBrowserTheme(): Theme | undefined {
    if (
        typeof window !== "undefined" &&
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
        return "dark";
    }

    if (
        typeof window !== "undefined" &&
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: light)").matches
    ) {
        return "dark";
    }

    return undefined;
}

function getLocalStorageTheme(): Theme | undefined {
    if (typeof localStorage === "undefined") {
        return undefined;
    }

    const localStorageTheme = THEME_LIST.find(
        (theme) => theme === localStorage.getItem(THEME_LOCAL_STORAGE_KEY)
    );

    return localStorageTheme;
}
