"use client";

import React, { useMemo } from "react";

import { useI18n, useTheme } from "@client/providers";
import { I18nLink, Input, Button } from "@client/components/ui";
import { PublicPage } from "@client/components/layout";

import { onEnterPress } from "@shared/utils";

import { useForgotPassword } from "./_providers";

import ForgotPasswordIllustrationLight from "@client/assets/images/auth/v2-forgot-password-light.png";
import ForgotPasswordIllustrationDark from "@client/assets/images/auth/v2-forgot-password-dark.png";

import styles from "./page.module.scss";

function ForgotPassword() {
    const { t } = useI18n();
    const { theme } = useTheme();
    const { email, setEmail, handleSendPasswordRecovery } = useForgotPassword();

    const ForgotPasswordIllustration = useMemo(() => {
        return theme === "light"
            ? ForgotPasswordIllustrationLight
            : ForgotPasswordIllustrationDark;
    }, [theme]);

    return (
        <PublicPage
            illustration={{
                className: styles.ForgotPasswordIllustration,
                src: ForgotPasswordIllustration,
                alt: t("Ilustração esqueci minha senha"),
            }}
        >
            <form className={styles.ForgotPasswordForm}>
                <header className={styles.ForgotPasswordFormHeader}>
                    <h1 className={styles.ForgotPasswordFormTitle}>
                        {t("Esqueceu sua senha")} 🔒
                    </h1>
                    <h2 className={styles.ForgotPasswordFormSubtitle}>
                        {t(
                            "Digite seu e-mail e enviaremos instruções para redefinir sua senha"
                        )}
                    </h2>
                </header>
                <div className={styles.ForgotPasswordFormBody}>
                    <Input
                        fullWidth
                        label={t("Endereço de email")}
                        placeholder={t("Digite seu email")}
                        onChange={(evt) => setEmail(evt.target.value)}
                        onEnter={onEnterPress(handleSendPasswordRecovery)}
                        value={email}
                    />
                    <Button
                        fullWidth
                        onClick={handleSendPasswordRecovery}
                        variant="contained"
                        color="highlight"
                        tone="50"
                    >
                        {t("Enviar link de redefinição")}
                    </Button>
                </div>
                <footer className={styles.ForgotPasswordFormFooter}>
                    <I18nLink href="/login">
                        {"< "}
                        {t("Voltar para a tela de login")}
                    </I18nLink>
                </footer>
            </form>
        </PublicPage>
    );
}

export default ForgotPassword;
