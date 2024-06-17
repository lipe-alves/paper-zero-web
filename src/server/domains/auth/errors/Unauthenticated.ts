import ApiError, { ApiErrorParams } from "@root/server/errors/ApiError";
import { RESPONSE_CODES } from "@shared/constants";

class Unauthenticated<T> extends ApiError<T> {
    constructor(params: Partial<ApiErrorParams<T>> = {}) {
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
