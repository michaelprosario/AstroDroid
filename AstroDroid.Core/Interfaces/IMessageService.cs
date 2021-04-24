using System.Collections.Generic;
using AstroDroid.Core.Entities;
using AstroDroid.Core.Responses;

namespace AstroDroid.Core.Interfaces
{
    /// <summary>
    /// This interface represents the essential operations for passing messages between nodes
    /// </summary>
    public interface IMessageService
    {
        List<Subscriber> Subscribers { get; set; }
        Response SendMessage(INodeMessage message);
        void Subscribe(string topic, INodeService service);
        void Unsubscribe(string topic, INodeService service);
    }
}