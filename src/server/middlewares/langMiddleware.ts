import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

import { ApiRequest, Middleware } from "@server/types";
import { ApiResponse } from "@server/services";
import { IMAGE_EXTENSIONS } from "@shared/constants";
import { i18nConfig } from "@shared/i18n";

const pathsToIgnore = [
    "react-toastify",
    "/api",
    "/_next",
    `^\/.+(\.${IMAGE_EXTENSIONS.join("|.")})`,
];

const langMiddleware = async function (req) {
    const pathname = req.nextUrl.pathname;
    const mustIgnore = pathsToIgnore.some((pattern) =>
        new RegExp(pattern).test(pathname)
    );

    if (mustIgnore) {
        return;
    }

    // Check if there is any supported lang in the pathname
    const pathnameIsMissingLocale = i18nConfig.languages.every(
        (lang) => !pathname.startsWith(`/${lang}/`) && pathname !== `/${lang}`
    );

    // Redirect if there is no lang
    if (pathnameIsMissingLocale) {
        const lang = getLocale(req);

        // e.g. incoming req is /products
        // The new URL is now /en-US/products
        return ApiResponse.redirect(
            new URL(
                `/${lang}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
                req.url
            )
        );
    }
} as Middleware;

export { langMiddleware };
export default langMiddleware;

function getLocale(req: ApiRequest<any>): string | undefined {
    // Negotiator expects plain object so we need to transform headers
    const negotiatorHeaders: Record<string, string> = {};
    req.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

    // @ts-ignore locales are readonly
    const locales: string[] = i18nConfig.languages;

    // Use negotiator and intl-localematcher to get best lang
    const languages = new Negotiator({ headers: negotiatorHeaders }).languages(
        locales
    );
    const lang = matchLocale(languages, locales, i18nConfig.defaultLanguage);

    return lang;
}
