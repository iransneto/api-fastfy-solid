import { beforeEach, describe, expect, it } from "vitest";
import { ICheckInRepository } from "../repositories/check-in-repository";
import { InMemoryCheckInRepository } from "../repositories/in-memory/in-memory-checkin-repository";
import { GetUserMetricsUseCase } from "./get-user-metrics-use-case";

describe('Fetch User Check-ins History use case', () => {
    let repository: ICheckInRepository;
    let sut: GetUserMetricsUseCase;
    beforeEach(() => {
        repository = new InMemoryCheckInRepository();
        sut = new GetUserMetricsUseCase(repository);
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

        const { countUserCheckins } = await sut.execute({ userId: 'user-id-1' });

        expect(countUserCheckins).toEqual(2);
       
    })


})