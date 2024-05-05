import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import { RegisterUserUseCase } from "../../use-cases/register-use-case";
import { PrismaUserRepository } from "../../repositories/prisma/prisma-users-repository";
import { UserAlreadyExistsError } from "../../use-cases/errors/user-already-exists-error";
import { makeRegisterUseCase } from "../../use-cases/factories/make-register-use-case";

export async function registerUser(request: FastifyRequest, reply: FastifyReply) {
    const registerUserSchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
    })

    const { name, email, password } = registerUserSchema.parse(request.body);
    const registerUserUseCase = makeRegisterUseCase();

    try {
        await registerUserUseCase.execute({ name, email, password });
        return reply.status(201).send();

    } catch (error) {
        if (error instanceof UserAlreadyExistsError) {
            return reply.status(409).send({ message: error.message });
        }

        throw error;
    }

}