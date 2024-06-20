"use client";

import React from "react";
import { Divider } from "@mui/material";
import { useAuth } from "@client/providers";
import { Avatar, LanguageSelector } from "@client/components";
import styles from "./styles.module.scss";

function AppBar() {
    const { user } = useAuth();

    return (
        <header className={styles.AppBar}>
            <div className={styles.AppBarLeft} />
            <div className={styles.AppBarMiddle} />
            <div className={styles.AppBarRight}>
                {user?.id && (
                    <div className={styles.AppBarUser}>
                        <Avatar user={user} />
                        <span>{user.name}</span>
                    </div>
                )}
                <Divider orientation="vertical" />
                <LanguageSelector />
            </div>
        </header>
    );
}

export default AppBar;
export { AppBar };
