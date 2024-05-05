import { CheckIn } from "@prisma/client";
import { ICheckInRepository } from "../repositories/check-in-repository";

interface GetUserMetricsRequest {
    userId: string;
}

interface GetUserMetricsResponse {
    countUserCheckins: number;
}

export class GetUserMetricsUseCase {
    constructor(private checkInRepository: ICheckInRepository) {
    }
    async execute({ userId }: GetUserMetricsRequest): Promise<GetUserMetricsResponse> {
        const countUserCheckins = await this.checkInRepository.countUserCheckins(userId);
        return { countUserCheckins };
    }
}