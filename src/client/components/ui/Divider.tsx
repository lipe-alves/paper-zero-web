"use client";

import React, { forwardRef } from "react";
import { Divider as MuiDivider } from "@mui/material";
import type { DividerProps as MuiDividerProps } from "@mui/material";
import { styled } from "@mui/material";

import { Color, Tone } from "@client/types";
import { COLOR_TYPES, TONES } from "@client/constants";

const DividerStyled = styled(MuiDivider)<MuiDividerProps>(() => {
    const style = {
        "&": {
            width: "100%",
            marign: "16px 0",
        },
    } as any;

    for (const colorType of COLOR_TYPES) {
        for (const tone of TONES) {
            const selector = `&[data-color="${colorType}"][data-tone="${tone}"]`;
            const color = `var(--${colorType}-${tone})`;

            style[selector] = {
                color,
            };

            style[`${selector}:before, ${selector}:after`] = {
                borderTop: `thin solid ${color}`,
                opacity: 0.2,
            };
        }
    }

    return style;
});

interface DividerProps extends MuiDividerProps {
    color?: Color;
    tone?: Tone;
}

const Divider = forwardRef<HTMLHRElement | null, DividerProps>((props, ref) => {
    const { color = "text", tone = "50" } = props;

    return (
        <DividerStyled
            {...props}
            ref={ref}
            data-color={color}
            data-tone={tone}
        />
    );
});

export default Divider;
export { Divider };
export type { DividerProps };
