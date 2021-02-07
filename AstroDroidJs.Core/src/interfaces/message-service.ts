import { Subscriber } from "../entities/subscriber";
import { INodeMessage } from "./node-message";
import { INodeService } from "./node-service";

export interface IMessageService {
    Subscribers: Subscriber[];
    SendMessage(message: INodeMessage): Response;
    Subscribe(topic: string,  service: INodeService);
    Unsubscribe(topic: string,  service: INodeService);
}