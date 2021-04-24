using AstroDroid.Core.Interfaces;

namespace AstroDroid.Core.Commands
{
    /// <summary>
    /// This command enables uses to turn the robot by an angle specification
    /// </summary>
    public class TurnCommand : INodeCommand
    {
        public TurnDirection Direction { get; set; } = TurnDirection.Left;
        public float Angle { get; set; } = 90;
        public string Name => "TurnCommand";
    }
}