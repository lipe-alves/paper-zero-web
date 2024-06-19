import { useMemo, useState } from "react";

interface QueryParams {
    [key: string]: string | undefined;
}

/**
 * Returns query params of location url
 */
function useQueryParams(): QueryParams {
    const params = useMemo(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);

        const entries = Object.entries(urlParams);
        const params: QueryParams = {};

        for (const [key, value] of entries) {
            params[key] = value;
        }

        return params;
    }, [window.location.search]);

    return params;
}

export default useQueryParams;
export { useQueryParams };
