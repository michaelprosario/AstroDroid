using UnityEngine;
using AstroDroid.Core.Interfaces;
using AstroDroid.Core.Commands;
using AstroDroid.Core;
using AstroDroid.Core.Entities;
using System;
using Zenject;
using AstroDroid.Core.Utils;
using AstroDroid.Core.Responses;

public class DriverNode : MonoBehaviour, INodeService
{
    public string NodeId { get; set; } = "DriverNode";
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
        if(message.Topic == "CheckRangeFinderResponse")
        {
            CheckRangeFinderResponse response = (CheckRangeFinderResponse)message.Content;
            NearSomething = response.Hit;
            DistanceFromSomething = response.Distance;
        }
    }

    public void Setup()
    {
        _MessageService.Subscribe("CheckRangeFinderResponse", this);
  }

  private void Turn(int angle)
  {
    var turnCommand = new TurnCommand
    {
      Direction = TurnDirection.Left,
      Angle = angle
    };
    SendMessage(new NodeMessage(turnCommand.Name, "Driving", this.NodeId, turnCommand));
  }

  private void MoveForward(float distance)
  {
    var driveForward = new DriveCommand
    {
      Direction = DriveDirection.Forward,
      DistanceInMeters = distance
    };
    SendMessage(new NodeMessage(driveForward.Name, "Driving", this.NodeId, driveForward));
  }

  void Start()
    {
        Setup();
        InvokeRepeating("ExecuteDrive", 0, 3f);
    }

    void ExecuteDrive(){
        if(this.DistanceFromSomething > 2f || this.DistanceFromSomething == 0f){
            MoveForward(1f);
        }else{
            Turn(-180);
        }
    }

    void Update()
    {
        var checkRangeFinderCommand = new CheckRangeFinderCommand
        {
            MaxDistance = 10000
        };
        SendMessage(new NodeMessage(checkRangeFinderCommand.Name, "RangeFinder", this.NodeId, checkRangeFinderCommand));
    }

    public void SendMessage(INodeMessage message)
    {
        Require.ObjectNotNull(message, nameof(INodeMessage));

        if (_MessageService == null)
        {
            throw new Exception("MasterNode.MessageService not defined");
        }

        _MessageService.SendMessage(message);
    }

  void INodeService.Update()
  {
    throw new NotImplementedException();
  }
}
