import APIError, { APIErrorParams } from "@server/errors/APIError";
import { RESPONSE_CODES } from "@shared/constants";

class Unauthenticated<T> extends APIError<T> {
    constructor(params: Partial<APIErrorParams<T>> = {}) {
        const {
            status = 401,
            code = RESPONSE_CODES.UNAUTHENTICATED,
            message = "Você não está mais autenticado",
            data = {} as T,
        } = params;

        super({ ...params, status, code, message, data });
    }
}

export default Unauthenticated;
export { Unauthenticated };
