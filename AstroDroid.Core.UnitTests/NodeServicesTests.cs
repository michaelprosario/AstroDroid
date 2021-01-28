using Microsoft.VisualStudio.TestTools.UnitTesting;
using AstroDroid.Core;
using Guards;

namespace AstroDroid.Core.UnitTests
{
    public class TestMessage : INodeMessage
    {
        public string Type { get; set; } = nameof(TestMessage);
        public object Content { get; set; }
        public string Topic { get; set; }
        public string Sender { get; set; } = "me";

    }

    public class SenderNode : INodeService
    {
        IMessageService _messageService;
        public SenderNode(IMessageService messageService)
        {
            Guard.ArgumentNotNull(() => messageService);
            _messageService = messageService;
        }

        public string NodeId { get; set; }
        public void Setup()
        {
            NodeId = "Sender";
        }

        public void Update()
        {
            var message = new TestMessage
            {
                Topic = "Test",
                Content = "Test",
                Sender = "Topic 1"
            };
            _messageService.SendMessage(message);
        }
    }

    public class ReceiverNode : INodeService
    {
        IMessageService _messageService;
        public ReceiverNode(IMessageService messageService)
        {
            Guard.ArgumentNotNull(() => messageService);
            _messageService = messageService;
        }

        public string NodeId { get; set; }
        public void Setup()
        {
            NodeId = "Receiver";
        }

        public string MyOutput;

        public void Update()
        {
            var message = _messageService.ReceiveMessage();
            this.MyOutput = (string)message.Content;
        }
    }


    [TestClass]
    public class NodeServicesTests
    {
        [TestInitialize()]
        public void TestSetup()
        {

        }

        [TestMethod]
        public void TestMethod1()
        {
            // arrange 

            // Create sender node

            // Create receiver node 

            // act
            // Let's have the sender send a message 

            // assert 
            // Let's see if the receiver gets a message
        }
    }
}
