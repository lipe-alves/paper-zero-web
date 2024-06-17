import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

import { IMAGE_EXTENSIONS } from "./shared/constants";
import { i18nConfig } from "./shared/i18n";

const pathsToIgnore = [
    "/api",
    "/_next",
    `^\/.+(\.${IMAGE_EXTENSIONS.join("|.")})`,
];

function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
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
        const lang = getLocale(request);

        // e.g. incoming request is /products
        // The new URL is now /en-US/products
        return NextResponse.redirect(
            new URL(
                `/${lang}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
                request.url
            )
        );
    }
}

const config = {
    matcher: ["*"],
};

export { middleware, config };

function getLocale(request: NextRequest): string | undefined {
    // Negotiator expects plain object so we need to transform headers
    const negotiatorHeaders: Record<string, string> = {};
    request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

    // @ts-ignore locales are readonly
    const locales: string[] = i18nConfig.languages;

    // Use negotiator and intl-localematcher to get best lang
    const languages = new Negotiator({ headers: negotiatorHeaders }).languages(
        locales
    );
    const lang = matchLocale(languages, locales, i18nConfig.defaultLanguage);

    return lang;
}
