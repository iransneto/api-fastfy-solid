import { CheckIn, Prisma } from "@prisma/client";


export abstract class ICheckInRepository {
    abstract create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>;
    abstract save(checkIn: CheckIn): Promise<CheckIn>;
    abstract findByUserOnDate(userId: string, date: Date): Promise<CheckIn | null>;
    abstract findById(id: string): Promise<CheckIn | null>;
    abstract countUserCheckins(userId: string): Promise<number>;
    abstract findManyByUserId(userId: string, page: number): Promise<CheckIn[]>;
}