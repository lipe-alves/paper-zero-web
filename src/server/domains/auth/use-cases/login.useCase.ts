import { UseCase } from "@server/types";
import { WrongEmail, WrongPassword } from "@server/domains/auth/errors";
import { AuthService } from "@server/domains/auth/services";
import { UserService } from "@server/domains/users/services";

import { User } from "@shared/models";

interface LoginUseCaseInput {
    email: string;
    password: string;
}

interface LoginUseCaseOutput {
    user: User;
}

const loginUseCase = async function (input) {
    const { email, password } = input;

    const allUsers = UserService.listAllUsers();

    const userMatch = allUsers.find((user) => user.email === email);
    if (!userMatch) {
        throw new WrongEmail();
    }

    const passwordMatches = userMatch.password === password;
    if (!passwordMatches) {
        throw new WrongPassword();
    }

    AuthService.login(userMatch);

    return { user: userMatch };
} as UseCase<LoginUseCaseInput, LoginUseCaseOutput>;

export default loginUseCase;
export { loginUseCase };
export type { LoginUseCaseInput, LoginUseCaseOutput };
