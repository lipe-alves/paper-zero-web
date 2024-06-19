import { UseCase } from "@server/types";
import { WrongEmail, WrongPassword } from "@server/domains/auth/errors";
import { AuthService } from "@server/domains/auth/services";
import { UserService } from "@server/domains/users/services";

import { User } from "@shared/models";

interface RecoverSessionUseCaseInput {}

interface RecoverSessionUseCaseOutput {
    user: User | undefined;
}

const recoverSessionUseCase = async function () {
    const user = AuthService.getCurrentSession();
    return { user };
} as UseCase<RecoverSessionUseCaseInput, RecoverSessionUseCaseOutput>;

export default recoverSessionUseCase;
export { recoverSessionUseCase };
export type { RecoverSessionUseCaseInput, RecoverSessionUseCaseOutput };
