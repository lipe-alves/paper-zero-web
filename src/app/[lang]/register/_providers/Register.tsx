"use client";

import React, { createContext, useContext, useState, useMemo } from "react";

import { useLoader, useNavigation, useToast } from "@client/providers";
import { ContextProviderProps } from "@client/types";
import { paperZeroApi } from "@client/services";

import { User } from "@shared/models";
import { validator } from "@shared/utils";

interface RegisterValue {
    user: User;
    password: string;
    confirmPassword: string;
    agreedToTerms: boolean;
    updateUser: (updates: Partial<User>) => void;
    setPassword: (value: string) => void;
    setConfirmPassword: (value: string) => void;
    setAgreedToTerms: (value: boolean) => void;
    emailIsValid: boolean;
    passwordIsValid: boolean;
    confirmPasswordIsValid: boolean;
    handleSubmitRegister: () => Promise<void>;
}

const RegisterContext = createContext<RegisterValue | undefined>(undefined);

function RegisterProvider(props: ContextProviderProps) {
    const { children } = props;

    const loader = useLoader();
    const toast = useToast();
    const { navigate } = useNavigation();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [user, setUser] = useState(new User());
    const [agreedToTerms, setAgreedToTerms] = useState(false);

    const updateUser = (updates: Partial<User>) => {
        setUser(
            (prev) =>
                new User({
                    ...prev,
                    ...updates,
                })
        );
    };

    const handleSubmitRegister = async () => {
        loader.show();

        try {
            await paperZeroApi.auth.register(user.name, user.email, password);
            navigate("/verify-email/");
        } catch (error) {
            const err = error as Error;
            console.error(err);
            toast.error(err.message);
        } finally {
            loader.hide();
        }
    };

    const emailIsValid = useMemo(
        () => validator.email(user.email || ""),
        [user.email]
    );

    const passwordIsValid = useMemo(() => {
        return validator.password(password);
    }, [password]);

    const confirmPasswordIsValid = useMemo(() => {
        return password === confirmPassword;
    }, [password, confirmPassword]);

    return (
        <RegisterContext.Provider
            value={{
                user,
                password,
                confirmPassword,
                agreedToTerms,
                updateUser,
                setPassword,
                setConfirmPassword,
                setAgreedToTerms,
                emailIsValid,
                passwordIsValid,
                confirmPasswordIsValid,
                handleSubmitRegister,
            }}
        >
            {children}
        </RegisterContext.Provider>
    );
}

function useRegister() {
    const context = useContext(RegisterContext);

    if (!context) {
        throw new Error("useRegister must be used within a RegisterProvider");
    }

    return context;
}

export { RegisterContext, RegisterProvider, useRegister };
export type { RegisterValue };
