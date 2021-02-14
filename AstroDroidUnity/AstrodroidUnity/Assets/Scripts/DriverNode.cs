using UnityEngine;
using AstroDroid.Core.Interfaces;
using AstroDroid.Core.Commands;
using AstroDroid.Core;
using AstroDroid.Core.Entities;
using System;
using Zenject;
using AstroDroid.Core.Utils;

public class DriverNode : MonoBehaviour, INodeService
{
    public string NodeId { get; set; } = "DriverNode";
    IMessageService _MessageService;

    [Inject]
    public void Construct(IMessageService messageService)
    {
        _MessageService = messageService;
    }

    public void ReceiveMessage(INodeMessage message)
    {

    }

    public void Setup()
    {
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

            var message1 = new NodeMessage(driveForward.Name, "Driving", this.NodeId, driveForward);
            SendMessage(message1);
            var message2 = new NodeMessage(turnCommand.Name, "Driving", this.NodeId, turnCommand);
            SendMessage(message2);
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
