
import { IMessageService } from "../interfaces/message-service";
import { INodeMessage } from "../interfaces/node-message";
import { INodeService } from "../interfaces/node-service";
import { MessageValidator } from "../validators/message-validator";
import { ResponseCode, Response } from "../responses/response";
import { Subscriber } from "../entities/subscriber";

export class MessageService implements IMessageService
{
    public Subscribers: Subscriber[] = [];

    public SendMessage(message: INodeMessage): Response
    {
        var messageValidator = new MessageValidator();
        var validationResults = messageValidator.validate(message);
        if (!validationResults.isValid){
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

    public Subscribe(topic: string, service: INodeService)
    {
        Guard.Against.NullOrEmpty(topic, nameof(topic));
        Guard.Against.Null(service, nameof(service));

        var count = Subscribers
            .Count(r => r.Topic.Equals(topic) && r.NodeService.NodeId.Equals(service.NodeId));

        if (count > 0)
            return;

        Subscribers.Add(new Subscriber {Topic = topic, NodeService = service});
    }

    public void Unsubscribe(string topic, INodeService service)
    {
        var subscriber =
            Subscribers.First(r => r.Topic.Equals(topic) &&
                                   r.NodeService.NodeId.Equals(service.NodeId));

        Subscribers.Remove(subscriber);
    }
