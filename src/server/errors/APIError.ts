import { ResponseCode, ResponseFormat } from "@shared/types";
import { RESPONSE_CODES } from "@shared/constants";

interface APIErrorParams<T> {
    status: number;
    code: ResponseCode;
    message: string;
    data: T;
}

class APIError<T> extends Error implements ResponseFormat<T> {
    public readonly success: false;
    public status: number;
    public code: ResponseCode;
    public data: T;

    constructor(params: APIErrorParams<T>) {
        const { message, status, code, data } = params;
        super(message);

        this.success = false;
        this.status = status;
        this.code = code;
        this.data = data;
    }

    public static from(error: any): APIError<any> {
        return new APIError<any>({
            status: error.status || 500,
            code: error.code || RESPONSE_CODES.INTERNAL_SERVER_ERROR,
            message: error.message || "Erro Interno do Servidor",
            data: error,
        });
    }
}

export default APIError;
export { APIError };
export type { APIErrorParams };
