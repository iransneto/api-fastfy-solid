import { PrismaCheckinRepository } from "../../repositories/prisma/prisma-checkin-repository";
import { PrismaGymsRepository } from "../../repositories/prisma/prisma-gyms-repository";
import { CheckinUserUseCase } from "../check-in-use-case";
import { CreateGymUseCase } from "../create-gym-use-case";

export function makeCreateGymUseCase() {
    const gymsRepository = new PrismaGymsRepository();
    return new CreateGymUseCase(gymsRepository);
}