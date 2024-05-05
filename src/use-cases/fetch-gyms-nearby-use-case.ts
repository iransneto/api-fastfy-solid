import { Gym } from "@prisma/client";
import { IGymsRepository } from "../repositories/gyms-repository";
import { Coordinates } from "../utils/get-gym-range";

interface FetchGymsNearbyRequest {
    userCoordinates: Coordinates;
    page: number;
}

interface FetchGymsNearbyResponse {
    gyms: Gym[];
}

export class FetchGymsNearbyUseCase {
    constructor(private gymsRepository: IGymsRepository) {
    }
    async execute({ userCoordinates, page }: FetchGymsNearbyRequest): Promise<FetchGymsNearbyResponse> {
        const gyms = await this.gymsRepository.findManyNearby(userCoordinates, page);
        return { gyms };
    }
}