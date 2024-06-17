"use client";

import React, { createContext, useContext, useState, useMemo } from "react";

import { ContextProviderProps } from "@client/types";
import { validator } from "@shared/utils";

interface AuthenticationValue {
    email: string;
    password: string;
    setEmail: (value: string) => void;
    setPassword: (value: string) => void;
    emailIsValid: boolean;
}

const AuthenticationContext = createContext<AuthenticationValue | undefined>(
    undefined
);

function AuthenticationProvider(props: ContextProviderProps) {
    const { children } = props;

    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const emailIsValid = useMemo(() => validator.email(email), [email]);

    return (
        <AuthenticationContext.Provider
            value={{
                password,
                setPassword,
                email,
                setEmail,
                emailIsValid,
            }}
        >
            {children}
        </AuthenticationContext.Provider>
    );
}

function useAuthentication() {
    const context = useContext(AuthenticationContext);

    if (!context) {
        throw new Error(
            "useAuthentication must be used within a AuthenticationProvider"
        );
    }

    return context;
}

export { AuthenticationContext, AuthenticationProvider, useAuthentication };
export type { AuthenticationValue };
