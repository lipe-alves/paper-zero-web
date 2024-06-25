"use client";

import React from "react";

import { useI18n, useTheme } from "@client/providers";
import { I18nLink, Input, Button } from "@client/components/ui";
import { PublicPage } from "@client/components/layout";

import {
    onEnterPress,
    passwordValidationRules,
    passwordRuleToLabel,
} from "@shared/utils";

import { useResetPassword } from "./_providers";

import ResetPasswordIllustrationLight from "@client/assets/images/auth/v2-reset-password-light.png";
import ResetPasswordIllustrationDark from "@client/assets/images/auth/v2-reset-password-dark.png";

import styles from "./page.module.scss";

function ResetPassword() {
    const { t } = useI18n();
    const { theme } = useTheme();
    const {
        password,
        confirmPassword,
        setPassword,
        setConfirmPassword,
        confirmPasswordIsValid,
        handleResetPassword,
    } = useResetPassword();

    const ResetPasswordIllustration =
        theme === "light"
            ? ResetPasswordIllustrationLight
            : ResetPasswordIllustrationDark;

    const passwordRuleEntries = Object.entries(passwordValidationRules) as [
        key: keyof typeof passwordValidationRules,
        validate: (value: string) => boolean
    ][];

    const passwordRulesToItems = passwordRuleEntries.map(([key, validate]) => ({
        key,
        label: passwordRuleToLabel(t, key),
        isValid: validate(password),
    }));

    const passwordError =
        passwordRulesToItems.find((item) => !item.isValid)?.label || "";

    return (
        <PublicPage
            illustration={{
                className: styles.ResetPasswordIllustration,
                src: ResetPasswordIllustration,
                alt: t("Ilustração reset de senha"),
            }}
        >
            <form className={styles.ResetPasswordForm}>
                <header className={styles.ResetPasswordFormHeader}>
                    <h1 className={styles.ResetPasswordFormTitle}>
                        {t("Redefinir senha")} 🔒
                    </h1>
                    <h2 className={styles.ResetPasswordFormSubtitle}>
                        {t(
                            "Sua nova senha deve ser diferentes das senhas usadas anteriormente"
                        )}
                    </h2>
                </header>
                <div className={styles.ResetPasswordFormBody}>
                    <Input
                        required
                        fullWidth
                        label={t("Senha")}
                        type="password"
                        placeholder={t("ex. 1234Aa@")}
                        onChange={(evt) => setPassword(evt.target.value)}
                        value={password}
                        error={
                            password && passwordError
                                ? passwordError
                                : undefined
                        }
                    />
                    <Input
                        required
                        fullWidth
                        label={t("Confirme a senha")}
                        type="password"
                        placeholder={t("ex. 1234Aa@")}
                        onChange={(evt) => setConfirmPassword(evt.target.value)}
                        onEnter={onEnterPress(handleResetPassword)}
                        value={confirmPassword}
                        error={
                            confirmPassword && !confirmPasswordIsValid
                                ? t(
                                      "Confirme sua senha deve ser igual à sua senha"
                                  )
                                : undefined
                        }
                    />
                    <Button
                        fullWidth
                        onClick={handleResetPassword}
                        variant="contained"
                        color="highlight"
                        tone="50"
                    >
                        {t("Definir nova senha")}
                    </Button>
                </div>
                <footer className={styles.ResetPasswordFormFooter}>
                    <I18nLink href="/login">
                        {"< "}
                        {t("Voltar para a tela de login")}
                    </I18nLink>
                </footer>
            </form>
        </PublicPage>
    );
}

export default ResetPassword;
