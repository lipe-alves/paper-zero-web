import React from "react";
import {
    Button as MuiButton,
    ButtonProps as MuiButtonProps,
} from "@mui/material";
import { ButtonVariant, Color, Tone } from "@shared/types";
import styles from "./styles.module.scss";

interface ButtonProps extends Omit<MuiButtonProps, "variant" | "color"> {
    variant?: ButtonVariant;
    color?: Color;
    tone?: Tone;
}

function Button(props: ButtonProps) {
    const {
        children,
        className = "",
        variant = "outlined",
        color = "primary",
        tone = "50",
        ...rest
    } = props;
    return (
        <MuiButton
            {...rest}
            className={`${styles.Button} ${className}`.trim()}
            data-variant={variant}
            data-color={color}
            data-tone={tone}
        >
            {children}
        </MuiButton>
    );
}

export default Button;
export { Button };
export type { ButtonProps };
