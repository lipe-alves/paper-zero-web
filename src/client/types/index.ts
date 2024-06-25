import {
    THEME_LIST,
    COLOR_TYPES,
    INPUT_VARIANTS,
    BUTTON_VARIANTS,
    TONES,
} from "@client/constants";

export interface ContextProviderProps {
    children: React.ReactNode;
}

export type Color = (typeof COLOR_TYPES)[number];
export type InputVariant = (typeof INPUT_VARIANTS)[number];
export type ButtonVariant = (typeof BUTTON_VARIANTS)[number];
export type Tone = (typeof TONES)[number];
export type Theme = (typeof THEME_LIST)[number];
