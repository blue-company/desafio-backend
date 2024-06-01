import { BaseError } from "../customErrors/BaseError";

export class NotFoundError extends BaseError{
    constructor(message = "Can not found this item"){
        super(404, message);
    }
}