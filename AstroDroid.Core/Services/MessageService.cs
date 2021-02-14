using System.Collections.Generic;
using System.Linq;
using AstroDroid.Core.Entities;
using AstroDroid.Core.Interfaces;
using AstroDroid.Core.Responses;
using AstroDroid.Core.Utils;
using AstroDroid.Core.Validators;

namespace AstroDroid.Core.Services
{
    public class MessageService : IMessageService
    {
        public List<Subscriber> Subscribers { get; set; } = new List<Subscriber>();

        public Response SendMessage(INodeMessage message)
        {
            var messageValidator = new MessageValidator();
            var validationResults = messageValidator.Validate(message);
            if (!validationResults.IsValid)
                return new Response
                {
                    Code = ResponseCode.BadRequest, Message = "Validation errors on message",
                    ValidationErrors = validationResults.Errors
                };

            var topic = message.Topic;
            var subscribers = Subscribers.Where(s => s.Topic.Equals(topic));
            foreach (var subscriber in subscribers) subscriber.NodeService.ReceiveMessage(message);

            return new Response();
        }

        public void Subscribe(string topic, INodeService service)
        {
            Require.NotNullOrEmpty(topic, nameof(topic));
            Require.ObjectNotNull(service, nameof(service));

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
    }
}