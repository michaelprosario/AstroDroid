namespace AstroDroid.Core.Interfaces
{
    public interface INodeMessage
    {
        string Type { get; set; }
        object Content { get; set; }
        string Topic { get; set; }
        string Sender { get; set; }
    }
}