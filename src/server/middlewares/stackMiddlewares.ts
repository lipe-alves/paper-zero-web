import { Middleware, ApiRequest } from "@server/types";

function stackMiddlewares(middlewares: Middleware[]) {
    return async (req: ApiRequest<any>) => {
        for (const middleware of middlewares) {
            const response = await middleware(req);
            if (response) return response;
        }
    };
}

export default stackMiddlewares;
export { stackMiddlewares };
