import { ApiResponse } from "@server/services";
import { Controller, RequestData } from "@server/types";
import { ApiError, ClientError } from "@server/errors";
import { User } from "@shared/models";

import { RESPONSE_CODES } from "@shared/constants";
import { validator } from "@shared/utils";

import { loginUser } from "../use-cases";

interface LoginInputData extends RequestData {
    body: {
        email?: string;
        password?: string;
    };
}

interface LoginOutputData {
    user: User;
}

const loginController = async function (req) {
    const { email, password } = req.body;

    try {
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

        const { user, session } = await loginUser(email, password);

        return ApiResponse.send({
            status: 200,
            success: true,
            code: RESPONSE_CODES.SUCCESS,
            message: "Logado com sucesso!",
            data: {
                user,
                session,
            },
        });
    } catch (error) {
        return ApiResponse.send(ApiError.from(error));
    }
} as Controller<LoginInputData, LoginOutputData>;

export { loginController };
export default loginController;
