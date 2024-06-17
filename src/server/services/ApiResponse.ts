import { ResponseFormat } from "@shared/types";

class ApiResponse<T> extends Response {
    public override json(): Promise<T> {
        return super.json() as Promise<T>;
    }

    public static send<T>(data: ResponseFormat<T>) {
        return ApiResponse.json(data, { status: data.status });
    }
}

export default ApiResponse;
export { ApiResponse };
