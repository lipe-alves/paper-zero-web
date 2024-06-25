import React, { ReactNode } from "react";
import type { Metadata } from "next";

import { APPLICATION_NAME } from "@shared/constants";
import { translate } from "@shared/i18n";
import { Composer, ComponentList } from "@client/components/ui";
import { RootLayoutProps } from "@app/[lang]/layout";

import { ResetPasswordProvider } from "./_providers";

interface ResetPasswordLayoutProps extends RootLayoutProps {
    params: RootLayoutProps["params"];
    children: ReactNode;
}

function generateMetadata(props: ResetPasswordLayoutProps): Metadata {
    const { lang } = props.params;

    return {
        title: translate(lang, "@appName - Resetar minha senha", {
            appName: APPLICATION_NAME,
        }),
        applicationName: APPLICATION_NAME,
    };
}

function ResetPasswordLayout(props: ResetPasswordLayoutProps) {
    const { children } = props;

    const providers: ComponentList = [ResetPasswordProvider];

    return <Composer components={providers}>{children}</Composer>;
}

export default ResetPasswordLayout;
export { generateMetadata };
export type { ResetPasswordLayoutProps };
