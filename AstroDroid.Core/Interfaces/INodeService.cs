namespace AstroDroid.Core.Interfaces
{
    /// <summary>
    /// Like Robotics operating systems, robot simulations will be broken down into small components
    /// called nodes.  A node service represents the logic or behavior of one node.
    /// A node can model various things: range finding, drive system, SLAM, sensor, GPS, etc.
    /// At this point in the design, node services map to Unity mono behaviors
    /// </summary>
    public interface INodeService
    {
        string NodeId { get; set; }
        void Setup();
        void Update();
        void ReceiveMessage(INodeMessage message);
        void SendMessage(INodeMessage message);
    }
}