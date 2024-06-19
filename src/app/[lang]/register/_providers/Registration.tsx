"use client";

import React, { createContext, useContext, useState, useMemo } from "react";

import { PASSWORD_MIN_LENGTH } from "@shared/constants";
import { ContextProviderProps } from "@client/types";
import { User } from "@shared/models";
import { validator } from "@shared/utils";

const passwordValidationRules = {
    length: (value: string) => value.length >= PASSWORD_MIN_LENGTH,
    specialChars: (value: string) => /[!@#$%^&*(),.?":{}|<>]/g.test(value),
    numbers: (value: string) => /\d/g.test(value),
    letters: (value: string) => /[a-zA-Z]/g.test(value),
    uppercase: (value: string) => /[A-Z]/g.test(value),
    lowercase: (value: string) => /[a-z]/g.test(value),
};

interface RegistrationValue {
    user: User;
    password: string;
    confirmPassword: string;
    updateUser: (updates: Partial<User>) => void;
    setPassword: (value: string) => void;
    setConfirmPassword: (value: string) => void;
    emailIsValid: boolean;
    passwordIsValid: boolean;
    confirmPasswordIsValid: boolean;
    passwordValidationRules: typeof passwordValidationRules;
}

const RegistrationContext = createContext<RegistrationValue | undefined>(
    undefined
);

function RegistrationProvider(props: ContextProviderProps) {
    const { children } = props;

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [user, setUser] = useState(new User());

    const updateUser = (updates: Partial<User>) => {
        setUser(
            (prev) =>
                new User({
                    ...prev,
                    ...updates,
                })
        );
    };

    const emailIsValid = useMemo(
        () => validator.email(user.email || ""),
        [user.email]
    );

    const passwordIsValid = useMemo(() => {
        return Object.entries(passwordValidationRules).every(([_, validate]) =>
            validate(password)
        );
    }, [password]);

    const confirmPasswordIsValid = useMemo(() => {
        return password === confirmPassword;
    }, [password, confirmPassword]);

    return (
        <RegistrationContext.Provider
            value={{
                user,
                password,
                confirmPassword,
                updateUser,
                setPassword,
                setConfirmPassword,
                emailIsValid,
                passwordIsValid,
                passwordValidationRules,
                confirmPasswordIsValid,
            }}
        >
            {children}
        </RegistrationContext.Provider>
    );
}

function useRegistration() {
    const context = useContext(RegistrationContext);

    if (!context) {
        throw new Error(
            "useRegistration must be used within a RegistrationProvider"
        );
    }

    return context;
}

export { RegistrationContext, RegistrationProvider, useRegistration };
export type { RegistrationValue };
