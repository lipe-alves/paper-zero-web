"use client";

import React, { createContext, useContext, useState } from "react";

import { useLoader, useToast, useNavigation } from "@client/providers";
import { ContextProviderProps } from "@client/types";

interface VerifyEmailValue {
    userEmail: string;
    handleSkipEmailVerification: () => Promise<void>;
}

const VerifyEmailContext = createContext<VerifyEmailValue | undefined>(
    undefined
);

function VerifyEmailProvider(props: ContextProviderProps) {
    const { children } = props;

    const { navigate } = useNavigation();
    const loader = useLoader();
    const toast = useToast();

    const userEmail = "john.doe@gmail.com";

    const handleSkipEmailVerification = async () => {
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
        <VerifyEmailContext.Provider
            value={{
                userEmail,
                handleSkipEmailVerification,
            }}
        >
            {children}
        </VerifyEmailContext.Provider>
    );
}

function useVerifyEmail() {
    const context = useContext(VerifyEmailContext);

    if (!context) {
        throw new Error(
            "useVerifyEmail must be used within a VerifyEmailProvider"
        );
    }

    return context;
}

export { VerifyEmailContext, VerifyEmailProvider, useVerifyEmail };
export type { VerifyEmailValue };
