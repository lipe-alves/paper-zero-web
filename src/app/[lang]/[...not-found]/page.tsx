"use client";

import React from "react";
import Image from "next/image";

import { useTheme, useI18n, useNavigation } from "@client/providers";
import { Button } from "@client/components/ui";

import BackgroundIllustrationDark from "@client/assets/images/auth/auth-mask-dark.png";
import BackgroundIllustrationLight from "@client/assets/images/auth/auth-mask-light.png";
import ScaredGirl from "@client/assets/images/illustrations/characters/1.png";

import styles from "./page.module.scss";

function NotFound() {
    const { navigate } = useNavigation();
    const { theme } = useTheme();
    const { t } = useI18n();

    const BackgroundIllustration =
        theme === "light"
            ? BackgroundIllustrationLight
            : BackgroundIllustrationDark;

    return (
        <main className={styles.NotFound}>
            <div className={styles.NotFoundMessage}>
                <h1 className={styles.NotFoundTitle}>404</h1>
                <h2 className={styles.NotFoundSubtitle}>
                    {t("Página não encontrada")} ⚠️
                </h2>
                <p className={styles.NotFoundDescription}>
                    {t(
                        "Não conseguimos encontrar a página que você está procurando."
                    )}
                </p>
                <Button
                    onClick={() => navigate("/")}
                    variant="contained"
                    color="highlight"
                    tone="50"
                >
                    {t("Voltar ao início")}
                </Button>
            </div>

            <Image
                className={styles.NotFoundScaredGirl}
                src={ScaredGirl}
                alt={t("Menina assustada")}
            />
            <Image
                className={styles.NotFoundBackground}
                src={BackgroundIllustration}
                alt={t("Fundo")}
            />
        </main>
    );
}

export default NotFound;
