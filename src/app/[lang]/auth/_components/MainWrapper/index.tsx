import { ReactNode } from "react";
import styles from "./styles.module.scss";

interface MainWrapperProps {
    children: ReactNode;
}

function MainWrapper(props: MainWrapperProps) {
    const { children } = props;
    return <main className={styles.MainWrapper}>{children}</main>;
}

export default MainWrapper;
export { MainWrapper };
export type { MainWrapperProps };
