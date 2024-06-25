"use client";

import React, { createContext, useContext, useState, useMemo } from "react";

import { ContextProviderProps } from "@client/types";
import { useNavigation, useAuth, useLoader, useToast } from "@client/providers";
import { useQueryParams } from "@client/hooks";
import { validator } from "@shared/utils";

interface LoginValue {
    email: string;
    password: string;
    rememberMe: boolean;
    setEmail: (value: string) => void;
    setPassword: (value: string) => void;
    setRememberMe: (value: boolean) => void;
    emailIsValid: boolean;
    handleSubmitLogin: () => Promise<void>;
}

const LoginContext = createContext<LoginValue | undefined>(undefined);

function LoginProvider(props: ContextProviderProps) {
    const { children } = props;

    const loader = useLoader();
    const toast = useToast();
    const { login } = useAuth();
    const { navigate } = useNavigation();
    const { redirect = "/dashboard" } = useQueryParams();

    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    const emailIsValid = useMemo(() => validator.email(email), [email]);

    const handleSubmitLogin = async () => {
        loader.show();

        try {
            await login(email, password);
            navigate(redirect);
        } catch (error) {
            const err = error as Error;
            console.error(err);
            toast.error(err.message);
        } finally {
            loader.hide();
        }
    };

    return (
        <LoginContext.Provider
            value={{
                password,
                setPassword,
                email,
                setEmail,
                rememberMe,
                setRememberMe,
                emailIsValid,
                handleSubmitLogin,
            }}
        >
            {children}
        </LoginContext.Provider>
    );
}

function useLogin() {
    const context = useContext(LoginContext);

    if (!context) {
        throw new Error("useLogin must be used within a LoginProvider");
    }

    return context;
}

export { LoginContext, LoginProvider, useLogin };
export type { LoginValue };
