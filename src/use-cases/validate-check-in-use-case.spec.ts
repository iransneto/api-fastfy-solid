import { it, describe, expect, beforeEach, vi, afterEach } from "vitest";
import { InMemoryCheckInRepository } from "../repositories/in-memory/in-memory-checkin-repository";
import { ICheckInRepository } from "../repositories/check-in-repository";
import { InMemoryGymsRepository } from "../repositories/in-memory/in-memory-gyms-repository";
import { ValidateCheckinUserUseCase } from "./validate-check-in-use-case";
import { CheckinExpiredError } from "./errors/checkin-expired-validation-error";

describe('Checkin use case', () => {

    let repository: ICheckInRepository;
    let sut: ValidateCheckinUserUseCase;

    beforeEach(async () => {
        repository = new InMemoryCheckInRepository();
        sut = new ValidateCheckinUserUseCase(repository);

        vi.useFakeTimers();
    })

    afterEach(() => {
        vi.useRealTimers();
    })
    it('should be able to validate checkin', async () => {
        vi.setSystemTime(new Date('2021-10-10 10:00:00'));

        const checkInCreated = await repository.create({
            user_id: '123',
            gym_id: '123',
            created_at: new Date()
        });

        expect(checkInCreated.validated_at).toBeNull();

        await sut.execute({
            checkinId: checkInCreated.id
        })

        const checkinResponse = await repository.findById(checkInCreated.id);


        expect(checkinResponse).toEqual(checkInCreated);
        expect(checkinResponse?.validated_at).toEqual(new Date());
    })

    it('should not be able to validate an inexistent checkin', async () => {
        vi.setSystemTime(new Date('2021-10-10 10:00:00'));


        expect(() => sut.execute({
            checkinId: 'non-existent-id'
        })).rejects.toBeInstanceOf(Error);
    })

    it('should not be able to validate an expired checkin', async () => {
        vi.setSystemTime(new Date('2021-10-10 10:30:00'));

        const checkInCreated = await repository.create({
            user_id: '123',
            gym_id: '123',
            created_at: new Date()
        });

        const duration20min = 1000 * 60 * 21;

        vi.advanceTimersByTime(duration20min);

        expect(() => sut.execute({
            checkinId: checkInCreated.id
        })).rejects.toThrowError(CheckinExpiredError);
    })


})