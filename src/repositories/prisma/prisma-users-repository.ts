import { Prisma, User } from "@prisma/client";
import { prismaClient } from "../../lib/prisma.client";
import { IUsersRepository } from "../users-repository";

export class PrismaUserRepository implements IUsersRepository{
    async findById(id: string): Promise<User | null> {
        return prismaClient.user.findUnique({where: {id}});
    }
    async findByEmail(email: string): Promise<User | null> {
        const user = await prismaClient.user.findUnique({where : {email}});
        return user;
    }
    async create(data: Prisma.UserCreateInput) {
        const user = await prismaClient.user.create({
            data,
        })
        return user;
    }
}