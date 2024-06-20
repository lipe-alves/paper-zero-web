"use client";

import { ReactNode, useEffect } from "react";
import { useAuth, useNavigation } from "@client/providers";

interface ProtectedProps {
    children: ReactNode;
}

function Protected(props: ProtectedProps) {
    const { children } = props;
    const { sessionLoaded, user } = useAuth();
    const { navigate, currentPath } = useNavigation();

    useEffect(() => {
        if (!sessionLoaded) return;
        
        const loggedIn = !!user?.id;
        if (!loggedIn) return navigate(`/login/?redirect=${currentPath}`);
    }, [user?.id, sessionLoaded]);

    return <>{children}</>;
}

export default Protected;
export { Protected };
export type { ProtectedProps };
