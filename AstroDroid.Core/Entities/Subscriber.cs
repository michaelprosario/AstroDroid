using AstroDroid.Core.Interfaces;

namespace AstroDroid.Core.Entities
{
    /// <summary>
    /// Various services can subscribe to messages by topic.  This class represents a subscriber
    /// </summary>
    public class Subscriber
    {       
        public INodeService NodeService { get; set; }
        public string Topic { get; set; } = "";   
    }
}