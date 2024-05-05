import { beforeEach, describe, expect, it } from "vitest";
import { ICheckInRepository } from "../repositories/check-in-repository";
import { FetchUserCheckInsHistoryUseCase } from "./fetch-user-check-ins-history-use-case";
import { InMemoryCheckInRepository } from "../repositories/in-memory/in-memory-checkin-repository";
import { IGymsRepository } from "../repositories/gyms-repository";
import { SearchGymsUseCase } from "./search-gyms-use-case";
import { InMemoryGymsRepository } from "../repositories/in-memory/in-memory-gyms-repository";

describe('Search Gym use case', () => {
    let repository: IGymsRepository;
    let sut: SearchGymsUseCase;
    beforeEach(() => {
        repository = new InMemoryGymsRepository();
        sut = new SearchGymsUseCase(repository);
    })
    it('should be able to search gyms by name', async () => {

        await repository.create({
            id: '1',
            name: 'My Gym',
            phone: '123456789',
            latitude: -1.458176,
            longitude: -48.4605952,
        });

        await repository.create({
            id: '2',
            name: 'My Gym 2',
            phone: '123456789',
            latitude: -1.458176,
            longitude: -48.4605952,
        });

        const { gyms } = await sut.execute({ query: 'My Gym 2', page: 1 });

        expect(gyms).toHaveLength(1);
        expect(gyms).toEqual([
            expect.objectContaining({ id: '2' }),
        ])
    })

    it('should be able to search paginated gyms', async () => {
        for (let i = 1; i <= 22; i++) {
            await repository.create({
                id: i.toString(),
                name: `My Gym ${i}`,
                phone: '123456789',
                latitude: -1.458176,
                longitude: -48.4605952,
            });
        }


        const { gyms } = await sut.execute({  query: 'My Gym', page: 2 });

        expect(gyms).toHaveLength(2);
        expect(gyms).toEqual([
            expect.objectContaining({ id: '21' }),
            expect.objectContaining({ id: '22' }),
        ])

    })
})