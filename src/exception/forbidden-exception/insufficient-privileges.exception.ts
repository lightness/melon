import { ForbiddenException } from "./forbidden.exception";


export class InsufficientPermissionsException extends ForbiddenException {
    constructor() {
        super(`Insufficient permissions`);
    }
}
