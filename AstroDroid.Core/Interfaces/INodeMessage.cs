namespace AstroDroid.Core.Interfaces
{
    /// <summary>
    /// This interface has common properties for a node message
    /// </summary>
    public interface INodeMessage
    {
        string Type { get; set; }
        object Content { get; set; }
        string Topic { get; set; }
        string Sender { get; set; }
    }
}