import { Controller } from "@server/types";
import { responseCodes } from "@server/constants";
import { APIResponse } from "@server/utils";
import { recoverSession } from "@server/use-cases/auth";
import { APIError } from "@server/errors";
import { Session, User } from "@server/models";

interface SessionRecoveryResponseData {
    session: Session;
    user: User;
}

const GET: Controller<SessionRecoveryResponseData> = async (req) => {
    try {
        const { user, session } = await recoverSession();

        return APIResponse.send({
            status: 200,
            success: true,
            code: responseCodes.SUCCESS,
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

export { GET };
export type { SessionRecoveryResponseData };
