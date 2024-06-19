import { UseCase } from "@server/types";
import { UserService } from "@server/domains/users/services";

import { User } from "@shared/models";
import { mergeListsByProperty } from "@shared/utils";

interface RegisterUseCaseInput {
    name: string;
    email: string;
    password: string;
}

interface RegisterUseCaseOutput {
    user: User;
}

const registerUseCase = async function (input) {
    const { name, email, password } = input;

    const user = new User({
        name,
        email,
        password,
    });

    UserService.registerUser(user);

    return { user };
} as UseCase<RegisterUseCaseInput, RegisterUseCaseOutput>;

export default registerUseCase;
export { registerUseCase };
export type { RegisterUseCaseInput, RegisterUseCaseOutput };
