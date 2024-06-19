import { Middleware } from "@server/types";

const pathsToMatch = ["/api"];

const bodyToJsonMiddleware = async function (req) {
    const pathname = req.nextUrl.pathname;
    const matched = pathsToMatch.some((pattern) =>
        new RegExp(pattern).test(pathname)
    );

    if (!matched) {
        return;
    }

    req.body = await req.json();
} as Middleware;

export { bodyToJsonMiddleware };
export default bodyToJsonMiddleware;
