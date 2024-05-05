import { expect, describe, it, beforeEach } from "vitest";
import { RegisterUserUseCase } from "./register-use-case";
import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users-repository";
import { compare } from "bcryptjs";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";
import { IUsersRepository } from "../repositories/users-repository";
import { IGymsRepository } from "../repositories/gyms-repository";
import { CreateGymUseCase } from "./create-gym-use-case";
import { InMemoryGymsRepository } from "../repositories/in-memory/in-memory-gyms-repository";

describe('Create Gym Use case', () => {

    let gymsRepository: IGymsRepository;
    let sut: CreateGymUseCase;

    beforeEach(() => {
        gymsRepository = new InMemoryGymsRepository();
        sut = new CreateGymUseCase(gymsRepository);
    })
    it('should be able to register a new gym', async () => {

        const { gym } = await sut.execute({
            name: 'My Gym',
            phone: '123456789',
            latitude: -1.458176,
            longitude: -48.4605952,
        });

        expect(gym.id).toBeTypeOf('string');
    })


})