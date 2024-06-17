import { APIResponse } from "@server/services";
import { Controller } from "@server/types";
import { APIError, ClientError } from "@server/errors";
import { User } from "@shared/models";

import { RESPONSE_CODES } from "@shared/constants";
import { validator } from "@shared/utils";

import { loginUser } from "../use-cases";

interface LoginResponseData {
    user: User;
}

const loginController: Controller<LoginResponseData> = async (req) => {
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

        return APIResponse.send({
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
        return APIResponse.send(APIError.from(error));
    }
};

export { loginController };
export default loginController;
