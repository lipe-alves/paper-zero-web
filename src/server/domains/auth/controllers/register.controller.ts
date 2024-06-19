import { ApiResponse } from "@server/services";
import { Controller, RequestData } from "@server/types";
import { ApiError, ClientError } from "@server/errors";

import { User } from "@shared/models";
import { RESPONSE_CODES } from "@shared/constants";
import { validator } from "@shared/utils";

import { registerUseCase } from "../use-cases";

interface RegisterControllerInput extends RequestData {
    body: {
        name?: string;
        email?: string;
        password?: string;
    };
}

interface RegisterControllerOutput {
    user: User;
}

const registerController = async function (req) {
    try {
        const body = await req.json();
        const { name, email, password } = body;

        if (!name) {
            throw new ClientError({
                message: "Nome é obrigatório",
            });
        }

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

        const { user } = await registerUseCase({ name, email, password });

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
} as Controller<RegisterControllerInput, RegisterControllerOutput>;

export { registerController };
export type { RegisterControllerInput, RegisterControllerOutput };
export default registerController;
