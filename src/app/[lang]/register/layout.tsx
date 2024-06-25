import { ReactNode } from "react";
import type { Metadata } from "next";

import { APPLICATION_NAME } from "@shared/constants";
import { translate } from "@shared/i18n";
import { Composer, ComponentList } from "@client/components/ui";
import { RootLayoutProps } from "@app/[lang]/layout";

import { RegisterProvider } from "./_providers";

interface RegisterLayoutProps extends RootLayoutProps {
    params: RootLayoutProps["params"];
    children: ReactNode;
}

function generateMetadata(props: RegisterLayoutProps): Metadata {
    const { lang } = props.params;

    return {
        title: translate(lang, "@appName - Criar uma conta", {
            appName: APPLICATION_NAME,
        }),
        applicationName: APPLICATION_NAME,
    };
}

function RegisterLayout(props: RegisterLayoutProps) {
    const { children } = props;

    const providers: ComponentList = [RegisterProvider];

    return <Composer components={providers}>{children}</Composer>;
}

export default RegisterLayout;
export { generateMetadata };
export type { RegisterLayoutProps };
