import {
    stackMiddlewares,
    bodyToJsonMiddleware,
    langMiddleware,
    loggerMiddleware,
} from "./server/middlewares";

const middlewares = [langMiddleware, bodyToJsonMiddleware, loggerMiddleware];
const middleware = stackMiddlewares(middlewares);

const config = {
    matcher: ["*"],
};

export { middleware, config };
