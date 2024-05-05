export class CheckInMaxNumberReachedError extends Error {
    constructor() {
        super('User already max checked in amount reached');
        this.name = 'CheckInOnSameDayError';
    }
}