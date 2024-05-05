import { PrismaCheckinRepository } from "../../repositories/prisma/prisma-checkin-repository";
import { FetchUserCheckInsHistoryUseCase } from "../fetch-user-check-ins-history-use-case";

export function makeFetchUserCheckInsHistoryUseCase() {
    const checkinRepository = new PrismaCheckinRepository();
    return new FetchUserCheckInsHistoryUseCase(checkinRepository);
}