import React, { ReactNode } from "react";
import Link, { LinkProps } from "next/link";
import { Language } from "@shared/i18n";
import { useI18n } from "@client/providers";

interface I18nLinkProps extends LinkProps {
    lang?: Language;
    children?: ReactNode;
}

/**
 * This component is intended to switch pages while maintaining the same language ([lang] route param).
 * Preferably use this instead of the native Link component, as it will keep the code more readable and practical
 * for the purpose of switching pages, avoiding concatenation mistakes.
 */
function I18nLink(props: I18nLinkProps) {
    const { lang: selectedLang } = useI18n();
    const { href, lang = selectedLang, ...rest } = props;
    const hrefUrl = String(href);

    return (
        <Link
            {...rest}
            href={`/${lang}${
                hrefUrl.startsWith("/") ? hrefUrl : `/${hrefUrl}`
            }`}
        />
    );
}

export default I18nLink;
export { I18nLink };
export type { I18nLinkProps };
