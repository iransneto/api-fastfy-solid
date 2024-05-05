import { beforeEach, describe, expect, it } from "vitest";
import { ICheckInRepository } from "../repositories/check-in-repository";
import { FetchUserCheckInsHistoryUseCase } from "./fetch-user-check-ins-history-use-case";
import { InMemoryCheckInRepository } from "../repositories/in-memory/in-memory-checkin-repository";
import { IGymsRepository } from "../repositories/gyms-repository";
import { SearchGymsUseCase } from "./search-gyms-use-case";
import { InMemoryGymsRepository } from "../repositories/in-memory/in-memory-gyms-repository";
import { FetchGymsNearbyUseCase } from "./fetch-gyms-nearby-use-case";

describe('Fetch Gym Nearby use case', () => {
    let repository: IGymsRepository;
    let sut: FetchGymsNearbyUseCase;
    beforeEach(() => {
        repository = new InMemoryGymsRepository();
        sut = new FetchGymsNearbyUseCase(repository);
    })
    it('should be able to fetch gyms nearby', async () => {

        await repository.create({
            id: '1',
            name: 'Far Gym',
            phone: '123456789',
            latitude: -1.058156380715763,
            longitude: -46.75319148943688,

        });

        await repository.create({
            id: '2',
            name: 'Nearby Gym',
            phone: '123456789',
            latitude: -1.458176,
            longitude: -48.4605952,
        });

        const { gyms } = await sut.execute({
            userCoordinates: {
                latitude: -1.458176,
                longitude: -48.4605952
            }, page: 1
        });

        expect(gyms).toHaveLength(1);
        expect(gyms).toEqual([
            expect.objectContaining({ name: 'Nearby Gym' }),
        ])
    })

    it('should be able to fetch paginated nearby gyms', async () => {
        for (let i = 1; i <= 22; i++) {
            await repository.create({
                id: i.toString(),
                name: `Nearby Gym ${i}`,
                phone: '123456789',
                latitude: -1.458176,
                longitude: -48.4605952,
            });
        }


        const { gyms } = await sut.execute({
            userCoordinates: {
                latitude: -1.458176,
                longitude: -48.4605952
            }, page: 2
        });

        expect(gyms).toHaveLength(2);
        expect(gyms).toEqual([
            expect.objectContaining({ id: '21' }),
            expect.objectContaining({ id: '22' }),
        ])

    })
})