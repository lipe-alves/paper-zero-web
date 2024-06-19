import { Middleware } from "@server/types";

const pathsToMatch = ["/api"];

const loggerMiddleware = async function (req) {
    const pathname = req.nextUrl.pathname;
    const matched = pathsToMatch.some((pattern) =>
        new RegExp(pattern).test(pathname)
    );

    if (!matched) {
        return;
    }

    const origin = req.headers.get("origin");
    const method = req.method;
    const url = req.url;
    let body = {};

    try {
        body = await req.json();
    } catch {
        body = {};
    }

    console.log("Request Origin -", origin);
    console.log("Method -", method);
    console.log("URL -", url);
    console.log("Pathname -", pathname);
    console.log("Date -", new Date());
    console.log("QUERY:", JSON.stringify(req.query || {}, null, 2));
    console.log("BODY:", JSON.stringify(body || {}, null, 2));
    console.log("PARAMS:", JSON.stringify(req.params || {}, null, 2));
} as Middleware;

export { loggerMiddleware };
export default loggerMiddleware;
