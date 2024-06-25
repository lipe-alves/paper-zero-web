"use client";

import React, { forwardRef } from "react";
import { IconButton as MuiIconButton } from "@mui/material";
import type { IconButtonProps as MuiIconButtonProps } from "@mui/material";
import { styled } from "@mui/material";

import { Color, Tone } from "@client/types";
import { classNames } from "@shared/utils";

import styles from "./styles.module.scss";

const IconButtonStyled = styled(MuiIconButton)<MuiIconButtonProps>(() => ({}));

interface IconButtonProps extends Omit<MuiIconButtonProps, "color"> {
    color?: Color;
    tone?: Tone;
}

const IconButton = forwardRef<HTMLButtonElement | null, IconButtonProps>(
    (props, ref) => {
        const {
            className = "",
            children,
            color = "primary",
            tone = "50",
            ...rest
        } = props;

        return (
            <IconButtonStyled
                {...rest}
                ref={ref}
                className={classNames(styles.IconButton, className)}
                data-color={color}
                data-tone={tone}
            >
                {children}
            </IconButtonStyled>
        );
    }
);

export default IconButton;
export { IconButton };
export type { IconButtonProps };
