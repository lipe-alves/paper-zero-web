"use client";

import React from "react";

import { LanguageSelector, Logo, I18nLink } from "@client/components";
import { useI18n, useNavigation } from "@client/providers";

import styles from "./styles.module.scss";

function Header() {
    const { t } = useI18n();
    const { isCurrentRoute } = useNavigation();

    const navButtons = [
        {
            key: "home",
            path: "",
            label: "Início",
        },
        {
            key: "about",
            path: "/about",
            label: "Sobre nós",
        },
    ];

    return (
        <header className={styles.Header}>
            <div className={styles.HeaderLeft}>
                <Logo />
            </div>
            <div className={styles.HeaderRight}>
                <ul className={styles.HeaderNav}>
                    {navButtons.map((navButton) => (
                        <li
                            key={navButton.key}
                            className={styles.HeaderNavLink}
                            data-active={isCurrentRoute(navButton.path)}
                        >
                            <I18nLink href={navButton.path}>
                                {t(navButton.label)}
                            </I18nLink>
                        </li>
                    ))}
                </ul>
                <LanguageSelector />
            </div>
        </header>
    );
}

export default Header;
export { Header };
