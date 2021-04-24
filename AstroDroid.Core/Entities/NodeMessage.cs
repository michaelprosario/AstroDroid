using AstroDroid.Core.Interfaces;
using AstroDroid.Core.Utils;

namespace AstroDroid.Core.Entities
{
    /// <summary>
    ///  A node message enables the user to send data to other parts of the system in a pub/sub manner.
    ///  Users can specify the type and topic of message.   Users can subscribe to messages by topic.
    ///  The message content is an object
    /// </summary>
    public class NodeMessage : INodeMessage
    {
        public NodeMessage()
        {
        }

        public NodeMessage(string type, string topic, string sender, object content)
        {
            Require.NotNullOrEmpty(type, "type");
            Require.NotNullOrEmpty(topic, "topics");
            Require.NotNullOrEmpty(sender, "sender");
            Require.ObjectNotNull(content, "content");

            Type = type;
            Topic = topic;
            Sender = sender;
            Content = content;
            Id = System.Guid.NewGuid().ToString();
        }

        public string Id { get; set; } = "";
        public string Type { get; set; } = "";
        public object Content { get; set; }
        public string Topic { get; set; } = "";
        public string Sender { get; set; } = "";
    }
}