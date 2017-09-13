import { HttpStatus } from "@nestjs/common";
import { HttpException } from "@nestjs/core";


export class UnauthorizedException extends HttpException {
    constructor(message: string) {
        super(message, HttpStatus.UNAUTHORIZED);
    }
}
