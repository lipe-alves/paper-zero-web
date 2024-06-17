"use client";

import React from "react";
import Link from "next/link";

import { useI18n } from "@client/providers";
import { CalligraphyPen } from "styled-icons/fluentui-system-regular";

import styles from "./styles.module.scss";

function Logo() {
    const { lang } = useI18n();

    return (
        <Link
            className={styles.Logo}
            href={`/${lang}/`}
        >
            <CalligraphyPen className={styles.LogoIcon} />
            <span className={styles.LogoText}>PaperZero</span>
        </Link>
    );
}

export default Logo;
export { Logo };
