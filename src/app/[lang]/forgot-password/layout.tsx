import { ReactNode } from "react";
import type { Metadata } from "next";

import { APPLICATION_NAME } from "@shared/constants";
import { translate } from "@shared/i18n";
import { Composer, ComponentList } from "@client/components/ui";
import { RootLayoutProps } from "@app/[lang]/layout";

import { ForgotPasswordProvider } from "./_providers";

interface ForgotPasswordLayoutProps extends RootLayoutProps {
    params: RootLayoutProps["params"];
    children: ReactNode;
}

function generateMetadata(props: ForgotPasswordLayoutProps): Metadata {
    const { lang } = props.params;

    return {
        title: translate(lang, "@appName - Esqueci minha senha", {
            appName: APPLICATION_NAME,
        }),
        applicationName: APPLICATION_NAME,
    };
}

function ForgotPasswordLayout(props: ForgotPasswordLayoutProps) {
    const { children } = props;

    const providers: ComponentList = [ForgotPasswordProvider];

    return <Composer components={providers}>{children}</Composer>;
}

export default ForgotPasswordLayout;
export { generateMetadata };
export type { ForgotPasswordLayoutProps };
