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
        Debug.Log("DriverNode got message");
        Debug.Log("topic: " + message.Topic);
        Debug.Log("from: " + message.Sender);
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
        for(int i=0; i<10; i++)
        {
            var driveForward = new DriveCommand { 
                Direction = DriveDirection.Forward, 
                DistanceInMeters = 2f 
            };

            var turnCommand = new TurnCommand
            {
                Direction = TurnDirection.Left,
                Angle = 45
            };

            var checkRangeFinderCommand = new CheckRangeFinderCommand
            {
                MaxDistance = 3
            };
            
            SendMessage(new NodeMessage(driveForward.Name, "Driving", this.NodeId, driveForward));            
            SendMessage(new NodeMessage(turnCommand.Name, "Driving", this.NodeId, turnCommand));            
            SendMessage(new NodeMessage(checkRangeFinderCommand.Name, "RangeFinder", this.NodeId, checkRangeFinderCommand));
        }
    }

    void Start()
    {
        Setup();
    }

    void INodeService.Update()
    {

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
}
