import { PrismaCheckinRepository } from "../../repositories/prisma/prisma-checkin-repository";
import { PrismaUserRepository } from "../../repositories/prisma/prisma-users-repository";
import { ValidateCheckinUserUseCase } from "../validate-check-in-use-case";

export function makeValidateCheckInUseCase() {
    const prismaCheckinRepository = new PrismaCheckinRepository();
    const validateCheckInUseCase = new ValidateCheckinUserUseCase(prismaCheckinRepository);

    return validateCheckInUseCase;
}