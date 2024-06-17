import APIError, { APIErrorParams } from "./APIError";
import { RESPONSE_CODES } from "@shared/constants";

class ResourceNotFoundError<T> extends APIError<T> {
    constructor(params: Partial<APIErrorParams<T>> = {}) {
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
