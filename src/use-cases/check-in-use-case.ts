import { CheckIn } from "@prisma/client";
import { ICheckInRepository } from "../repositories/check-in-repository";
import { IGymsRepository } from "../repositories/gyms-repository";
import { getGymRange } from "../utils/get-gym-range";
import { CheckInMaxDistanceError } from "./errors/check-in-max-distance-error";
import { ResourceNotFoundError } from "./errors/resource-not-found";
import { CheckInMaxNumberReachedError } from "./errors/check-in-max-numbers-reached";

interface CheckinUseCaseRequest {
    gymId: string;
    userId: string;
    userLatitude: number;
    userLongitude: number;
}

interface CheckinUseCaseResponse {
    checkIn: CheckIn;
}

const MAX_DISTANCE_IN_KM = 0.1;

export class CheckinUserUseCase {
    constructor(
        private checkinRepository: ICheckInRepository,
        private gymRepository: IGymsRepository,
    ) { }

    async execute({
        gymId,
        userId,
        userLatitude,
        userLongitude,
    }: CheckinUseCaseRequest): Promise<CheckinUseCaseResponse> {

        const gym = await this.gymRepository.findById(gymId);

        if (!gym) {
            throw new ResourceNotFoundError()
        }

        const distance = getGymRange({from: { 
            latitude: gym.latitude.toNumber(), 
            longitude: gym.longitude.toNumber(),
        }, 
        to: { 
            latitude: userLatitude, 
            longitude: userLongitude,
        }});

        if(distance > MAX_DISTANCE_IN_KM) {
            throw new CheckInMaxDistanceError();
        }



        const checkInOnSameDay = await this.checkinRepository.findByUserOnDate(userId, new Date());
        if (checkInOnSameDay) {
            throw new CheckInMaxNumberReachedError();
        }

        const checkIn = await this.checkinRepository.create({
            gym_id: gymId,
            user_id: userId,
        });



        return { checkIn };
    }

}