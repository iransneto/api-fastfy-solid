import { it, describe, expect, beforeEach } from "vitest";
import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users-repository";
import { AuthenticateUserUseCase } from "./auth-use-case";
import { hash } from "bcryptjs";
import { UserInvalidCredentialsError } from "./errors/user-invalid-credentials";
import { UserNotFoundError } from "./errors/user-not-found";
import { IUsersRepository } from "../repositories/users-repository";

describe('Authenticate User use case', () => {

    let usersRepository: IUsersRepository;
    let sut: AuthenticateUserUseCase;

    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository();
        sut = new AuthenticateUserUseCase(usersRepository);
    })
    it('should be able to auth an user', async () => {
        const user = await usersRepository.create({
            id: '1',
            name: 'Joe Doe',
            email: 'jhon.dow@email.com',
            password_hash: await hash('123456', 6)
        })

        const authResponse = await sut.execute({
            email: 'jhon.dow@email.com',
            password: '123456',
        });

        expect(authResponse.user).toBe(user)


    })
    it('should not be able to auth if email not found', async () => {

        usersRepository.create({
            id: '1',
            name: 'Joe Doe',
            email: 'jhon.dow@email.com',
            password_hash: await hash('123456', 6)
        })

        await expect(() => sut.execute({
            email: 'a@a.com',
            password: '123456',
        })).rejects.toBeInstanceOf(UserNotFoundError)
    })

    it('should not be able to auth if pw is wrong', async () => {

        usersRepository.create({
            id: '1',
            name: 'Joe Doe',
            email: 'jhon.dow@email.com',
            password_hash: await hash('123456', 6)
        })

        await expect(() => sut.execute({
            email: 'jhon.dow@email.com',
            password: '1234567',
        })).rejects.toBeInstanceOf(UserInvalidCredentialsError)
    })
})