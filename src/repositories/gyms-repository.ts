import { Gym, Prisma } from "@prisma/client";
import { Coordinates, getGymRange } from "../utils/get-gym-range";

const MAX_GYM_RANGE_IN_KM = 10;

export function isGymNearbyUser(gym: Gym, userCoordinates: Coordinates): boolean {
    const distance = getGymRange({
        from: {
            latitude: userCoordinates.latitude,
            longitude: userCoordinates.longitude
        },
        to: {
            latitude: gym.latitude.toNumber(),
            longitude: gym.longitude.toNumber()
        }
    });

    return distance < MAX_GYM_RANGE_IN_KM;

}


export abstract class IGymsRepository {

    abstract create(data: Prisma.GymCreateInput): Promise<Gym>;
    abstract findManyByQuery(query: string, page: number): Promise<Gym[]>;
    abstract findManyNearby(coordinates: Coordinates, page: number): Promise<Gym[]>;
    abstract findById(id: string): Promise<Gym | null>;
}