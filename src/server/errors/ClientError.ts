import APIError, { APIErrorParams } from "./APIError";
import { RESPONSE_CODES } from "@shared/constants";

class ClientError<T> extends APIError<T> {
    constructor(params: Partial<APIErrorParams<T>> = {}) {
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
