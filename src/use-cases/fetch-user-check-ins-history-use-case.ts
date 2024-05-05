import { CheckIn } from "@prisma/client";
import { ICheckInRepository } from "../repositories/check-in-repository";

interface CheckInHistoryRequest {
    userId: string;
    page: number
}

interface CheckInHistoryResponse {
    checkIns: CheckIn[];
}

export class FetchUserCheckInsHistoryUseCase {
    constructor(private checkInRepository: ICheckInRepository) {
    }
    async execute({ userId, page }: CheckInHistoryRequest): Promise<CheckInHistoryResponse> {
        const checkIns = await this.checkInRepository.findManyByUserId(userId, page);
        return { checkIns };
    }
}