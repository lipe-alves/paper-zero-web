import { PingOutput } from "@server/domains/tests/controllers";
import {
    SessionControllerOutput,
    LoginControllerOutput,
} from "@server/domains/auth/controllers";

import { ResponseFormat } from "@shared/types";
import { ApiService } from "@shared/services";

const endpoint = ApiService.create({
    baseURL: "/api",
    timeout: 0,
});

const paperZeroApi = {
    endpoint,

    tests: {
        async ping(): Promise<ResponseFormat<PingOutput>> {
            const data = await endpoint.get<ResponseFormat<PingOutput>>(
                "/tests/ping"
            );
            return data;
        },
    },

    auth: {
        async login(
            email: string,
            password: string
        ): Promise<ResponseFormat<LoginControllerOutput>> {
            const data = await endpoint.post<
                ResponseFormat<LoginControllerOutput>
            >("/auth/login", { email, password });

            return data;
        },
        async logout() {
            await endpoint.post("/auth/logout");
        },
        async recoverSession(): Promise<
            ResponseFormat<SessionControllerOutput>
        > {
            const data = await endpoint.get<
                ResponseFormat<SessionControllerOutput>
            >("/auth/session");
            return data;
        },
    },
};

export default paperZeroApi;
export { paperZeroApi };
