"use client";

import React from "react";
import { IconButton } from "@mui/material";

import { LanguageSelector } from "@client/components";
import { useNavigation } from "@client/providers";

import { Home } from "styled-icons/entypo";

import styles from "./styles.module.scss";

function Header() {
    const { navigate } = useNavigation();

    const handleGoToHome = () => {
        navigate("/");
    };

    return (
        <header className={styles.Header}>
            <div className={styles.HeaderLeft}>
                <IconButton
                    className={styles.HeaderGoBack}
                    onClick={handleGoToHome}
                >
                    <Home />
                </IconButton>
            </div>
            <div className={styles.HeaderRight}>
                <LanguageSelector />
            </div>
        </header>
    );
}

export default Header;
export { Header };
