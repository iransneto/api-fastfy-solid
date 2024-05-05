import { CheckIn, Prisma } from "@prisma/client";
import { ICheckInRepository } from "../check-in-repository";
import { randomUUID } from "crypto";
import dayjs from "dayjs";

export class InMemoryCheckInRepository implements ICheckInRepository {




    checkIns: CheckIn[] = [];

    async findById(id: string): Promise<CheckIn | null> {
        const checkIn = this.checkIns.find(checkIn => checkIn.id === id);

        if (!checkIn) {
            return null;
        }

        return Promise.resolve(checkIn);
    }

    save(checkIn: CheckIn): Promise<CheckIn> {
        const index = this.checkIns.findIndex(c => c.id === checkIn.id);
        if (index === -1) {
            return Promise.reject(new Error("CheckIn not found"));
        }   
        this.checkIns[index] = checkIn;
        return Promise.resolve(checkIn);
    }

    async countUserCheckins(userId: string): Promise<number> {
        return this.checkIns.filter(checkIn => checkIn.user_id === userId).length;
    }

    async findManyByUserId(userId: string, page: number): Promise<CheckIn[]> {
        return this.checkIns
            .filter(checkIn => checkIn.user_id === userId)
            .slice((page - 1) * 20, page * 20);
    }
    async findByUserOnDate(userId: string, date: Date): Promise<CheckIn | null> {

        const startOfDay = dayjs(date).startOf('date');
        const endOfDay = dayjs(date).endOf('date');

        const checkIn = this.checkIns.find(checkIn => {
            const checkInDate = dayjs(checkIn.created_at);
            const isOnSameDate = checkInDate.isAfter(startOfDay) && checkInDate.isBefore(endOfDay);
            return checkIn.user_id === userId && isOnSameDate;
        });


        return Promise.resolve(checkIn || null);
    }
    async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
        const checkIn: CheckIn = {
            id: data.id ?? randomUUID(),
            user_id: data.user_id,
            gym_id: data.gym_id,
            validated_at: data.validated_at ? new Date(data.validated_at) : null,
            created_at: new Date(),
        }
        this.checkIns.push(checkIn);
        return Promise.resolve(checkIn);
    }

}