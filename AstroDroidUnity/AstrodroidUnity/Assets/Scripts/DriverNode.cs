using AstroDroid.Core;
using AstroDroid.Core.Commands;
using AstroDroid.Core.Entities;
using AstroDroid.Core.Interfaces;
using AstroDroid.Core.Responses;
using AstroDroid.Core.Utils;
using AstrodroidUnity.Assets.Scripts;
using UnityEngine;
using Zenject;

/// <summary>
/// Drive Node controls a single robot
/// </summary>
public class DriverNode : MonoBehaviour, INodeService
{
  public string NodeId { get; set; } = NodeIds.DriverNode;
  public bool NearSomething = false;
  public float DistanceFromSomething = float.MaxValue;
  IMessageService _MessageService;

  [Inject]
  public void Construct(IMessageService messageService)
  {
    _MessageService = messageService;
  }

  public void ReceiveMessage(INodeMessage message)
  {
    if (message.Topic == Topics.CheckRangeFinderResponse)
    {
      var response = (CheckRangeFinderResponse)message.Content;
      NearSomething = response.Hit;
      DistanceFromSomething = response.Distance;
      if(DistanceFromSomething > 2f)
      {
        this.NearSomething = false;
      }
    }
  }

  public void Setup()
  {
    _MessageService.Subscribe(Topics.CheckRangeFinderResponse, this);
  }

  private void Turn(int angle)
  {
    var turnCommand = new TurnCommand
    {
      Direction = TurnDirection.Left,
      Angle = angle
    };
    SendMessage(new NodeMessage(turnCommand.Name, Topics.Driving, this.NodeId, turnCommand));
  }

  private void MoveForward(float distance)
  {
    var driveForward = new DriveCommand
    {
      Direction = DriveDirection.Forward,
      DistanceInMeters = distance
    };
    SendMessage(new NodeMessage(driveForward.Name, Topics.Driving, this.NodeId, driveForward));
  }

  void Start()
  {
    Setup();
    InvokeRepeating("ExecuteDrive", 0, 3f);
  }

  void ExecuteDrive()
  {
    if (this.DistanceFromSomething > 2f)
    {
      MoveForward(1f);      
    }
    else
    {
      Turn(-180);
    }
  }

  private void Stop()
  {
    var command = new StopCommand();
    SendMessage(new NodeMessage(command.Name, Topics.Driving, this.NodeId, command));
  }

  public void Update()
  {
    UpdateNode();
  }

  public void UpdateNode()
  {
    var checkRangeFinderCommand = new CheckRangeFinderCommand
    {
      MaxDistance = 10000
    };
    SendMessage(new NodeMessage(checkRangeFinderCommand.Name, Topics.RangeFinder, this.NodeId, checkRangeFinderCommand));
  }

  public void SendMessage(INodeMessage message)
  {
    Require.ObjectNotNull(message, nameof(INodeMessage));
    Require.ObjectNotNull(_MessageService, nameof(IMessageService));

    _MessageService.SendMessage(message);
  }

}
