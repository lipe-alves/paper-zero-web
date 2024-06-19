"use client";

import { ReactNode } from "react";
import { useModal, useLoader } from "../providers";
import Modal from "./Modal";
import Spinner from "./Spinner";

interface AppProps {
    children: ReactNode;
}

function App(props: AppProps) {
    const { children } = props;
    const { modalProps } = useModal();
    const loader = useLoader();

    return (
        <>
            {children}
            <Spinner
                open={loader.visible}
                onClose={loader.hide}
            />
            <Modal {...modalProps} />
        </>
    );
}

export default App;
export { App };
export type { AppProps };
