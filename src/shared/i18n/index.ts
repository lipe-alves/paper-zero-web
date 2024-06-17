import { i18nConfig } from "./config";
import pt from "./dictionaries/pt.json";
import en from "./dictionaries/en.json";

type ReplaceMatrix = string[] | { [key: string]: string };
type Language = (typeof i18nConfig)["languages"][number];

interface Dictionary {
    [key: string]: string | undefined;
}

const dictionaries = {
    pt,
    en,
};

const languageList = [...i18nConfig.languages];

function getDictionary(lang: Language): Dictionary {
    return dictionaries[lang] || dictionaries[i18nConfig.defaultLanguage];
}

function translate(
    lang: Language,
    text: string,
    replaceMatrix?: ReplaceMatrix
): string {
    const dictionary = getDictionary(lang);
    let message = dictionary[text] || text;

    if (replaceMatrix instanceof Array && typeof message === "string") {
        for (let i = 0; i < replaceMatrix.length; i++) {
            const value = replaceMatrix[i];
            message = message.replace("@", value);
        }
    }

    if (
        typeof replaceMatrix === "object" &&
        !(replaceMatrix instanceof Array) &&
        typeof message === "string"
    ) {
        for (const [key, value] of Object.entries(replaceMatrix)) {
            const pattern = new RegExp(`@${key}`, "g");
            message = message.replace(pattern, value);
        }
    }

    return message;
}

export { i18nConfig, getDictionary, translate, languageList };
export type { ReplaceMatrix, Language, Dictionary };
