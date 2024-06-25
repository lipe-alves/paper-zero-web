"use client";

import React, { ReactNode } from "react";
import Image, { StaticImageData } from "next/image";

import { useTheme, useI18n } from "@client/providers";
import { Logo, LanguageSelector } from "@client/components/ui";
import { classNames } from "@shared/utils";

import BackgroundIllustrationDark from "@client/assets/images/auth/auth-mask-dark.png";
import BackgroundIllustrationLight from "@client/assets/images/auth/auth-mask-light.png";

import styles from "./styles.module.scss";

interface PublicPageProps {
    illustration: {
        className?: string;
        src: string | StaticImageData;
        alt: string;
    };
    children: ReactNode;
}

function PublicPage(props: PublicPageProps) {
    const { children, illustration } = props;
    const { theme } = useTheme();
    const { t } = useI18n();

    const BackgroundIllustration =
        theme === "light"
            ? BackgroundIllustrationLight
            : BackgroundIllustrationDark;

    return (
        <main className={styles.Public}>
            <div className={styles.PublicLogo}>
                <Logo />
            </div>
            <div className={styles.PublicLang}>
                <LanguageSelector />
            </div>
            <figure className={styles.PublicIllustration}>
                <Image
                    className={classNames(
                        styles.PublicIllustrationCustom,
                        illustration.className || ""
                    )}
                    src={illustration.src}
                    alt={illustration.alt}
                />
                <Image
                    className={styles.PublicIllustrationBackground}
                    src={BackgroundIllustration}
                    alt={t("Fundo")}
                />
            </figure>
            <aside className={styles.PublicAside}>{children}</aside>
        </main>
    );
}

export default PublicPage;
export { PublicPage };
export type { PublicPageProps };
