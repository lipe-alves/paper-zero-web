import { ApiResponse } from "@server/services";
import { Controller, RequestData } from "@server/types";
import { ApiError } from "@server/errors";
import { RESPONSE_CODES } from "@shared/constants";

type PingInput = RequestData;

interface PingOutput {
    url?: string;
    cookies?: RequestData["cookies"];
    headers?: RequestData["headers"];
    query?: RequestData["query"];
    body?: RequestData["body"];
    date: Date;
}

const pingController = async function (req) {
    const { email, password } = req.body;

    try {
        return ApiResponse.send({
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
    } catch (error) {
        return ApiResponse.send(ApiError.from(error));
    }
} as Controller<PingInput, PingOutput>;

export { pingController };
export type { PingInput, PingOutput };
export default pingController;
