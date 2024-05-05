export class CheckinExpiredError extends Error {
    constructor() {
        super('Checkin expired');
        this.name = 'CheckinExpiredError';
    }
}