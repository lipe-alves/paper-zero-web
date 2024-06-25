import { ReactNode } from "react";
import type { Metadata } from "next";

import { APPLICATION_NAME } from "@shared/constants";
import { translate } from "@shared/i18n";
import { Composer, ComponentList } from "@client/components/ui";
import { RootLayoutProps } from "@app/[lang]/layout";

import { LoginProvider } from "./_providers";

interface LoginLayoutProps extends RootLayoutProps {
    params: RootLayoutProps["params"];
    children: ReactNode;
}

function generateMetadata(props: LoginLayoutProps): Metadata {
    const { lang } = props.params;

    return {
        title: translate(lang, "@appName - Entrar", {
            appName: APPLICATION_NAME,
        }),
        applicationName: APPLICATION_NAME,
    };
}

function LoginLayout(props: LoginLayoutProps) {
    const { children } = props;

    const providers: ComponentList = [LoginProvider];

    return <Composer components={providers}>{children}</Composer>;
}

export default LoginLayout;
export { generateMetadata };
export type { LoginLayoutProps };
