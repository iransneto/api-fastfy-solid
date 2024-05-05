import { PrismaCheckinRepository } from "../../repositories/prisma/prisma-checkin-repository";
import { PrismaGymsRepository } from "../../repositories/prisma/prisma-gyms-repository";
import { CheckinUserUseCase } from "../check-in-use-case";
import { CreateGymUseCase } from "../create-gym-use-case";
import { FetchGymsNearbyUseCase } from "../fetch-gyms-nearby-use-case";

export function makeFetchGymsNearbyUseCase() {
    const gymsRepository = new PrismaGymsRepository();
    return new FetchGymsNearbyUseCase(gymsRepository);
}