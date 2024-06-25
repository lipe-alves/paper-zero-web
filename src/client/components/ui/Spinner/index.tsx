"use client";

import React from "react";
import { Backdrop, CircularProgress } from "@mui/material";
import type { CircularProgressProps } from "@mui/material";
import { styled } from "@mui/material";

import { Color, Tone } from "@client/types";
import { COLOR_TYPES, TONES } from "@client/constants";

import styles from "./styles.module.scss";

const CircularProgressStyled = styled(CircularProgress)<CircularProgressProps>(
    () => {
        const style = {} as any;

        for (const colorType of COLOR_TYPES) {
            for (const tone of TONES) {
                const selector = `&[data-color="${colorType}"][data-tone="${tone}"] svg`;
                const color = `var(--${colorType}-${tone})`;

                style[selector] = {
                    color,
                };
            }
        }

        return style;
    }
);

interface SpinnerProps {
    open: boolean;
    onClose?: () => void;
    color?: Color;
    tone?: Tone;
}

function Spinner(props: SpinnerProps) {
    const { open, onClose, color = "highlight", tone = "50" } = props;

    return (
        <Backdrop
            className={styles.Spinner}
            open={open}
            onClick={onClose}
        >
            <CircularProgressStyled
                data-color={color}
                data-tone={tone}
            />
        </Backdrop>
    );
}

export default Spinner;
export { Spinner };
export type { SpinnerProps };
