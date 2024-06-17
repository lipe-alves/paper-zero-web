"use client";

import React, { createContext, useContext } from "react";
import { usePathname, useRouter } from "next/navigation";

import { ContextProviderProps } from "@shared/types";
import {
    Dictionary,
    Language,
    ReplaceMatrix,
    getDictionary,
    translate,
} from "@shared/i18n";

interface I18nValue {
    lang: Language;
    dictionary: Dictionary;
    t: (text: string, replaceMatrix?: ReplaceMatrix) => string;
    setLanguage: (lang: Language) => void;
}

interface I18nProviderProps extends ContextProviderProps {
    lang: Language;
}

const I18nContext = createContext<I18nValue | undefined>(undefined);

function I18nProvider(props: I18nProviderProps) {
    const { lang, children } = props;

    const router = useRouter();
    const currentRoute = usePathname();
    const dictionary = getDictionary(lang);

    const t = (text: string, replaceMatrix?: ReplaceMatrix) => {
        return translate(lang, text, replaceMatrix);
    };

    const setLanguage = (newLang: Language) => {
        const oldLang = lang;
        if (oldLang === newLang) return;

        const oldRoute = currentRoute;
        const newRoute = oldRoute.replace(oldLang, newLang);

        router.push(newRoute);
    };

    return (
        <I18nContext.Provider
            value={{
                lang: lang,
                dictionary,
                t,
                setLanguage,
            }}
        >
            {children}
        </I18nContext.Provider>
    );
}

function useI18n() {
    const context = useContext(I18nContext);

    if (!context) {
        throw new Error("useI18n must be used within a I18nProvider");
    }

    return context;
}

export { I18nContext, I18nProvider, useI18n };
export type { I18nValue };
