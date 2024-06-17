import type { NextApiRequest } from "next";
import { ApiResponse } from "@server/services";
import { ResponseFormat } from "@shared/types";

export interface RequestData {
    query: Partial<{
        [key: string]: string | string[];
    }>;
    cookies: Partial<{
        [key: string]: string;
    }>;
    params: Partial<{
        [key: string]: string;
    }>;
    body: Partial<{
        [key: string]: string;
    }>;
}

export interface ApiRequest<InputData extends RequestData>
    extends NextApiRequest {
    query: InputData["query"];
    params: InputData["params"];
    body: InputData["body"];
    cookies: InputData["cookies"];
}

export type Middleware<T extends RequestData> = (
    req: ApiRequest<T>
) => void | Promise<void>;

export type Controller<InputData extends RequestData, OutputData> = (
    req: ApiRequest<InputData>
) => ApiResponse<OutputData> | Promise<ApiResponse<OutputData>>;
