import { it, describe, expect, beforeEach, vi, afterEach } from "vitest";
import { InMemoryCheckInRepository } from "../repositories/in-memory/in-memory-checkin-repository";
import { CheckinUserUseCase } from "./check-in-use-case";
import { IGymsRepository } from "../repositories/gyms-repository";
import { ICheckInRepository } from "../repositories/check-in-repository";
import { InMemoryGymsRepository } from "../repositories/in-memory/in-memory-gyms-repository";
import { CheckInMaxNumberReachedError } from "./errors/check-in-max-numbers-reached";
import { CheckInMaxDistanceError } from "./errors/check-in-max-distance-error";

describe('Checkin use case', () => {

    let checkinRepository: ICheckInRepository;
    let gymRepository: IGymsRepository;
    let sut: CheckinUserUseCase;

    beforeEach(async () => {
        checkinRepository = new InMemoryCheckInRepository();
        gymRepository = new InMemoryGymsRepository();
        sut = new CheckinUserUseCase(checkinRepository, gymRepository);

        await gymRepository.create({
            id: '1',
            name: 'My Gym',
            phone: '123456789',
            latitude: -1.458176,
            longitude: -48.4605952,
        });


        vi.useFakeTimers();
    })

    afterEach(() => {
        vi.useRealTimers();
    })
    it('should be able to checkin', async () => {
        vi.setSystemTime(new Date('2021-10-10 10:00:00'));

        const { checkIn } = await sut.execute({
            gymId: '1',
            userId: '1',
            userLatitude: -1.458176,
            userLongitude: -48.4605952,
        })

        expect(checkIn.id).toEqual(expect.any(String));

    })

    it('should not be able to checkin twice in the same day', async () => {
        vi.setSystemTime(new Date('2021-10-10 10:00:00'));

        await sut.execute({
            gymId: '1',
            userId: '1',

            userLatitude: -1.458176,
            userLongitude: -48.4605952,
        })

        await expect(() => sut.execute({
            gymId: '1',
            userId: '1',

            userLatitude: -1.458176,
            userLongitude: -48.4605952,
        })).rejects.toBeInstanceOf(CheckInMaxNumberReachedError);
    })

    it('should be able to checkin twice in different days', async () => {
        vi.setSystemTime(new Date('2021-10-10 10:00:00'));

        await sut.execute({
            gymId: '1',
            userId: '1',

            userLatitude: -1.458176,
            userLongitude: -48.4605952,
        })

        vi.setSystemTime(new Date('2021-10-11 10:00:00'));

        const { checkIn } = await sut.execute({
            gymId: '1',
            userId: '1',
            userLatitude: -1.458176,
            userLongitude: -48.4605952,
        })


        expect(checkIn.id).toEqual(expect.any(String));
    })

    it('should not be able to checkin far away from the gym', async () => {
        await gymRepository.create({
            id: '2',
            name: 'My Gym 2',
            phone: '123456789',
            latitude: -1.458176,
            longitude: -48.4605952,
        })

        await expect(() => sut.execute({
            gymId: '2',
            userId: '1',
            userLatitude: -1.410879,
            userLongitude: -48.4176313,
        })).rejects.toBeInstanceOf(CheckInMaxDistanceError);
    })

    it('should be able to checkin close to the gym', async () => {
         
        await gymRepository.create({
            id: '2',
            name: 'My Gym 2',
            phone: '123456789',
            latitude: -1.4419360987958736,
            longitude: -48.458256338771186,
        })

        const { checkIn } = await sut.execute({
            gymId: '2',
            userId: '1',
            userLatitude: -1.4421252285659618,
            userLongitude: -48.45835906463552
        })
         
        expect(checkIn.id).toEqual(expect.any(String));
    })
})