import { ReactNode } from "react";
import { Protected } from "@client/components";

import { AppDrawer, AppBar, MainWrapper, PageWrapper } from "./_components";

import { RootLayoutProps } from "@app/[lang]/layout";

interface AuthLayoutProps extends RootLayoutProps {
    params: RootLayoutProps["params"];
    children: ReactNode;
}

const AuthLayout = (props: AuthLayoutProps) => (
    <Protected>
        <MainWrapper>
            <AppDrawer />
            <PageWrapper>
                <AppBar />
                {props.children}
            </PageWrapper>
        </MainWrapper>
    </Protected>
);

export default AuthLayout;
export type { AuthLayoutProps };
