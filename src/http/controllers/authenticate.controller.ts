import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { UserNotFoundError } from "../../use-cases/errors/user-not-found";
import { UserInvalidCredentialsError } from "../../use-cases/errors/user-invalid-credentials";
import { makeAuthUseCase } from "../../use-cases/factories/make-auth-use-case";

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
    const authenticateSchema = z.object({
        email: z.string().email(),
        password: z.string().min(6)
    })

    const { email, password } = authenticateSchema.parse(request.body);
    const authUseCase = makeAuthUseCase();

    try {
        const authResponse = await authUseCase.execute({ email, password });

        const token = await reply.jwtSign({}, {
            sign: {
                sub: authResponse.user.id,
            }
        })

        return reply.status(201).send({token})
    } catch (error) {
        if (error instanceof UserNotFoundError) {
            return reply.status(404).send();
        }
        if (error instanceof UserInvalidCredentialsError) {
            return reply.status(404).send();
        }
    }

}