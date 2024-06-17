import { APIResponse } from "@server/services";
import { Controller } from "@shared/types";
import { RESPONSE_CODES } from "@shared/constants";
import { IncomingHttpHeaders } from "http";

interface PingResponseData {
    url?: string;
    cookies?: Partial<{ [key: string]: string }>;
    headers?: IncomingHttpHeaders;
    query?: Partial<{ [key: string]: string | string[] }>;
    body?: Partial<{ [key: string]: string }>;
    date: Date;
}

const GET: Controller<PingResponseData> = (req) => {
    return APIResponse.send({
        status: 200,
        code: RESPONSE_CODES.SUCCESS,
        success: true,
        message: "Ping!",
        data: {
            url: req.url,
            cookies: req.cookies,
            headers: req.headers,
            query: req.query,
            body: req.body,
            date: new Date(),
        },
    });
};

export { GET };
export type { PingResponseData };
