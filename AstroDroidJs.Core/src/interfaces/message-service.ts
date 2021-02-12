import { INodeMessage } from "./node-message";
import { INode } from "./node";
import { Response } from "../responses/response";
import { Subscriber } from "../entities/subscriber";

export interface IMessageService {
    Subscribers: Subscriber[];
    SendMessage(message: INodeMessage): Response;
    Subscribe(topic: string,  service: INode);
    Unsubscribe(topic: string,  service: INode);
}