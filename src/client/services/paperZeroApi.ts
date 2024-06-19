import { PingControllerOutput } from "@server/domains/tests/controllers";
import {
    SessionControllerOutput,
    LoginControllerOutput,
    RegisterControllerOutput,
} from "@server/domains/auth/controllers";

import { ResponseFormat } from "@shared/types";
import { ApiService } from "@shared/services";

const endpoint = ApiService.create({
    baseURL: "/api",
    timeout: 0,
    error: (error) => {
        const err = error.response.data as Error;
        return err;
    },
});

const paperZeroApi = {
    endpoint,

    tests: {
        async ping(): Promise<ResponseFormat<PingControllerOutput>> {
            const data = await endpoint.get("/tests/ping");
            return data;
        },
    },

    auth: {
        async login(
            email: string,
            password: string
        ): Promise<ResponseFormat<LoginControllerOutput>> {
            const data = await endpoint.post("/auth/login", {
                email,
                password,
            });
            return data;
        },
        async logout() {
            await endpoint.post("/auth/logout");
        },
        async recoverSession(): Promise<
            ResponseFormat<SessionControllerOutput>
        > {
            const data = await endpoint.get("/auth/session");
            return data;
        },
        async register(
            name: string,
            email: string,
            password: string
        ): Promise<ResponseFormat<RegisterControllerOutput>> {
            const data = await endpoint.put("/auth/register", {
                name,
                email,
                password,
            });
            return data;
        },
    },
};

export default paperZeroApi;
export { paperZeroApi };
