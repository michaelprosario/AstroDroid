using System;
using AstroDroid.Core.Interfaces;
using AstroDroid.Core.Services;
using AstroDroid.Core.Utils;
using Microsoft.VisualStudio.TestTools.UnitTesting;

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
        private readonly IMessageService _messageService;

        public SenderNode(IMessageService messageService)
        {
            Require.ObjectNotNull(messageService, nameof(messageService));
            _messageService = messageService;
        }

        public string NodeId { get; set; }

        public void Setup()
        {
            NodeId = "Sender";
        }

        public void UpdateNode()
        {
        }

        public void ReceiveMessage(INodeMessage message)
        {
            throw new NotImplementedException();
        }

        public void SendMessage(INodeMessage message)
        {
            message.Sender = NodeId;
            _messageService.SendMessage(message);
        }
    }

    public class ReceiverNode : INodeService
    {
        private readonly IMessageService _messageService;

        public string MyOutput;

        public ReceiverNode(IMessageService messageService)
        {
            Require.ObjectNotNull(messageService, nameof(messageService));
            _messageService = messageService;
        }

        public string NodeId { get; set; }

        public void Setup()
        {
            NodeId = "Receiver";
            _messageService.Subscribe("Test", this);
        }

        public void UpdateNode()
        {
        }

        public void ReceiveMessage(INodeMessage message)
        {
            MyOutput = (string) message.Content;
        }

        public void SendMessage(INodeMessage message)
        {
            throw new NotImplementedException();
        }
    }


    [TestClass]
    public class NodeServicesTests
    {
        [TestInitialize]
        public void TestSetup()
        {
        }

        [TestMethod]
        public void MessageService__ReceiveOfMessageShouldWork()
        {
            // arrange 

            // Create sender node
            IMessageService messageService = new MessageService();
            var senderService = new SenderNode(messageService);
            senderService.Setup();

            // Create receiver node 
            var receiverService = new ReceiverNode(messageService);
            receiverService.Setup();

            // act
            senderService.SendMessage(new TestMessage
            {
                Content = "My cool content", Sender = "Test", Topic = "Test"
            });

            // assert 
            Assert.AreEqual(receiverService.MyOutput, "My cool content");
        }

        [TestMethod]
        public void MessageService__SendBadMessage__HandleNoTopic()
        {
            // arrange 
            // Create sender node
            IMessageService messageService = new MessageService();
            var message = GetGoodMessage();
            message.Topic = "";

            var response = messageService.SendMessage(message);
            Assert.IsTrue(response.ValidationErrors.Count > 0);
        }

        private static INodeMessage GetGoodMessage()
        {
            INodeMessage message = new TestMessage();
            message.Sender = "NodeId";
            message.Topic = "SomeTopic";
            message.Type = "MyType";
            return message;
        }
    }
}