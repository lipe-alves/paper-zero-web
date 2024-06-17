import ApiError, { ApiErrorParams } from "./ApiError";
import { RESPONSE_CODES } from "@shared/constants";

class ResourceNotFoundError<T> extends ApiError<T> {
    constructor(params: Partial<ApiErrorParams<T>> = {}) {
        const {
            status = 404,
            code = RESPONSE_CODES.RESOURCE_NOT_FOUND,
            message = "Recurso não encontrado",
            data = {} as T,
        } = params;

        super({ ...params, status, code, message, data });
    }
}

export default ResourceNotFoundError;
export { ResourceNotFoundError };
