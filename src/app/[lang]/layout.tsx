import { ReactNode } from "react";
import { Inter } from "next/font/google";
import type { Metadata } from "next";

import { APPLICATION_NAME } from "@shared/constants";
import { i18nConfig, Language, translate } from "@shared/i18n";

import { Composer, ComponentList } from "@client/components/ui";
import { App } from "@client/components/layout";
import {
    I18nProvider,
    LoaderProvider,
    ModalProvider,
    ToastProvider,
    NavigationProvider,
    AuthProvider,
    ThemeProvider,
} from "@client/providers";

import "@client/styles/fonts.scss";
import "@client/styles/reset.css";
import "@client/styles/index.scss";

const inter = Inter({ subsets: ["latin"] });

interface RootLayoutProps {
    params: {
        lang: Language;
    };
    children: ReactNode;
}

function generateMetadata(props: RootLayoutProps): Metadata {
    const { lang } = props.params;

    return {
        title: translate(
            lang,
            "@appName - Assinaturas Digitais Simplificadas",
            {
                appName: APPLICATION_NAME,
            }
        ),
        description: translate(
            lang,
            "Bem-vindo ao @appName, a sua solução definitiva para assinaturas digitais de documentos. Nossa plataforma intuitiva e segura transforma o processo de assinatura digital, tornando-o mais rápido, mais fácil e completamente sem papel. Junte-se a nós na jornada para um futuro mais verde e eficiente.",
            {
                appName: APPLICATION_NAME,
            }
        ),
        applicationName: APPLICATION_NAME,
    };
}

function generateStaticParams() {
    return i18nConfig.languages.map((lang) => ({ lang }));
}

function RootLayout(props: RootLayoutProps) {
    const { params, children } = props;
    const { lang } = params;

    const providers: ComponentList = [
        [I18nProvider, { lang }],
        ThemeProvider,
        LoaderProvider,
        ModalProvider,
        ToastProvider,
        NavigationProvider,
        AuthProvider,
    ];

    return (
        <html
            lang={lang}
            data-theme="light"
        >
            <body className={inter.className}>
                <Composer components={providers}>
                    <App>{children}</App>
                </Composer>
            </body>
        </html>
    );
}

export default RootLayout;
export { generateStaticParams, generateMetadata };
export type { RootLayoutProps };
