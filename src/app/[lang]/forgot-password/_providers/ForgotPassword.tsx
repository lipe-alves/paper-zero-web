"use client";

import React, { createContext, useContext, useState } from "react";

import { useLoader, useToast, useNavigation } from "@client/providers";
import { ContextProviderProps } from "@client/types";

interface ForgotPasswordValue {
    email: string;
    setEmail: (value: string) => void;
    handleSendPasswordRecovery: () => Promise<void>;
}

const ForgotPasswordContext = createContext<ForgotPasswordValue | undefined>(
    undefined
);

function ForgotPasswordProvider(props: ContextProviderProps) {
    const { children } = props;

    const { navigate } = useNavigation();
    const loader = useLoader();
    const toast = useToast();

    const [email, setEmail] = useState("");

    const handleSendPasswordRecovery = async () => {
        loader.show();

        try {
            navigate("/reset-password");
        } catch (error) {
            const err = error as Error;
            console.error(err);
            toast.error(err.message);
        } finally {
            loader.hide();
        }
    };

    return (
        <ForgotPasswordContext.Provider
            value={{
                email,
                setEmail,
                handleSendPasswordRecovery,
            }}
        >
            {children}
        </ForgotPasswordContext.Provider>
    );
}

function useForgotPassword() {
    const context = useContext(ForgotPasswordContext);

    if (!context) {
        throw new Error(
            "useForgotPassword must be used within a ForgotPasswordProvider"
        );
    }

    return context;
}

export { ForgotPasswordContext, ForgotPasswordProvider, useForgotPassword };
export type { ForgotPasswordValue };
