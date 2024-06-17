import ApiError, { ApiErrorParams } from "./ApiError";
import { RESPONSE_CODES } from "@shared/constants";

class ClientError<T> extends ApiError<T> {
    constructor(params: Partial<ApiErrorParams<T>> = {}) {
        const {
            status = 400,
            code = RESPONSE_CODES.INTERNAL_SERVER_ERROR,
            message = "Erro do cliente",
            data = {} as T,
        } = params;

        super({ ...params, status, code, message, data });
    }
}

export default ClientError;
export { ClientError };
