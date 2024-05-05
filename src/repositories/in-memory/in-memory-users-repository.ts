import { Prisma, User } from "@prisma/client";
import { IUsersRepository } from "../users-repository";
import { randomUUID } from "crypto";

export class InMemoryUsersRepository implements IUsersRepository {
    
    public users: User[] = [];

    async findById(id: string): Promise<User | null> {
            const user = this.users.find((user) => user.id === id) || null;
            return user;
    }
    async create(data: Prisma.UserCreateInput){
        const user = {
            id: data.id ?? randomUUID(),
            email: data.email,
            name: data.name,
            password_hash: data.password_hash,
            created_at: new Date(),
        };
        this.users.push(user);
        return user;
    }
    async findByEmail(email: string) {
        return this.users.find((user) => user.email === email) || null;
    }
}