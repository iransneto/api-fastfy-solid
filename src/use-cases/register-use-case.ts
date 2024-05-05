import { hash } from "bcryptjs";
import { IUsersRepository } from "../repositories/users-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";
import { User } from "@prisma/client";

interface RegisterUseCaseRequest {
    name: string;
    email: string;
    password: string;
}

interface RegisterUserUseCaseResponse {
    user: User;

}

export class RegisterUserUseCase {

    constructor(
        private userRepository: IUsersRepository
    ) { }
    async execute({
        name,
        email,
        password,
    }: RegisterUseCaseRequest): Promise<RegisterUserUseCaseResponse> {
        const password_hash = await hash(password, 6);

        const isSameEmail = await this.userRepository.findByEmail(email)

        if (isSameEmail) throw new UserAlreadyExistsError();

        const user: User = await this.userRepository.create({
            name,
            email,
            password_hash
        });

        return { user };


    }
}


