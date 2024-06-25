import React, { ReactNode } from "react";
import type { Metadata } from "next";

import { APPLICATION_NAME } from "@shared/constants";
import { translate } from "@shared/i18n";
import { Composer, ComponentList } from "@client/components/ui";
import { RootLayoutProps } from "@app/[lang]/layout";

import { VerifyEmailProvider } from "./_providers";

interface VerifyEmailLayoutProps extends RootLayoutProps {
    params: RootLayoutProps["params"];
    children: ReactNode;
}

function generateMetadata(props: VerifyEmailLayoutProps): Metadata {
    const { lang } = props.params;

    return {
        title: translate(lang, "@appName - Verifique seu email", {
            appName: APPLICATION_NAME,
        }),
        applicationName: APPLICATION_NAME,
    };
}

function VerifyEmailLayout(props: VerifyEmailLayoutProps) {
    const { children } = props;

    const providers: ComponentList = [VerifyEmailProvider];

    return <Composer components={providers}>{children}</Composer>;
}

export default VerifyEmailLayout;
export { generateMetadata };
export type { VerifyEmailLayoutProps };
