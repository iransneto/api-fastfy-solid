import { compare } from "bcryptjs";
import { IUsersRepository } from "../repositories/users-repository";
import { UserNotFoundError } from "./errors/user-not-found";
import { UserInvalidCredentialsError } from "./errors/user-invalid-credentials";
import { User } from "@prisma/client";

interface AuthenticateUserRequest {
    email: string;
    password: string;

}

interface AuthenticateUserResponse {
    user: User
}

export class AuthenticateUserUseCase {
    constructor(private usersRepository: IUsersRepository) {}

    async execute({email, password}: AuthenticateUserRequest): Promise<AuthenticateUserResponse> {
        const user = await this.usersRepository.findByEmail(email);

        if(!user) {
            throw new UserNotFoundError();
        }

        const doesPasswordMatch = await compare(password, user.password_hash)

        if(!doesPasswordMatch) {
            throw new UserInvalidCredentialsError()
        }

        return {user}
    }
}