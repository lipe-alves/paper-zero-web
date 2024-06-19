import { ApiResponse } from "@server/services";
import { Controller, RequestData } from "@server/types";
import { ApiError, ClientError } from "@server/errors";

import { User } from "@shared/models";
import { RESPONSE_CODES } from "@shared/constants";
import { validator } from "@shared/utils";

import { loginUseCase } from "../use-cases";

interface LoginControllerInput extends RequestData {
    body: {
        email?: string;
        password?: string;
    };
}

interface LoginControllerOutput {
    user: User;
}

const loginController = async function (req) {
    try {
        const body = await req.json();
        const { email, password } = body;

        if (!email) {
            throw new ClientError({
                message: "Email é obrigatório",
            });
        }

        if (!validator.email(email)) {
            throw new ClientError({
                message: "Email inválido",
            });
        }

        if (!password) {
            throw new ClientError({
                message: "Senha é obrigatória",
            });
        }

        const { user } = await loginUseCase({ email, password });

        return ApiResponse.send({
            status: 200,
            success: true,
            code: RESPONSE_CODES.SUCCESS,
            message: "Logado com sucesso!",
            data: {
                user,
            },
        });
    } catch (error) {
        return ApiResponse.send(ApiError.from(error));
    }
} as Controller<LoginControllerInput, LoginControllerOutput>;

export { loginController };
export type { LoginControllerInput, LoginControllerOutput };
export default loginController;
