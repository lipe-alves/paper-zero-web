"use client";

import React from "react";

import { useI18n, useTheme } from "@client/providers";
import { I18nLink, Button } from "@client/components/ui";
import { PublicPage } from "@client/components/layout";

import { useVerifyEmail } from "./_providers";

import VerifyEmailIllustrationLight from "@client/assets/images/auth/v2-verify-email-light.png";
import VerifyEmailIllustrationDark from "@client/assets/images/auth/v2-verify-email-dark.png";

import styles from "./page.module.scss";

function VerifyEmail() {
    const { t } = useI18n();
    const { theme } = useTheme();
    const { userEmail, handleSkipEmailVerification } = useVerifyEmail();

    const VerifyEmailIllustration =
        theme === "light"
            ? VerifyEmailIllustrationLight
            : VerifyEmailIllustrationDark;

    return (
        <PublicPage
            illustration={{
                className: styles.VerifyEmailIllustration,
                src: VerifyEmailIllustration,
                alt: t("Ilustração verificação de email"),
            }}
        >
            <form className={styles.VerifyEmailForm}>
                <header className={styles.VerifyEmailFormHeader}>
                    <h1 className={styles.VerifyEmailFormTitle}>
                        {t("Verifique seu email")} ✉️
                    </h1>
                    <h2 className={styles.VerifyEmailFormSubtitle}>
                        {t("Link de ativação da conta enviado para seu email:")}{" "}
                        <strong>{userEmail}</strong>
                        <br />
                        {t("Por favor, siga o link enviado para continuar.")}
                    </h2>
                </header>
                <div className={styles.VerifyEmailFormBody}>
                    <Button
                        fullWidth
                        onClick={handleSkipEmailVerification}
                        variant="contained"
                        color="highlight"
                        tone="50"
                    >
                        {t("Pular por enquanto")}
                    </Button>
                </div>
                <footer className={styles.VerifyEmailFormFooter}>
                    <p className={styles.VerifyEmailFormParagraph}>
                        {t("Não recebeu o email?")}{" "}
                        <I18nLink href="/login">{t("Reenviar")}</I18nLink>
                    </p>
                </footer>
            </form>
        </PublicPage>
    );
}

export default VerifyEmail;
