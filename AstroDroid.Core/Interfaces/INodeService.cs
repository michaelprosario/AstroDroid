public interface INodeService
{
    string NodeId { get; set; }
    void Setup();
    void Update();
}