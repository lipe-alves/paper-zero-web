"use client";

import React, { useState } from "react";
import {
    IconButton,
    InputAdornment,
    TextField,
    TextFieldProps,
} from "@mui/material";

import { InputVariant } from "@root/shared/types";
import { onEnterPress } from "@shared/utils";

import { EyeOff2 } from "styled-icons/evaicons-solid";
import { EyeOutline } from "styled-icons/evaicons-outline";

import styles from "./styles.module.scss";

interface InputProps
    extends Omit<TextFieldProps<"outlined">, "error" | "variant"> {
    variant?: InputVariant;
    type?: string;
    error?: string;
    hint?: string;
    onEnter?: (evt: React.KeyboardEvent<HTMLInputElement>) => void;
}

function Input(props: InputProps) {
    let {
        className = "",
        variant = "outlined",
        type = "text",
        error,
        hint,
        onEnter,
        onKeyDown,
        InputProps,
        ...rest
    } = props;
    const hasError = !!error;
    if (error) error = `* ${error}`;

    const [showPassword, setShowPassword] = useState(false);

    const handleToggleShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    const handleOnKeyDown = (evt: React.KeyboardEvent<HTMLInputElement>) => {
        if (onEnter) {
            return onEnterPress(() => {
                onEnter(evt);
                if (onKeyDown) onKeyDown(evt);
            });
        } else if (onKeyDown) {
            onKeyDown(evt);
        }
    };

    return (
        <TextField
            {...rest}
            className={[styles.Input, className].join(" ")}
            variant={variant}
            error={hasError}
            type={
                type !== "password" ? type : showPassword ? "text" : "password"
            }
            helperText={error || hint}
            onKeyDown={handleOnKeyDown}
            InputProps={{
                ...InputProps,
                endAdornment:
                    type !== "password" ? (
                        InputProps?.endAdornment
                    ) : (
                        <InputAdornment position="end">
                            <IconButton
                                className={styles.InputPasswordToggler}
                                onClick={handleToggleShowPassword}
                                edge="end"
                            >
                                {!showPassword ? <EyeOff2 /> : <EyeOutline />}
                            </IconButton>
                        </InputAdornment>
                    ),
            }}
        />
    );
}

export default Input;
export { Input };
export type { InputProps };
