namespace AstrodroidUnity.Assets.Scripts
{

  /// Helper for NodeIds
  public static class NodeIds
  {
    public static readonly string DriveHandler = "DriveHandler";
    public static readonly string DriverNode = "DriverNode";
  }

  // Helper for message topics 
  public static class Topics
  {

    public static readonly string CheckRangeFinderResponse = "CheckRangeFinderResponse";
    public static readonly string Driving = "Driving";
    public static readonly string RangeFinder = "RangeFinder";
  }

  public static class Commands
  {
    public static readonly string CheckRangeFinderCommand = "CheckRangeFinderCommand";
    public static readonly string StopCommand = "StopCommand";
    public static readonly string TurnCommand = "TurnCommand";
    public static readonly string DriveCommand = "DriveCommand";
  }  
}