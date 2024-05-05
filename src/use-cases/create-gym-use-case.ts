import { Gym } from "@prisma/client";
import { IGymsRepository } from "../repositories/gyms-repository";

interface CreateGymRequest {
    name: string;
    phone: string;
    latitude: number;
    longitude: number;
}

interface CreateGymResponse {
    gym: Gym;
}

export class CreateGymUseCase {
    constructor(private gymsRepository: IGymsRepository) { }

    async execute(
        {
            name,
            phone,
            latitude,
            longitude
        }: CreateGymRequest
    ): Promise<CreateGymResponse> {
        
        const gym = await this.gymsRepository.create({
            name,
            phone,
            latitude,
            longitude
        })

        return { gym }
    }

}