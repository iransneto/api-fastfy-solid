import { CheckIn, Prisma } from "@prisma/client";
import { ICheckInRepository } from "../check-in-repository";
import { prismaClient } from "../../lib/prisma.client";
import dayjs from "dayjs";

export class PrismaCheckinRepository extends ICheckInRepository {
    async save(checkIn: CheckIn): Promise<CheckIn> {
        const checkin = await prismaClient.checkIn.update({ where: { id: checkIn.id }, data: checkIn });
        return checkin;
    }
    async findById(id: string): Promise<CheckIn | null> {
        const checkin = await prismaClient.checkIn.findUnique({ where: { id } });
        return checkin;
    }
    async countUserCheckins(userId: string): Promise<number> {
        const count = await prismaClient.checkIn.count({ where: { user_id: userId } });
        return count;
    }
    async findManyByUserId(userId: string, page: number): Promise<CheckIn[]> {
        const checkins = await prismaClient.checkIn.findMany({
            where: { user_id: userId },
            take: 20,
            skip: (page - 1) * 20,
        });
        return checkins;
    }
    async findByUserOnDate(userId: string, date: Date): Promise<CheckIn | null> {
        
        const startOfDay = dayjs(date).startOf('date');
        const endOfDay = dayjs(date).endOf('date');

        
        const checkin = await prismaClient.checkIn.findFirst({
            where: {
                user_id: userId,
                created_at: {
                    gte: startOfDay.toDate(),
                    lte: endOfDay.toDate(),
                }
            }
        });
        return checkin;
    }
    async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
        const checkin = await prismaClient.checkIn.create({ data });
        return checkin;
    }

}