import { UseCase } from "@server/types";
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

    return { user: new User() };
} as UseCase<LoginUseCaseInput, LoginUseCaseOutput>;

export default loginUseCase;
export { loginUseCase };
export type { LoginUseCaseInput, LoginUseCaseOutput };
