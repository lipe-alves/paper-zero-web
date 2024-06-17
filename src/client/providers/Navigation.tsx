"use client";

import React, { createContext, useContext } from "react";
import { usePathname, useRouter } from "next/navigation";

import { useI18n } from "./I18n";
import { ContextProviderProps } from "@shared/types";
import { Language } from "@shared/i18n";

interface NavigationOptions {
    lang?: Language;
}

interface NavigationValue {
    navigate: (path: string, options?: NavigationOptions) => void;
    isCurrentRoute: (path: string) => boolean;
}

const NavigationContext = createContext<NavigationValue | undefined>(undefined);

function NavigationProvider(props: ContextProviderProps) {
    const { children } = props;
    const { lang: selectedLang } = useI18n();

    const router = useRouter();
    const currentRoute = usePathname();

    const navigate = (path: string, options: NavigationOptions = {}) => {
        const { lang = selectedLang } = options;
        router.push(`/${lang}/${path.replace(/^\//, "")}`);
    };

    const isCurrentRoute = (path: string) => {
        path = path.replace(`/${selectedLang}`, "");
        const currentPath = currentRoute.replace(`/${selectedLang}`, "");
        return path === currentPath;
    };

    return (
        <NavigationContext.Provider
            value={{
                navigate,
                isCurrentRoute,
            }}
        >
            {children}
        </NavigationContext.Provider>
    );
}

function useNavigation() {
    const context = useContext(NavigationContext);

    if (!context) {
        throw new Error(
            "useNavigation must be used within a NavigationProvider"
        );
    }

    return context;
}

export { NavigationContext, NavigationProvider, useNavigation };
export type { NavigationValue };
