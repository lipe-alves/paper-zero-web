"use client";

import React, { useState, forwardRef } from "react";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import type { TextFieldProps } from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

import { classNames, onEnterPress } from "@shared/utils";

import { EyeOff2 } from "styled-icons/evaicons-solid";
import { EyeOutline } from "styled-icons/evaicons-outline";

import styles from "./styles.module.scss";

const TextFieldStyled = styled(TextField)<TextFieldProps>(({ theme }) => ({
    "& .MuiInputLabel-root": {
        transform: "none",
        width: "fit-content",
        maxWidth: "100%",
        lineHeight: 1.153,
        position: "relative",
        fontSize: theme.typography.body2.fontSize,
        marginBottom: theme.spacing(1),
        color: "var(--text-30)",

        "&:not(.Mui-error).MuiFormLabel-colorPrimary.Mui-focused": {
            color: "var(--highlight-50) !important",
        },
        "&.Mui-disabled": {
            color: "var(--text-30)",
        },
        "&.Mui-error": {
            color: "var(--error-50)",
        },
    },
    "& .MuiInputBase-root": {
        backgroundColor: "transparent !important",
        border: `1px solid var(--text-80)`,

        "&:not(.Mui-focused):not(.Mui-disabled):not(.Mui-error):hover": {
            borderColor: "var(--text-50)",
        },
        "&:before, &:after": {
            display: "none",
        },
        "&.MuiInputBase-sizeSmall": {
            borderRadius: theme.shape.borderRadius,
        },
        "&.Mui-error": {
            borderColor: "var(--error-50)",
        },
        "&.Mui-focused": {
            borderWidth: 2,
            "& .MuiInputBase-input:not(.MuiInputBase-readOnly):not([readonly])::placeholder":
                {
                    transform: "translateX(4px)",
                },
            "& :not(textarea).MuiFilledInput-input": {
                padding: "6.25px 13px",
            },
            "&:not(.Mui-error).MuiInputBase-colorPrimary": {
                borderColor: "var(--highlight-50)",
                boxShadow: "var(--highlight-50)",
            },
            "&.MuiInputBase-colorSecondary": {
                borderColor: "var(--highlight-50)",
            },
            "&.MuiInputBase-colorInfo": {
                borderColor: "var(--info-50)",
            },
            "&.MuiInputBase-colorSuccess": {
                borderColor: "var(--success-50)",
            },
            "&.MuiInputBase-colorWarning": {
                borderColor: "var(--warning-50)",
            },
            "&.MuiInputBase-colorError": {
                borderColor: "var(--error-50)",
            },
            "&.Mui-error": {
                borderColor: "var(--error-50)",
            },
        },
        "&.Mui-disabled": {
            backgroundColor: "var(--mui-palette-action-hover) !important",
        },
    },

    // Adornments
    "& .MuiInputAdornment-root": {
        marginBlockStart: "0px !important",
        "&.MuiInputAdornment-positionStart + .MuiInputBase-input:not(textarea)":
            {
                paddingInlineStart: "0px !important",
            },
    },
    "& .MuiInputBase-inputAdornedEnd.MuiInputBase-input": {
        paddingInlineEnd: "0px !important",
    },

    "& .MuiInputBase-sizeSmall.MuiInputBase-adornedStart.Mui-focused": {
        paddingInlineStart: "13px",
        "& .MuiInputBase-input": {
            paddingInlineStart: "0px !important",
        },
    },
    "& .MuiInputBase-sizeSmall.MuiInputBase-adornedStart": {
        paddingInlineStart: "14px",
    },
    "& .MuiInputBase-sizeSmall.MuiInputBase-adornedEnd": {
        paddingInlineEnd: "14px",
    },
    "& .MuiInputBase-sizeSmall.MuiInputBase-adornedEnd.Mui-focused:not(.MuiAutocomplete-inputRoot)":
        {
            paddingInlineEnd: "13px",
            "& .MuiInputBase-input": {
                paddingInlineEnd: "0px !important",
            },
        },
    "& :not(.MuiInputBase-sizeSmall).MuiInputBase-adornedStart.Mui-focused": {
        paddingInlineStart: "15px",
        "& .MuiInputBase-input": {
            paddingInlineStart: "0px !important",
        },
    },
    "& :not(.MuiInputBase-sizeSmall).MuiInputBase-adornedStart": {
        paddingInlineStart: "16px",
    },
    "& :not(.MuiInputBase-sizeSmall).MuiInputBase-adornedEnd.Mui-focused": {
        paddingInlineEnd: "15px",
        "& .MuiInputBase-input": {
            paddingInlineEnd: "0px !important",
        },
    },
    "& :not(.MuiInputBase-sizeSmall).MuiInputBase-adornedEnd": {
        paddingInlineEnd: "16px",
    },
    "& .MuiInputAdornment-sizeMedium": {
        "i, svg": {
            fontSize: "1.25rem",
        },
    },

    "& .MuiInputBase-input": {
        "&:not(textarea).MuiInputBase-inputSizeSmall": {
            padding: "7.25px 14px",
        },
        "&:not(.MuiInputBase-readOnly):not([readonly])::placeholder": {
            transition: theme.transitions.create(["opacity", "transform"], {
                duration: theme.transitions.duration.shorter,
            }),
        },
    },
    "& :not(.MuiInputBase-sizeSmall).MuiInputBase-root": {
        borderRadius: "8px",
        fontSize: "17px",
        lineHeight: "1.41",
        "& .MuiInputBase-input": {
            padding: "10.8px 16px",
        },
        "&.Mui-focused": {
            "& .MuiInputBase-input": {
                padding: "9.8px 15px",
            },
        },
    },
    "& .MuiFormHelperText-root": {
        lineHeight: 1.154,
        margin: theme.spacing(1, 0, 0),
        fontSize: theme.typography.body2.fontSize,
        "&.Mui-error": {
            color: "var(--error-50)",
        },
        "&.Mui-disabled": {
            color: "var(--text-10)",
        },
    },

    // For Select
    "& .MuiSelect-select.MuiInputBase-inputSizeSmall, & .MuiNativeSelect-select.MuiInputBase-inputSizeSmall":
        {
            "& ~ i, & ~ svg": {
                inlineSize: "1.125rem",
                blockSize: "1.125rem",
            },
        },
    "& .MuiSelect-select": {
        // lineHeight: 1.5,
        minHeight: "unset !important",
        lineHeight: "1.4375em",
        "&.MuiInputBase-input": {
            paddingInlineEnd: "32px !important",
        },
    },
    "& .Mui-focused .MuiSelect-select": {
        "& ~ i, & ~ svg": {
            right: "0.9375rem",
        },
    },

    "& .MuiSelect-select:focus, & .MuiNativeSelect-select:focus": {
        backgroundColor: "transparent",
    },

    "& .MuiFilledInput-input": {
        color: "var(--text-50)",
    },

    // For Autocomplete
    "& :not(.MuiInputBase-sizeSmall).MuiAutocomplete-inputRoot": {
        paddingBlock: "5.55px",
        "& .MuiAutocomplete-input": {
            paddingInline: "8px !important",
            paddingBlock: "5.25px !important",
        },
        "&.Mui-focused .MuiAutocomplete-input": {
            paddingInlineStart: "7px !important",
        },
        "&.Mui-focused": {
            paddingBlock: "4.55px !important",
        },
        "& .MuiAutocomplete-endAdornment": {
            top: "calc(50% - 12px)",
        },
    },
    "& .MuiAutocomplete-inputRoot.MuiInputBase-sizeSmall": {
        paddingBlock: "4.75px !important",
        paddingInlineStart: "10px",
        "&.Mui-focused": {
            paddingBlock: "3.75px !important",
            paddingInlineStart: "9px",
            ".MuiAutocomplete-input": {
                paddingBlock: "2.5px",
                paddingInline: "3px !important",
            },
        },
        "& .MuiAutocomplete-input": {
            paddingInline: "3px !important",
        },
    },
    "& .MuiAutocomplete-inputRoot": {
        display: "flex",
        gap: "0.25rem",
        "& .MuiAutocomplete-tag": {
            margin: 0,
        },
    },
    "& .MuiAutocomplete-inputRoot.Mui-focused .MuiAutocomplete-endAdornment": {
        right: ".9375rem",
    },

    // For Textarea
    "& .MuiInputBase-multiline": {
        "&.MuiInputBase-sizeSmall": {
            padding: "6px 14px",
            "&.Mui-focused": {
                padding: "5px 13px",
            },
        },
        "& textarea.MuiInputBase-inputSizeSmall:placeholder-shown": {
            overflowX: "hidden",
        },
    },
}));

interface InputProps
    extends Omit<
        TextFieldProps<"filled">,
        "error" | "variant" | "autoComplete"
    > {
    type?: string;
    error?: string;
    hint?: string;
    autoComplete?: boolean;
    onEnter?: (evt: React.KeyboardEvent<HTMLInputElement>) => void;
}

const Input = forwardRef<HTMLInputElement | null, InputProps>((props, ref) => {
    let {
        className = "",
        type = "text",
        error,
        hint,
        onEnter,
        onKeyDown,
        InputProps,
        InputLabelProps,
        size,
        autoComplete = false,
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
        <TextFieldStyled
            {...rest}
            className={classNames(styles.Input, className)}
            size={size}
            inputRef={ref}
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
            variant="filled"
            InputLabelProps={{ ...InputLabelProps, shrink: true }}
            autoComplete={autoComplete ? "on" : "off"}
        />
    );
});

export default Input;
export { Input };
export type { InputProps };
