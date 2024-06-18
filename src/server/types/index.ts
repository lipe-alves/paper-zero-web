import { ApiResponse } from "@server/services";

export interface RequestData {
    headers?: Partial<{
        [key: string]: string;
    }>;
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

export interface ApiRequest<InputData extends RequestData> extends Request {
    query: InputData["query"];
    params: InputData["params"];
    body: InputData["body"] & Request["body"];
    cookies: InputData["cookies"];
}

export type Middleware<T extends RequestData> = (
    req: ApiRequest<T>
) => void | Promise<void>;

export type Controller<InputData extends RequestData, OutputData> = (
    req: ApiRequest<InputData>
) => ApiResponse<OutputData> | Promise<ApiResponse<OutputData>>;

export type UseCase<InputData, OutputData> = (
    input: InputData
) => Promise<OutputData> | OutputData;
