"use client";

import { ReactNode, useEffect } from "react";
import { useAuth, useNavigation } from "@client/providers";

interface ProtectedProps {
    children: ReactNode;
}

function Protected(props: ProtectedProps) {
    const { children } = props;
    const { user } = useAuth();
    const { navigate } = useNavigation();

    useEffect(() => {
        if (!user?.id) return navigate("/login");
    }, [user?.id]);

    return <>{children}</>;
}

export default Protected;
export { Protected };
export type { ProtectedProps };
