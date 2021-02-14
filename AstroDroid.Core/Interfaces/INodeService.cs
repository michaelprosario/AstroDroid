namespace AstroDroid.Core.Interfaces
{
    public interface INodeService
    {
        string NodeId { get; set; }
        void Setup();
        void Update();
        void ReceiveMessage(INodeMessage message);
        void SendMessage(INodeMessage message);
    }
}