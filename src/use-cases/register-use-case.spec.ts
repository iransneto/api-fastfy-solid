import { expect, describe, it, beforeEach } from "vitest";
import { RegisterUserUseCase } from "./register-use-case";
import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users-repository";
import { compare } from "bcryptjs";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";
import { IUsersRepository } from "../repositories/users-repository";

describe('Register Use case', () => {

    let usersRepository: IUsersRepository;
    let sut: RegisterUserUseCase;

    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository();
        sut = new RegisterUserUseCase(usersRepository);
    })
    it('should be able to register a new user', async () => {

        const { user } = await sut.execute({
            name: 'John Doe',
            email: 'a@a.com',
            password: '123456'
        })

        expect(user.id).toBeTypeOf('string');
    })
    it('should hash user password upon registration', async () => {

        const { user } = await sut.execute({
            name: 'John Doe',
            email: 'a@a.com',
            password: '123456'
        })

        const isPasswordCorrectHashed = await compare('123456', user.password_hash);

        expect(isPasswordCorrectHashed).toBe(true);
    })

    it('should not be able to register with the same email twice', async () => {

        await sut.execute({
            name: 'John Doe',
            email: 'a@a.com',
            password: '123456',
        })

        await expect(() => sut.execute({
            name: 'Maria da Silva',
            email: 'a@a.com',
            password: '123456',
        })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
    })


})