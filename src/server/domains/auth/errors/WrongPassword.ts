import ApiError, { ApiErrorParams } from "@root/server/errors/ApiError";
import { RESPONSE_CODES } from "@shared/constants";

class WrongPassword<T> extends ApiError<T> {
    constructor(params: Partial<ApiErrorParams<T>> = {}) {
        const {
            status = 401,
            code = RESPONSE_CODES.UNAUTHORIZED,
            message = "Senha incorreta",
            data = {} as T,
        } = params;

        super({ ...params, status, code, message, data });
    }
}

export default WrongPassword;
export { WrongPassword };
