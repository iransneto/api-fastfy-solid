import { FastifyInstance } from "fastify";
import { registerUser } from "./controllers/register.controller";
import { authenticate } from "./controllers/authenticate.controller";
import { getProfile } from "./controllers/profile.controller";
import { verifyJwt } from "./middlewares/verify-jwt";

export async function appRoutes(app: FastifyInstance) {
    app.get("/", async (req, reply) => {
        return { message: "hello world" };
      });
      
    app.post("/users", registerUser)
    app.post("/sessions", authenticate)

    // Somente quando autenticado
    app.get("/profile",  {onRequest: [verifyJwt]},getProfile)

}