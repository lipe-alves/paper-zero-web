"use client";

import React from "react";
import Image from "next/image";

import { APPLICATION_NAME } from "@shared/constants";
import { useI18n, useNavigation } from "@client/providers";
import { Button } from "@client/components";

import SiginingAContract from "@client/assets/images/Signing a contract-rafiki.svg";

import styles from "./styles.module.scss";

function Main() {
    const { t } = useI18n();
    const { navigate } = useNavigation();

    const handleGetStarted = () => {
        navigate("/register");
    };

    return (
        <main className={styles.Main}>
            <div className={styles.MainCatchlines}>
                <h1 className={styles.MainTitle}>
                    <strong>{APPLICATION_NAME}</strong> -{" "}
                    {t("Revolucione a forma como você assina")}
                </h1>
                <h2 className={styles.MainSubtitle}>
                    {t(
                        "Digitalize seu fluxo de trabalho com assinaturas eletrônicas seguras e eficientes. Diga adeus ao papel e olá à produtividade!"
                    )}
                </h2>
                <Button
                    className={styles.MainGetStarted}
                    variant="outlined"
                    color="primary"
                    tone="70"
                    onClick={handleGetStarted}
                >
                    {t("Comece agora")}
                </Button>
            </div>
            <figure className={styles.MainImage}>
                <Image
                    src={SiginingAContract}
                    alt={t("Assinando um contrato")}
                    width={680}
                    height={680}
                />
            </figure>
        </main>
    );
}

export default Main;
export { Main };
