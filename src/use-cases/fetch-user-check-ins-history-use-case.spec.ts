import { beforeEach, describe, expect, it } from "vitest";
import { ICheckInRepository } from "../repositories/check-in-repository";
import { FetchUserCheckInsHistoryUseCase } from "./fetch-user-check-ins-history-use-case";
import { InMemoryCheckInRepository } from "../repositories/in-memory/in-memory-checkin-repository";

describe('Fetch User Check-ins History use case', () => {
    let repository: ICheckInRepository;
    let sut: FetchUserCheckInsHistoryUseCase;
    beforeEach(() => {
        repository = new InMemoryCheckInRepository();
        sut = new FetchUserCheckInsHistoryUseCase(repository);
    })
    it('should be able to fetch user check-ins history', async () => {

        await repository.create({
            user_id: 'user-id-1',
            gym_id: 'gym-id-1',
        })


        await repository.create({
            user_id: 'user-id-1',
            gym_id: 'gym-id-2',
        })

        const { checkIns } = await sut.execute({ userId: 'user-id-1', page: 1 });

        expect(checkIns).toHaveLength(2);
        expect(checkIns).toEqual([
            expect.objectContaining({ gym_id: 'gym-id-1' }),
            expect.objectContaining({ gym_id: 'gym-id-2' }),
        ])
    })

    it('should be able to fetch paginated check-in history', async () => {
        for (let i = 1; i <= 22; i++) {
            await repository.create({
                user_id: 'user-id-1',
                gym_id: `gym-id-${i}`,
            })
        }


        const { checkIns } = await sut.execute({ userId: 'user-id-1', page: 2 });

        expect(checkIns).toHaveLength(2);
        expect(checkIns).toEqual([
            expect.objectContaining({ gym_id: 'gym-id-21' }),
            expect.objectContaining({ gym_id: 'gym-id-22' }),
        ])

    })
})