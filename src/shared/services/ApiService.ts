import axios, { AxiosInstance } from "axios";

interface ApiServiceConfig {
    baseURL: string;
    timeout?: number;
    success?: (response: any) => any;
    error?: (response: any) => any;
}

interface Body {
    [key: string]: any;
}

interface ApiServiceModel {
    post<T = any>(path: string, body?: Body): Promise<T>;
    put<T = any>(path: string, body?: Body): Promise<T>;
    patch<T = any>(path: string, body?: Body): Promise<T>;
    get<T = any>(path: string): Promise<T>;
}

class ApiService implements ApiServiceModel {
    private endpoint: AxiosInstance;

    private constructor(config: ApiServiceConfig) {
        const { baseURL, timeout = 0, success, error } = config;

        this.endpoint = axios.create({
            baseURL,
            timeout,
        });

        this.endpoint.interceptors.response.use(
            (data) => {
                if (!success) return data;
                return success(data);
            },
            (data) => {
                if (!error) return Promise.reject(data);
                return Promise.reject(error(data));
            }
        );
    }

    public async get<T = any>(path: string): Promise<T> {
        const { data } = await this.endpoint.get(path);
        return data as T;
    }

    public async post<T = any>(path: string, body?: Body): Promise<T> {
        const { data } = await this.endpoint.post(path, body);
        return data as T;
    }

    public async put<T = any>(path: string, body?: Body): Promise<T> {
        const { data } = await this.endpoint.put(path, body);
        return data as T;
    }

    public async patch<T = any>(path: string, body?: Body): Promise<T> {
        const { data } = await this.endpoint.patch(path, body);
        return data as T;
    }

    public static create(config: ApiServiceConfig): ApiService {
        return new ApiService(config);
    }
}

export default ApiService;
export { ApiService };
