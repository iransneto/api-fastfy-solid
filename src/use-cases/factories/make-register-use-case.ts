import { PrismaUserRepository } from "../../repositories/prisma/prisma-users-repository";
import { RegisterUserUseCase } from "../register-use-case";

export function makeRegisterUseCase(): RegisterUserUseCase {
    const prismaUserRepository = new PrismaUserRepository();
    const registerUserUseCase = new RegisterUserUseCase(prismaUserRepository);

    return registerUserUseCase;
}