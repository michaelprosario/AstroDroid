using AstroDroid.Core.Interfaces;

namespace AstroDroid.Core.Commands
{
    public class CheckRangeFinderCommand : INodeCommand
    {
        public float MaxDistance { get; set; } = 3;
        public string Name => "CheckRangeFinderCommand";
    }
}