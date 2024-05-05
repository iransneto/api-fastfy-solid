import { Gym, Prisma } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { IGymsRepository } from "../gyms-repository";
import { prismaClient } from "../../lib/prisma.client";
import { Coordinates } from "../../utils/get-gym-range";

export class PrismaGymsRepository implements IGymsRepository {
    findManyByQuery(query: string, page: number): Promise<Gym[]> {
        const gyms = prismaClient.gym.findMany({
            where: {
                name: {
                    contains: query
                }
            }
        })

        return gyms;
    }
    async findManyNearby(coordinates: Coordinates, page: number): Promise<Gym[]> {
        const gyms = await prismaClient.$queryRaw<Gym[]>`
            SELECT * from gyms
            WHERE ( 6371 * acos( cos( radians(${coordinates.latitude}) ) * cos( radians( coordinates.latitude ) ) * cos( radians( longitude ) - radians(${coordinates.longitude}) ) + sin( radians(${coordinates.latitude}) ) * sin( radians( coordinates.latitude ) ) ) ) <= 10
        `;

        return gyms;
    }
    async findById(id: string): Promise<Gym | null> {
        const gym = await prismaClient.gym.findUnique({
            where: {
                id
            }
        })

        return gym;
    }
    async create(data: Prisma.GymCreateInput): Promise<Gym> {
        const gym = await prismaClient.gym.create({
            data
        })

        return gym;
    }

}