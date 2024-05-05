import { PrismaCheckinRepository } from "../../repositories/prisma/prisma-checkin-repository";
import { PrismaGymsRepository } from "../../repositories/prisma/prisma-gyms-repository";
import { CheckinUserUseCase } from "../check-in-use-case";

export function makeCheckinUseCase() {
    const checkInRepository = new PrismaCheckinRepository();
    const gymsRepository = new PrismaGymsRepository();
    return new CheckinUserUseCase(checkInRepository, gymsRepository);
}