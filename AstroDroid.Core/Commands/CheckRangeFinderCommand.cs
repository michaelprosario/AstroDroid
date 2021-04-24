using AstroDroid.Core.Interfaces;

namespace AstroDroid.Core.Commands
{
    /// <summary>
    /// Users use this command to request the current distance from an object using range finder.
    /// </summary>
    public class CheckRangeFinderCommand : INodeCommand
    {
        public float MaxDistance { get; set; } = 3;
        public string Name => "CheckRangeFinderCommand";
    }
}