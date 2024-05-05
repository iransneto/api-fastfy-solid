import { Gym, Prisma } from "@prisma/client";
import { IGymsRepository, isGymNearbyUser } from "../gyms-repository";
import { randomUUID } from "node:crypto";
import { Decimal } from "@prisma/client/runtime/library";
import { Coordinates, getGymRange } from "../../utils/get-gym-range";



export class InMemoryGymsRepository implements IGymsRepository {
    gyms: Gym[] = [];

    async findManyNearby(userCoordinates: Coordinates, page: number): Promise<Gym[]> {
        return Promise.resolve(
            this.gyms.filter(gym => isGymNearbyUser(gym, userCoordinates)
            ).slice((page - 1) * 20, page * 20)
        );
    }

    findManyByQuery(query: string, page: number): Promise<Gym[]> {
        return Promise.resolve(
            this.gyms.filter(gym => gym.name.includes(query)).slice((page - 1) * 20, page * 20)
        );
    }

    findById(id: string): Promise<Gym | null> {
        const gym = this.gyms.find(gym => gym.id === id);

        return Promise.resolve(gym || null);
    }

    async create(data: Prisma.GymCreateInput): Promise<Gym> {
        const gym: Gym = {
            id: data.id ?? randomUUID(),
            name: data.name,
            created_at: new Date(),
            phone: data.phone,
            latitude: new Decimal(data.latitude.toString()),
            longitude: new Decimal(data.longitude.toString()),
        }

        this.gyms.push(gym);

        return gym;
    }

}