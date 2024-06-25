"use client";

import React, { ReactNode, useEffect } from "react";
import { useAuth, useNavigation } from "@client/providers";
import styles from "./styles.module.scss";

interface PrivatePageProps {
    children: ReactNode;
}

function PrivatePage(props: PrivatePageProps) {
    const { children } = props;
    const { sessionLoaded, user } = useAuth();
    const { navigate, currentPath } = useNavigation();

    useEffect(() => {
        if (!sessionLoaded) return;

        const loggedIn = !!user?.id;
        if (!loggedIn) return navigate(`/login/?redirect=${currentPath}`);
    }, [user?.id, sessionLoaded]);

    return <div className={styles.PrivatePage}>{children}</div>;
}

export default PrivatePage;
export { PrivatePage };
export type { PrivatePageProps };
