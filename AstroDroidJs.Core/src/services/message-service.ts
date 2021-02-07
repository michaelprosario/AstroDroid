
import { IMessageService } from "../interfaces/message-service";
import { INodeMessage } from "../interfaces/node-message";
import { INodeService } from "../interfaces/node-service";
import { MessageValidator } from "../validators/message-validator";
import { ResponseCode, Response } from "../responses/response";
import { Subscriber } from "../entities/subscriber";
import { Require } from "../helpers/requires";

export class MessageService implements IMessageService {
    public Subscribers: Subscriber[] = [];

    public SendMessage(message: INodeMessage): Response {
        var messageValidator = new MessageValidator();
        var validationResults = messageValidator.validate(message);
        if (!validationResults.isValid) {
            let validationResponse = new Response();
            validationResponse.Code = ResponseCode.BadRequest;
            validationResponse.Message = "Validation errors on message";
            validationResponse.ValidationErrors = validationResults.getFailures();
            return validationResponse;
        }

        var topic = message.Topic;
        var subscribers = this.Subscribers.filter(s => s.Topic === topic);
        for (let subscriber of subscribers)
            subscriber.NodeService.ReceiveMessage(message);

        return new Response();
    }

    public Subscribe(topic: string, service: INodeService) {
        Require.IsNotEmpty(topic, "topic");
        Require.NotNull(service, "service");

        var collection = this.Subscribers.filter(r => r.Topic === topic && r.NodeService.NodeId === service.NodeId);
        if (collection.length > 0)
            return;

        let subscriber = new Subscriber();
        subscriber.Topic = topic;
        subscriber.NodeService = service;
        this.Subscribers.push(subscriber);
    }

    public Unsubscribe(topic: string, service: INodeService) {
        Require.IsNotEmpty(topic, "topic");
        Require.NotNull(service, "service");

        var subscriber =
            this.Subscribers.find(r => r.Topic === topic &&
                r.NodeService.NodeId === service.NodeId);
        const index = this.Subscribers.indexOf(subscriber);
        if (index > -1) {
            this.Subscribers.splice(index, 1);
        }
    }
}
