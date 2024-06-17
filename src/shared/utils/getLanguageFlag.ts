import { Language } from "@shared/i18n";

const langToCountry = {
    pt: "br",
    en: "us",
};

function getLanguageFlag(language: Language) {
    const country = langToCountry[language];
    return `https://flagcdn.com/w20/${country.toLowerCase()}.png`;
}

export { getLanguageFlag };
export default getLanguageFlag;
