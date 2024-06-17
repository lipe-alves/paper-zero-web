"use client";

import React from "react";

import { useI18n, useNavigation } from "@client/providers";
import { Input, Button, I18nLink } from "@client/components";
import { handleChangeModelProp } from "@shared/utils";

import { useAuthentication } from "../../_providers";

import { Key } from "styled-icons/feather";
import { Facebook, Twitter, Google } from "styled-icons/boxicons-logos";

import styles from "./styles.module.scss";

function Main() {
    const { t } = useI18n();
    const { navigate } = useNavigation();
    const { password, setPassword, email, setEmail, emailIsValid } =
        useAuthentication();

    const handleChangeUserPassword = (
        evt: React.ChangeEvent<HTMLInputElement>
    ) => {
        setPassword(evt.target.value);
    };

    const handleChangeUserEmail = (
        evt: React.ChangeEvent<HTMLInputElement>
    ) => {
        setEmail(evt.target.value);
    };

    return (
        <main className={styles.Main}>
            <header className={styles.MainHeader}>
                <figure className={styles.MainIcon}>
                    <Key />
                </figure>
                <h1 className={styles.MainTitle}>{t("Entre na sua conta")}</h1>
                <h2 className={styles.MainSubtitle}>
                    {t("Coloque seu email e senha para se autenticar")}
                </h2>
            </header>
            <form className={styles.MainForm}>
                <Input
                    required
                    fullWidth
                    label={t("Endereço de Email")}
                    placeholder={t("exemplo@exemplo.com")}
                    onChange={handleChangeUserEmail}
                    value={email}
                    error={
                        email && !emailIsValid
                            ? t("Email inválido")
                            : undefined
                    }
                />
                <Input
                    required
                    fullWidth
                    label={t("Senha")}
                    type="password"
                    placeholder={t("ex. 1234Aa@")}
                    onChange={handleChangeUserPassword}
                    value={password}
                />
                <Button
                    fullWidth
                    className={styles.MainSubmit}
                    variant="contained"
                    tone="70"
                >
                    {t("Entrar")}
                </Button>
            </form>
            <footer className={styles.MainFooter}>
                <p>{t("Ou entre usando")}</p>
                <div className={styles.MainSocials}>
                    <div
                        className={styles.MainSocialsIcon}
                        data-social-media="facebook"
                    >
                        <Facebook />
                    </div>
                    <div
                        className={styles.MainSocialsIcon}
                        data-social-media="twitter"
                    >
                        <Twitter />
                    </div>
                    <div
                        className={styles.MainSocialsIcon}
                        data-social-media="google"
                    >
                        <Google />
                    </div>
                </div>
                <p>
                    {t("Não possui uma conta?")}{" "}
                    <I18nLink href="/register">{t("Clique aqui")}</I18nLink>
                </p>
            </footer>
        </main>
    );
}

export default Main;
export { Main };
