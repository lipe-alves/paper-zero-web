import axios, { AxiosInstance } from "axios";

interface ApiServiceConfig {
    baseURL: string;
    timeout?: number;
}

interface Body {
    [key: string]: any;
}

interface ApiServiceModel {
    post<T>(path: string, body?: Body): Promise<T>;
    put<T>(path: string, body?: Body): Promise<T>;
    patch<T>(path: string, body?: Body): Promise<T>;
    get<T>(path: string): Promise<T>;
}

class ApiService implements ApiServiceModel {
    private endpoint: AxiosInstance;

    private constructor(config: ApiServiceConfig) {
        const { baseURL, timeout = 0 } = config;

        this.endpoint = axios.create({
            baseURL,
            timeout,
        });
    }

    public async get<T>(path: string): Promise<T> {
        const { data } = await this.endpoint.get(path);
        return data as T;
    }

    public async post<T>(path: string, body?: Body): Promise<T> {
        const { data } = await this.endpoint.post(path, body);
        return data as T;
    }

    public async put<T>(path: string, body?: Body): Promise<T> {
        const { data } = await this.endpoint.put(path, body);
        return data as T;
    }

    public async patch<T>(path: string, body?: Body): Promise<T> {
        const { data } = await this.endpoint.patch(path, body);
        return data as T;
    }

    public static create(config: ApiServiceConfig): ApiService {
        return new ApiService(config);
    }
}

export default ApiService;
export { ApiService };