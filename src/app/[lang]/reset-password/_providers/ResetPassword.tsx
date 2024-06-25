"use client";

import React, { createContext, useContext, useState, useMemo } from "react";

import { useLoader, useToast, useNavigation } from "@client/providers";
import { ContextProviderProps } from "@client/types";

import { validator } from "@shared/utils";

interface ResetPasswordValue {
    password: string;
    confirmPassword: string;
    setPassword: (value: string) => void;
    setConfirmPassword: (value: string) => void;
    handleResetPassword: () => Promise<void>;
    passwordIsValid: boolean;
    confirmPasswordIsValid: boolean;
}

const ResetPasswordContext = createContext<ResetPasswordValue | undefined>(
    undefined
);

function ResetPasswordProvider(props: ContextProviderProps) {
    const { children } = props;

    const { navigate } = useNavigation();
    const loader = useLoader();
    const toast = useToast();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const passwordIsValid = useMemo(() => {
        return validator.password(password);
    }, [password]);

    const confirmPasswordIsValid = useMemo(() => {
        return password === confirmPassword;
    }, [password, confirmPassword]);

    const handleResetPassword = async () => {
        loader.show();

        try {
            navigate("/login");
        } catch (error) {
            const err = error as Error;
            console.error(err);
            toast.error(err.message);
        } finally {
            loader.hide();
        }
    };

    return (
        <ResetPasswordContext.Provider
            value={{
                password,
                setPassword,
                confirmPassword,
                setConfirmPassword,
                passwordIsValid,
                confirmPasswordIsValid,
                handleResetPassword,
            }}
        >
            {children}
        </ResetPasswordContext.Provider>
    );
}

function useResetPassword() {
    const context = useContext(ResetPasswordContext);

    if (!context) {
        throw new Error(
            "useResetPassword must be used within a ResetPasswordProvider"
        );
    }

    return context;
}

export { ResetPasswordContext, ResetPasswordProvider, useResetPassword };
export type { ResetPasswordValue };
