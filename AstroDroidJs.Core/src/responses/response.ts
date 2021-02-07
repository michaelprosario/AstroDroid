import { ValidationFailure } from "fluent-ts-validator";

export enum ResponseCode
{
    Success = 200,
    NotFound = 404,
    BadRequest = 400,
    Error = 405
}


export class Response {
    constructor(){
      this.Code = ResponseCode.Success;
      this.Message = "ok";
      this.ValidationErrors = [];
    }

    Code: ResponseCode;
    Message: string;
    ValidationErrors: ValidationFailure[];
}