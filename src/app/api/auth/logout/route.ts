import { Controller } from "@server/types";
import { responseCodes } from "@server/constants";
import { APIResponse } from "@server/utils";
import { logoutUser } from "@server/use-cases/auth";
import { APIError } from "@server/errors";

type LogoutResponseData = void;

const POST: Controller<LogoutResponseData> = async (req) => {
    try {
        await logoutUser();

        return APIResponse.send({
            status: 200,
            success: true,
            code: responseCodes.SUCCESS,
            message: "Deslogado com sucesso!",
            data: {},
        });
    } catch (error) {
        return APIResponse.send(APIError.from(error));
    }
};

export { POST };
export type { LogoutResponseData };
