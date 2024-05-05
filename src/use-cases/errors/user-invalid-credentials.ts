export class UserInvalidCredentialsError extends Error {
    constructor() {

        super('User\'s credentials are invalid')
    }
}