import { ApiResponse } from "@server/services";
import type { NextRequest } from "next/server";

export interface RequestData {
    headers?: Partial<{
        [key: string]: string;
    }>;
    query: Partial<{
        [key: string]: string | string[];
    }>;
    params: Partial<{
        [key: string]: string;
    }>;
    body: Partial<{
        [key: string]: string;
    }>;
}

export interface ApiRequest<InputData extends RequestData> extends NextRequest {
    query: InputData["query"];
    params: InputData["params"];
    body: InputData["body"] & NextRequest["body"];
    cookies: NextRequest["cookies"];
}

export type Middleware<T extends RequestData = any> = (
    req: ApiRequest<T>
) => void | ApiResponde | Promise<void | ApiResponde>;

export type Controller<InputData extends RequestData, OutputData> = (
    req: ApiRequest<InputData>
) => ApiResponse<OutputData> | Promise<ApiResponse<OutputData>>;

export type UseCase<InputData, OutputData> = (
    input: InputData
) => Promise<OutputData> | OutputData;
