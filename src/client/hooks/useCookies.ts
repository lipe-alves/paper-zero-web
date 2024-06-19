"use client";

import { useMemo } from "react";

interface Cookies {
    [key: string]: string | undefined;
}

function useCookies() {
    if (typeof document === "undefined") {
        return {};
    }

    const cookies = useMemo(() => {
        const cookiesValues: Cookies = {};

        for (const cookieStr of document.cookie.split("; ")) {
            const [key, value] = cookieStr.split("=");
            cookiesValues[key] = value;
        }

        return cookiesValues;
    }, [document.cookie]);

    return cookies;
}

export default useCookies;
export { useCookies };
