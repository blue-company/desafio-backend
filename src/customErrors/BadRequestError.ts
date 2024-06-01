import { BaseError } from "../customErrors/BaseError"; 

export class BadRequestError extends BaseError{
    constructor(message = "Bad Request"){
        super(400, message);
    }
}