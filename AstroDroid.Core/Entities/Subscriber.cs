using AstroDroid.Core.Interfaces;

namespace AstroDroid.Core.Entities
{
    public class Subscriber
    {
        public string Topic { get; set; }
        public INodeService NodeService { get; set; }
    }
}