import React, { ReactNode } from "react";
import {
    Button as MuiButton,
    ButtonProps as MuiButtonProps,
} from "@mui/material";
import { ButtonVariant, Color, Tone } from "@client/types";
import styles from "./styles.module.scss";

interface ButtonProps extends Omit<MuiButtonProps, "variant" | "color"> {
    variant?: ButtonVariant;
    color?: Color;
    tone?: Tone;
    transparent?: boolean;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
}

function Button(props: ButtonProps) {
    const {
        children,
        className = "",
        variant = "outlined",
        color = "primary",
        tone = "50",
        transparent = false,
        leftIcon,
        rightIcon,
        ...rest
    } = props;
    return (
        <MuiButton
            {...rest}
            className={`${styles.Button} ${className}`.trim()}
            data-variant={variant}
            data-color={color}
            data-tone={tone}
            data-transparent={transparent}
            startIcon={leftIcon}
            endIcon={rightIcon}
        >
            {children}
        </MuiButton>
    );
}

export default Button;
export { Button };
export type { ButtonProps };
