"use client";

import { Select, MenuItem, SelectChangeEvent } from "@mui/material";

import { useI18n } from "@client/providers";
import { Language, languageList } from "@shared/i18n";
import { getLanguageFlag } from "@shared/utils";

import styles from "./styles.module.scss";

function LanguageSelector() {
    const { lang: selectedLang, t, setLanguage } = useI18n();

    const handleChangeLanguage = (evt: SelectChangeEvent<Language>) => {
        setLanguage(evt.target.value as Language);
    };

    const languageOptions = languageList.map((lang) => ({
        label: t(lang),
        className: styles.LanguageSelectorOption,
        value: lang,
        disabled: selectedLang === lang,
        icon: (
            <img
                src={getLanguageFlag(lang)}
                alt={lang}
            />
        ),
    }));

    return (
        <Select
            className={styles.LanguageSelector}
            onChange={handleChangeLanguage}
            value={selectedLang}
        >
            {languageOptions.map((option) => (
                <MenuItem
                    key={option.value}
                    className={option.className}
                    value={option.value}
                    disabled={option.disabled}
                >
                    {option.icon}
                    <span>{option.label}</span>
                </MenuItem>
            ))}
        </Select>
    );
}

export default LanguageSelector;
export { LanguageSelector };
