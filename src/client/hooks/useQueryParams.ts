"use client";

import { useMemo } from "react";

interface QueryParams {
    [key: string]: string | undefined;
}

/**
 * Returns query params of location url
 */
function useQueryParams(): QueryParams {
    if (typeof window === "undefined") {
        return {};
    }

    const params = useMemo(() => {
        if (!window) return {};

        const queryString = window.location.search;
        const urlParams = queryString
            .replace("?", "")
            .split("&")
            .map((keyValuePairStr) => keyValuePairStr.split("="));

        const params: QueryParams = {};

        for (const [key, value] of urlParams) {
            params[key] = value;
        }

        return params;
    }, [window?.location.search]);

    return params;
}

export default useQueryParams;
export { useQueryParams };
