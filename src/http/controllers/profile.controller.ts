import { FastifyReply, FastifyRequest } from "fastify";
import { makeGetProfileUseCase } from "../../use-cases/factories/make-get-profile-use-case";

export async function getProfile(request: FastifyRequest, reply: FastifyReply) {
    await request.jwtVerify();

    const geUserProfile = makeGetProfileUseCase();

    const { user }  = await geUserProfile.execute({ id: request.user.sub });


    return reply.send({user: {
        ...user,
        password_hash: undefined
    }});
}