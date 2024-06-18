"use client";

import React from "react";

import { PASSWORD_MIN_LENGTH } from "@shared/constants";
import { useI18n, useNavigation } from "@client/providers";
import { Input, Button, I18nLink } from "@client/components";
import { User } from "@shared/models";
import { handleChangeModelProp } from "@shared/utils";

import { useRegistration } from "../../_providers";

import { Check } from "styled-icons/boxicons-regular";
import { UserAstronaut } from "styled-icons/fa-solid";
import { CloseOutline } from "styled-icons/evaicons-outline";
import { Facebook, Twitter, Google } from "styled-icons/boxicons-logos";

import styles from "./styles.module.scss";

function Main() {
    const { t } = useI18n();
    const { navigate } = useNavigation();
    const {
        user,
        password,
        confirmPassword,
        updateUser,
        setPassword,
        setConfirmPassword,
        emailIsValid,
        passwordIsValid,
        confirmPasswordIsValid,
        passwordValidationRules,
    } = useRegistration();

    const handleChangeUserProp = (prop: keyof User, isCheckbox = false) => {
        return handleChangeModelProp<User>(prop, updateUser, isCheckbox);
    };

    const handleChangeUserPassword = (
        evt: React.ChangeEvent<HTMLInputElement>
    ) => {
        setPassword(evt.target.value);
    };

    const handleChangeConfirmPassword = (
        evt: React.ChangeEvent<HTMLInputElement>
    ) => {
        setConfirmPassword(evt.target.value);
    };

    const passwordRuleToLabel = {
        length: t("A senha deve ter pelo menos @passwordMinLength caracteres", {
            passwordMinLength: String(PASSWORD_MIN_LENGTH),
        }),
        specialChars: t("A senha deve conter pelo menos um caractere especial"),
        numbers: t("A senha deve conter pelo menos um número"),
        letters: t("A senha deve conter pelo menos uma letra"),
        uppercase: t("A senha deve conter pelo menos uma letra maiúscula"),
        lowercase: t("A senha deve conter pelo menos uma letra minúscula"),
    };

    const passwordRuleEntries = Object.entries(passwordValidationRules) as [
        key: keyof typeof passwordValidationRules,
        validate: (value: string) => boolean
    ][];

    const passwordRulesToItems = passwordRuleEntries
        .filter(([key]) => !!passwordRuleToLabel[key])
        .map(([key, validate]) => ({
            key,
            label: passwordRuleToLabel[key],
            isValid: validate(password),
        }));

    return (
        <main className={styles.Main}>
            <header className={styles.MainHeader}>
                <figure className={styles.MainIcon}>
                    <UserAstronaut />
                </figure>
                <h1 className={styles.MainTitle}>{t("Crie a sua conta")}</h1>
                <h2 className={styles.MainSubtitle}>
                    {t("A criação de uma conta só leva 30 segundos")}
                </h2>
            </header>
            <form className={styles.MainForm}>
                <div className={styles.MainFormRow}>
                    <Input
                        required
                        fullWidth
                        label={t("Primeiro nome")}
                        placeholder={t("John")}
                        onChange={handleChangeUserProp("firstName")}
                        value={user.firstName}
                    />
                    <Input
                        required
                        fullWidth
                        label={t("Último nome")}
                        placeholder={t("Doe")}
                        onChange={handleChangeUserProp("lastName")}
                        value={user.lastName}
                    />
                </div>
                <Input
                    required
                    fullWidth
                    label={t("Endereço de Email")}
                    placeholder={t("exemplo@exemplo.com")}
                    onChange={handleChangeUserProp("email")}
                    value={user.email}
                    error={
                        user.email && !emailIsValid
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
                    error={
                        password && !passwordIsValid
                            ? t("Senha inválida")
                            : undefined
                    }
                />
                {password && !passwordIsValid && (
                    <ul className={styles.MainRuleList}>
                        {passwordRulesToItems.map(({ key, label, isValid }) => (
                            <li
                                key={key}
                                className={styles.MainRuleListRule}
                                data-checked={isValid}
                            >
                                <span className={styles.MainRuleListRuleIcon}>
                                    {isValid ? <Check /> : <CloseOutline />}
                                </span>
                                {label}
                            </li>
                        ))}
                    </ul>
                )}
                <Input
                    required
                    fullWidth
                    label={t("Confirme a senha")}
                    type="password"
                    placeholder={t("ex. 1234Aa@")}
                    onChange={handleChangeConfirmPassword}
                    value={confirmPassword}
                    error={
                        confirmPassword && !confirmPasswordIsValid
                            ? t("Confirme sua senha deve ser igual à sua senha")
                            : undefined
                    }
                />
                <Button
                    fullWidth
                    variant="contained"
                    tone="70"
                >
                    {t("Criar conta")}
                </Button>
            </form>
            <footer className={styles.MainFooter}>
                <p>{t("Ou registre-se usando")}</p>
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
                    {t("Já possui uma conta?")}{" "}
                    <I18nLink href="/login">{t("Clique aqui")}</I18nLink>
                </p>
            </footer>
        </main>
    );
}

export default Main;
export { Main };
