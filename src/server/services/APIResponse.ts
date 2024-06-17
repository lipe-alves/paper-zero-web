import { ResponseFormat } from "@shared/types";

class APIResponse<T> extends Response {
    public override json(): Promise<T> {
        return super.json() as Promise<T>;
    }

    public static send<T>(data: ResponseFormat<T>) {
        return APIResponse.json(data, { status: data.status });
    }
}

export default APIResponse;
export { APIResponse };
