import { PrismaUserRepository } from "../../repositories/prisma/prisma-users-repository";
import { AuthenticateUserUseCase as AutheUserUseCase } from "../auth-use-case";

export function makeAuthUseCase(): AutheUserUseCase {
    const prismaUserRepository = new PrismaUserRepository();
    const authUserUseCase = new AutheUserUseCase(prismaUserRepository);

    return authUserUseCase;
}