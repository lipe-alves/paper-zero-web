"use client";

import React, { forwardRef, ReactNode } from "react";
import { Checkbox as MuiCheckbox, FormControlLabel } from "@mui/material";
import type {
    CheckboxProps as MuiCheckboxProps,
    FormControlLabelProps,
} from "@mui/material";
import { styled } from "@mui/material";

const CheckboxStyled = styled(MuiCheckbox)<MuiCheckboxProps>(() => ({
    "&": {
        color: "var(--text-70)",

        "&.Mui-checked": {
            color: "var(--highlight-50)",
        },
    },
}));

const FormControlLabelStyled = styled(FormControlLabel)<FormControlLabelProps>(
    () => ({
        ".MuiFormControlLabel-label": {
            color: "var(--text-50) !important",
        },
    })
);

interface CheckboxProps {
    label?: ReactNode;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    checked?: boolean;
}

const Checkbox = forwardRef<HTMLButtonElement | null, CheckboxProps>(
    (props, ref) => {
        const { label, onChange = () => {}, checked = false } = props;

        return (
            <FormControlLabelStyled
                label={label}
                control={
                    <CheckboxStyled
                        ref={ref}
                        onChange={onChange}
                        checked={checked}
                    />
                }
            />
        );
    }
);

export default Checkbox;
export { Checkbox };
export type { CheckboxProps };
