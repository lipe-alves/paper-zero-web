"use client";

import { useState, MouseEvent } from "react";
import { MenuItem, ClickAwayListener, Tooltip } from "@mui/material";

import { useI18n } from "@client/providers";
import { IconButton, Menu } from "@client/components/ui";

import { Language, languageList } from "@shared/i18n";
import { getLanguageFlag } from "@shared/utils";

import { Language as LanguageIcon } from "styled-icons/ionicons-outline";

import styles from "./styles.module.scss";

function LanguageSelector() {
    const { lang: selectedLang, t, setLanguage } = useI18n();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleToggleMenu = (evt: MouseEvent<HTMLElement>) => {
        setAnchorEl(open ? null : evt.currentTarget);
    };

    const handleChangeLanguage = (newLang: Language) => () => {
        setLanguage(newLang);
        handleCloseMenu();
    };

    const languageOptions = languageList.map((lang) => ({
        label: t(lang),
        className: styles.LanguageSelectorOption,
        value: lang,
        selected: selectedLang === lang,
        disabled: selectedLang === lang,
        icon: (
            <img
                src={getLanguageFlag(lang)}
                alt={lang}
            />
        ),
    }));

    const selectedOption = languageOptions.find((option) => option.selected);

    return (
        <>
            <ClickAwayListener onClickAway={handleCloseMenu}>
                <Tooltip title={selectedOption?.label}>
                    <IconButton
                        className={styles.LanguageSelector}
                        onClick={handleToggleMenu}
                    >
                        <LanguageIcon />
                    </IconButton>
                </Tooltip>
            </ClickAwayListener>
            <Menu
                anchorEl={anchorEl}
                open={open}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
                {languageOptions.map((option) => (
                    <MenuItem
                        key={option.value}
                        className={option.className}
                        onClick={handleChangeLanguage(option.value)}
                        disabled={option.disabled}
                    >
                        {option.icon}
                        <span>{option.label}</span>
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
}

export default LanguageSelector;
export { LanguageSelector };
