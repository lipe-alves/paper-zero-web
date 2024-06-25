"use client";

import React, { createContext, useContext, useState } from "react";

import { useAsyncEffect } from "@client/hooks";
import { paperZeroApi } from "@client/services";
import { User } from "@shared/models";

import { useLoader } from "./Loader";

interface AuthValue {
    sessionLoaded: boolean;
    user?: User;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthValue | undefined>(undefined);

function AuthProvider(props: { children: React.ReactNode }) {
    const [sessionLoaded, setSessionLoaded] = useState(false);
    const [user, setUser] = useState<User>();
    const loader = useLoader();

    const login = async (email: string, password: string) => {
        const { data } = await paperZeroApi.auth.login(email, password);
        setUser(data.user);
    };

    const logout = async () => {
        if (!user) return;
        await paperZeroApi.auth.logout();
        setUser(undefined);
    };

    useAsyncEffect(async () => {
        loader.show();
        try {
            const { data } = await paperZeroApi.auth.recoverSession();
            setUser(data.user);
        } catch {
        } finally {
            loader.hide();
            setSessionLoaded(true);
        }
    }, []);

    return (
        <AuthContext.Provider
            value={{
                sessionLoaded,
                user,
                login,
                logout,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}

function useAuth() {
    const context = useContext(AuthContext);
    if (!context)
        throw new Error("useAuth must be used within an AuthProvider");
    return context;
}

export { AuthContext, AuthProvider, useAuth };
