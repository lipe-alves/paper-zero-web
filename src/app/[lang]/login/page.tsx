"use client";

import Image from "next/image";

import { useI18n, useTheme } from "@client/providers";
import { PublicPage } from "@client/components/layout";
import {
    I18nLink,
    Input,
    Button,
    Checkbox,
    Divider,
} from "@client/components/ui";

import { APPLICATION_NAME } from "@shared/constants";
import { onEnterPress } from "@shared/utils";

import { useLogin } from "./_providers";

import LoginIllustrationLight from "@client/assets/images/auth/v2-login-light.png";
import LoginIllustrationDark from "@client/assets/images/auth/v2-login-dark.png";
import GoogleLogo from "@client/assets/images/logos/google.png";

import styles from "./page.module.scss";

function Login() {
    const { t } = useI18n();
    const { theme } = useTheme();
    const {
        password,
        setPassword,
        email,
        setEmail,
        rememberMe,
        setRememberMe,
        emailIsValid,
        handleSubmitLogin,
    } = useLogin();

    const LoginIllustration =
        theme === "light" ? LoginIllustrationLight : LoginIllustrationDark;

    return (
        <PublicPage
            illustration={{
                src: LoginIllustration,
                alt: t("Ilustração login"),
            }}
        >
            <form className={styles.LoginForm}>
                <header className={styles.LoginFormRows}>
                    <h1 className={styles.LoginFormTitle}>
                        {t("Seja bem-vindo ao @appName!", {
                            appName: APPLICATION_NAME,
                        })}{" "}
                        👋🏻
                    </h1>
                    <h2 className={styles.LoginFormSubtitle}>
                        {t(
                            "Por favor, entre na sua conta e seu papel começa aqui"
                        )}
                    </h2>
                </header>
                <section className={styles.LoginFormRows}>
                    <Input
                        fullWidth
                        className={styles.LoginFormInput}
                        type="text"
                        label={t("Endereço de email")}
                        placeholder={t("Preencha com seu email")}
                        onChange={(evt) => setEmail(evt.target.value)}
                        value={email}
                        error={
                            email && !emailIsValid
                                ? t("Email inválido")
                                : undefined
                        }
                    />
                    <Input
                        fullWidth
                        className={styles.LoginFormInput}
                        label={t("Senha")}
                        type="password"
                        placeholder={t("Preencha com sua senha")}
                        onChange={(evt) => setPassword(evt.target.value)}
                        onEnter={onEnterPress(handleSubmitLogin)}
                        value={password}
                    />
                </section>
                <section className={styles.LoginFormColumns}>
                    <Checkbox
                        label={t("Lembrar-se de mim")}
                        onChange={(evt) => setRememberMe(evt.target.checked)}
                        checked={rememberMe}
                    />
                    <I18nLink href="/forgot-password">
                        {t("Esqueceu a senha?")}
                    </I18nLink>
                </section>
                <footer className={styles.LoginFormFooter}>
                    <Button
                        fullWidth
                        onClick={handleSubmitLogin}
                        variant="contained"
                        color="highlight"
                        tone="50"
                    >
                        {t("Entrar")}
                    </Button>
                    <p className={styles.LoginFormCenteredText}>
                        {t("Novo no @appName?", {
                            appName: APPLICATION_NAME,
                        })}{" "}
                        <I18nLink href="/register">
                            {t("Crie uma conta")}
                        </I18nLink>
                    </p>
                    <Divider
                        color="text"
                        tone="50"
                    >
                        {t("ou")}
                    </Divider>
                    <Button
                        transparent
                        color="text"
                        tone="50"
                        leftIcon={
                            <Image
                                src={GoogleLogo}
                                alt={t("Google")}
                                width={22}
                            />
                        }
                    >
                        {t("Entrar com o Google")}
                    </Button>
                </footer>
            </form>
        </PublicPage>
    );
}

export default Login;
