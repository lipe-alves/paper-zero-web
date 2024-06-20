import React, { ReactNode } from "react";
import { RootLayoutProps } from "@app/[lang]/layout";

interface SignatureProcessCreateLayoutProps extends RootLayoutProps {
    params: RootLayoutProps["params"];
    children: ReactNode;
}

const SignatureProcessCreateLayout = (
    props: SignatureProcessCreateLayoutProps
) => <>{props.children}</>;

export default SignatureProcessCreateLayout;
export type { SignatureProcessCreateLayoutProps };
