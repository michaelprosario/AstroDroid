
import { INodeMessage } from "../interfaces/node-message";
import {AbstractValidator, Severity} from "fluent-ts-validator";

export class MessageValidator extends AbstractValidator<INodeMessage> {
  constructor() {
    super();
 
    this.validateIfString(message => message.Content).isNotNull().isNotEmpty();
    this.validateIfString(message => message.Sender).isNotNull().isNotEmpty();
    this.validateIfString(message => message.Topic).isNotNull().isNotEmpty();
    this.validateIfString(message => message.Type).isNotNull().isNotEmpty();
  }
}