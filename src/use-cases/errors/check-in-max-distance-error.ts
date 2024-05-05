export class CheckInMaxDistanceError extends Error {
    constructor() {
        super('Gym max distance reached');
        this.name = 'GymMaxDistanceError';
    }
}