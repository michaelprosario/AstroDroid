using AstroDroid.Core.Interfaces;

namespace AstroDroid.Core.Commands
{
    /// <summary>
    /// Users leverage this command to drive in various directions
    /// </summary>
    public class DriveCommand : INodeCommand
    {
        public DriveDirection Direction { get; set; } = DriveDirection.Forward;
        public float DistanceInMeters { get; set; } = 1;
        public string Name => "DriveCommand";
    }
}