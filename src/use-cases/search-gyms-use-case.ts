import { Gym } from "@prisma/client";
import { IGymsRepository } from "../repositories/gyms-repository";

interface SearchGymsRequest {
    query: string;
    page: number;
}

interface SearchGymsResponse {
    gyms: Gym[];
}

export class SearchGymsUseCase {
    constructor(private gymsRepository: IGymsRepository) {
    }
    async execute({ query, page }: SearchGymsRequest): Promise<SearchGymsResponse> {
        const gyms = await this.gymsRepository.findManyByQuery(query, page);
        return { gyms };
    }
}