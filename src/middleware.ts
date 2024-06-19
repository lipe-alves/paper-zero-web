import {
    stackMiddlewares,
    langMiddleware,
    loggerMiddleware,
} from "./server/middlewares";

const middlewares = [langMiddleware, loggerMiddleware];
const middleware = stackMiddlewares(middlewares);

const config = {
    matcher: ["*"],
};

export { middleware, config };
