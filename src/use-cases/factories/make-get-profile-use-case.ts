import { PrismaUserRepository } from "../../repositories/prisma/prisma-users-repository";
import { GetProfileUseCase } from "../get-profile-use-case";

export function makeGetProfileUseCase() {
    const prismaUserRepository = new PrismaUserRepository();
    const getProfileUseCase = new GetProfileUseCase(prismaUserRepository);

    return getProfileUseCase;
}