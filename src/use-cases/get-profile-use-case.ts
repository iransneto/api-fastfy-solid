import { User } from "@prisma/client";
import { IUsersRepository } from "../repositories/users-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found";

interface GetProfileRequest {
    id: string;
}

interface GetProfileResponse {
    user: User ;
}

export class GetProfileUseCase {
    constructor(private userRepository: IUsersRepository) {}

    async execute({id}: GetProfileRequest): Promise<GetProfileResponse> {
        const user = await this.userRepository.findById(id);

        if(!user) {
            throw new ResourceNotFoundError();
        }
        return {user};
    }

}