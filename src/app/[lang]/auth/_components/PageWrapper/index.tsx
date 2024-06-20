import { ReactNode } from "react";
import styles from "./styles.module.scss";

interface PageWrapperProps {
    children: ReactNode;
}

function PageWrapper(props: PageWrapperProps) {
    const { children } = props;
    return <div className={styles.PageWrapper}>{children}</div>;
}

export default PageWrapper;
export { PageWrapper };
export type { PageWrapperProps };
