public interface IMessageService
{
    List<Subscriber> Subscribers;
    INodeMessage ReceiveMessage();
    void SendMessage(INodeMessage message);
    void Subscribe(string topic, INodeService service);
    void Unsubscribe(string topic, INodeService service);
}