import { RESPONSE_CODES } from "@shared/constants";

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type { ReplaceMatrix, Dictionary, Language } from "@shared/i18n";

export type EntityId = string | number;
export type MediaType = "video" | "photo";
export type Operator =
    | "<"
    | "<="
    | "=="
    | "!="
    | ">="
    | ">"
    | "array-contains"
    | "in"
    | "not-in"
    | "array-contains-any";

export type Direction = "asc" | "desc";

export type ResponseCode = (typeof RESPONSE_CODES)[keyof typeof RESPONSE_CODES];

export interface ResponseFormat<Data> {
    code: ResponseCode;
    status: number;
    success: boolean;
    message: string;
    data: Data;
}
