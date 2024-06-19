import { ApiResponse } from "@server/services";
import { Controller, RequestData } from "@server/types";
import { ApiError } from "@server/errors";
import { Unauthenticated } from "@server/domains/auth/errors";

import { recoverSessionUseCase } from "../use-cases";

import { User } from "@shared/models";
import { RESPONSE_CODES } from "@shared/constants";

type SessionControllerInput = RequestData;

interface SessionControllerOutput {
    token: string;
    user: User;
}

const recoverSessionController = async function (req) {
    try {
        const { user } = await recoverSessionUseCase({});

        if (!user) {
            throw new Unauthenticated();
        }

        return ApiResponse.send({
            status: 200,
            success: true,
            code: RESPONSE_CODES.SUCCESS,
            message: "Logado com sucesso!",
            data: {
                user,
                token: "",
            },
        });
    } catch (error) {
        return ApiResponse.send(ApiError.from(error));
    }
} as Controller<SessionControllerInput, SessionControllerOutput>;

export { recoverSessionController };
export type { SessionControllerInput, SessionControllerOutput };
export default recoverSessionController;
