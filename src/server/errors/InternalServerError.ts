import APIError, { APIErrorParams } from "./APIError";
import { RESPONSE_CODES } from "@shared/constants";

class InternalServerError<T> extends APIError<T> {
    constructor(params: Partial<APIErrorParams<T>> = {}) {
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
