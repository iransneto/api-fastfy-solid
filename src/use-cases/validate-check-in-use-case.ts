import { CheckIn } from "@prisma/client";
import { ICheckInRepository } from "../repositories/check-in-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found";
import dayjs from "dayjs";
import { CheckinExpiredError } from "./errors/checkin-expired-validation-error";

interface ValidateCheckinUseCaseRequest {
    checkinId: string;
}

interface ValidateCheckinUseCaseResponse {
    checkIn: CheckIn;
}


export class ValidateCheckinUserUseCase {
    constructor(
        private checkinRepository: ICheckInRepository,
    ) { }

    async execute({
        checkinId
    }: ValidateCheckinUseCaseRequest): Promise<ValidateCheckinUseCaseResponse> {

        const checkIn = await this.checkinRepository.findById(checkinId);

        if (!checkIn) {
            throw new ResourceNotFoundError()
        }

        const durationInMinutesSinceCheckinCreation = dayjs(new Date()).diff(checkIn.created_at, 'minute');

        if(durationInMinutesSinceCheckinCreation > 20) {
            throw new CheckinExpiredError();
        }

        checkIn.validated_at = new Date();

        await this.checkinRepository.save(checkIn);

        return { checkIn };
    }

}