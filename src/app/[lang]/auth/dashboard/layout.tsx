import React, { ReactNode } from "react";
import { RootLayoutProps } from "@app/[lang]/layout";

interface DashboardLayoutProps extends RootLayoutProps {
    params: RootLayoutProps["params"];
    children: ReactNode;
}

const DashboardLayout = (props: DashboardLayoutProps) => <>{props.children}</>;

export default DashboardLayout;
export type { DashboardLayoutProps };
