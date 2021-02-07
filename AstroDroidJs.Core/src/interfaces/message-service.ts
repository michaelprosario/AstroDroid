import { INodeMessage } from "./node-message";
import { INodeService } from "./node-service";
import { Response } from "../responses/response";
import { Subscriber } from "../entities/subscriber";

export interface IMessageService {
    Subscribers: Subscriber[];
    SendMessage(message: INodeMessage): Response;
    Subscribe(topic: string,  service: INodeService);
    Unsubscribe(topic: string,  service: INodeService);
}