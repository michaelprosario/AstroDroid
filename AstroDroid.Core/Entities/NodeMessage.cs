using AstroDroid.Core.Interfaces;
using AstroDroid.Core.Utils;

namespace AstroDroid.Core.Entities
{
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
        }

        public string Type { get; set; } = "";
        public object Content { get; set; }
        public string Topic { get; set; } = "";
        public string Sender { get; set; } = "";
    }
}