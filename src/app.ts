
import fastify from "fastify";
import { ZodError } from "zod";
import { env } from "./env";
import { appRoutes } from "./http/routes";
import fastifyJwt from "@fastify/jwt";

export const app = fastify();

app.register(fastifyJwt, {
    secret: env.JWT_SECRET
})

app.register(appRoutes);

app.setErrorHandler((error, request, reply) => {
    if(error instanceof ZodError) {
        reply.status(400).send({message: error.errors});
    }

    if(env.NODE_ENV !== 'dev') {
        console.log(error);
        reply.status(500).send({message: 'Internal server error'});
    } else {
        //TODO hadle error with a external tool such as Sentry/LogRocket/Loggly/DataDog
    }

    reply.status(500).send({message: 'Internal server error'});
})

