import { it, describe, expect, beforeEach } from "vitest";
import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users-repository";
import { AuthenticateUserUseCase } from "./auth-use-case";
import { hash } from "bcryptjs";
import { UserInvalidCredentialsError } from "./errors/user-invalid-credentials";
import { GetProfileUseCase } from "./get-profile-use-case";
import { ResourceNotFoundError } from "./errors/resource-not-found";
import { IUsersRepository } from "../repositories/users-repository";

describe('Get User Profile use case', () => {

    let usersRepository: IUsersRepository;
    let sut: GetProfileUseCase;

    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository();
        sut = new GetProfileUseCase(usersRepository);
    })
    it('should be able to get user profile', async () => {
        const user = await usersRepository.create({
            id: 'user-id-1',
            name: 'Joe Doe',
            email: 'jhon.dow@email.com',
            password_hash: await hash('123456', 6)
        })

        const profileResponse = await sut.execute({ id: 'user-id-1'});

        expect(profileResponse.user).toBe(user)


    })
    it('should not be able to get profile with wrong id', async () => {

        usersRepository.create({
            name: 'Joe Doe',
            email: 'jhon.dow@email.com',
            password_hash: await hash('123456', 6)
        })

        await expect( () => sut.execute({id: 'non-exist-id'})).rejects.toBeInstanceOf(ResourceNotFoundError)
    })
})