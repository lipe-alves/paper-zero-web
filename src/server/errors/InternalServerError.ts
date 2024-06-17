import ApiError, { ApiErrorParams } from "./ApiError";
import { RESPONSE_CODES } from "@shared/constants";

class InternalServerError<T> extends ApiError<T> {
    constructor(params: Partial<ApiErrorParams<T>> = {}) {
        const {
            status = 500,
            code = RESPONSE_CODES.INTERNAL_SERVER_ERROR,
            message = "Erro Interno do Servidor",
            data = {} as T,
        } = params;

        super({ ...params, status, code, message, data });
    }
}

export default InternalServerError;
export { InternalServerError };
