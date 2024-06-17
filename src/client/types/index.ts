export interface ContextProviderProps {
    children: React.ReactNode;
}

export type Color =
    | "primary"
    | "secondary"
    | "text"
    | "info"
    | "success"
    | "warning"
    | "error";
export type InputVariant = "filled" | "outlined" | "standard";
export type ButtonVariant = "contained" | "outlined";
export type Tone =
    | "00"
    | "10"
    | "20"
    | "30"
    | "40"
    | "50"
    | "60"
    | "70"
    | "80"
    | "90"
    | "100";
