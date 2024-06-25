"use client";

import { useI18n, useTheme } from "@client/providers";
import {
    I18nLink,
    Input,
    Button,
    IconButton,
    Checkbox,
    Divider,
} from "@client/components/ui";
import { PublicPage } from "@client/components/layout";

import {
    handleChangeModelProp,
    onEnterPress,
    passwordValidationRules,
    passwordRuleToLabel,
} from "@shared/utils";
import { User } from "@shared/models";

import { useRegister } from "./_providers";

import { Facebook, Twitter, Github, Google } from "styled-icons/boxicons-logos";

import RegisterIllustrationLight from "@client/assets/images/auth/v2-register-light.png";
import RegisterIllustrationDark from "@client/assets/images/auth/v2-register-dark.png";

import styles from "./page.module.scss";

function Register() {
    const { t } = useI18n();
    const { theme } = useTheme();

    const {
        user,
        password,
        confirmPassword,
        agreedToTerms,
        updateUser,
        setPassword,
        setConfirmPassword,
        setAgreedToTerms,
        emailIsValid,
        confirmPasswordIsValid,
        handleSubmitRegister,
    } = useRegister();

    const RegisterIllustration =
        theme === "light"
            ? RegisterIllustrationLight
            : RegisterIllustrationDark;

    const handleChangeUserProp = (prop: keyof User, isCheckbox = false) => {
        return handleChangeModelProp<User>(prop, updateUser, isCheckbox);
    };

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
                src: RegisterIllustration,
                alt: t("Ilustração registro"),
            }}
        >
            <form className={styles.RegisterForm}>
                <header className={styles.RegisterFormRows}>
                    <h1 className={styles.RegisterFormTitle}>
                        {t("Seu papel começa aqui")} 🚀
                    </h1>
                    <h2 className={styles.RegisterFormSubtitle}>
                        {t(
                            "Simplifique a gestão dos seus documentos com leveza!"
                        )}
                    </h2>
                </header>
                <section className={styles.RegisterFormRows}>
                    <Input
                        required
                        fullWidth
                        label={t("Nome completo")}
                        placeholder={t("João da Silva")}
                        onChange={handleChangeUserProp("name")}
                        value={user.name}
                    />
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
                        onEnter={onEnterPress(handleSubmitRegister)}
                        value={confirmPassword}
                        error={
                            confirmPassword && !confirmPasswordIsValid
                                ? t(
                                      "Confirme sua senha deve ser igual à sua senha"
                                  )
                                : undefined
                        }
                    />
                    <Checkbox
                        label={
                            <>
                                {t("Eu concordo com os")}{" "}
                                <I18nLink href="/terms">
                                    {t("termos de uso e privacidade")}
                                </I18nLink>
                            </>
                        }
                        onChange={(evt) => setAgreedToTerms(evt.target.checked)}
                        checked={agreedToTerms}
                    />
                </section>
                <footer className={styles.RegisterFormFooter}>
                    <Button
                        fullWidth
                        onClick={handleSubmitRegister}
                        variant="contained"
                        color="highlight"
                        tone="50"
                    >
                        {t("Criar minha conta")}
                    </Button>
                    <p className={styles.RegisterFormCenteredText}>
                        {t("Já possui uma conta?")}{" "}
                        <I18nLink href="/login">{t("Faça login")}</I18nLink>
                    </p>
                    <Divider
                        color="text"
                        tone="50"
                    >
                        {t("ou")}
                    </Divider>
                    <div className={styles.RegisterFormSocials}>
                        <IconButton color="facebook">
                            <Facebook />
                        </IconButton>
                        <IconButton color="twitter">
                            <Twitter />
                        </IconButton>
                        <IconButton color="github">
                            <Github />
                        </IconButton>
                        <IconButton color="google">
                            <Google />
                        </IconButton>
                    </div>
                </footer>
            </form>
        </PublicPage>
    );
}

export default Register;
