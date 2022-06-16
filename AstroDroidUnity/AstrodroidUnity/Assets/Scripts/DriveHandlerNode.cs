using AstroDroid.Core.Commands;
using AstroDroid.Core.Interfaces;
using AstroDroid.Core.Responses;
using AstrodroidUnity.Assets.Scripts;
using DG.Tweening;
using System;
using System.Collections.Generic;
using UnityEngine;
using Zenject;

namespace AstroDroidUnity.Assets.Scripts
{
  public enum DriveHandlerState
  {
    NotMoving, NeedMove, Moving, MoveDone
  }

  public class DriveHandlerNode : MonoBehaviour, INodeService
  {
    public string NodeId { get; set; }
    public bool NearSomething { get; set; }
    public float DistanceFromSomething { get; set; }

    IMessageService _MessageService;
    public DriveHandlerState State = new DriveHandlerState();
    Queue<INodeCommand> CommandsQueue = new Queue<INodeCommand>();
    INodeCommand currentNodeCommand;

    [Inject]
    public void Construct(IMessageService messageService)
    {
      _MessageService = messageService;
      NodeId = NodeIds.DriveHandler;
    }

    public void ReceiveMessage(INodeMessage message)
    {
      if (message.Topic == Topics.CheckRangeFinderResponse)
      {
        CheckRangeFinderResponse response = (CheckRangeFinderResponse)message.Content;
        NearSomething = response.Hit;
        DistanceFromSomething = response.Distance;
      }
      else
      {
        INodeCommand command = (INodeCommand)message.Content;
        CommandsQueue.Enqueue(command);

      }
    }

    public void SendMessage(INodeMessage message)
    {
      throw new NotImplementedException();
    }

    private void Start()
    {
      Setup();
    }

    public void Setup()
    {
      if (_MessageService == null)
      {
        throw new Exception("MasterNode.MessageService not defined");
      }

      _MessageService.Subscribe(Topics.Driving, this);
      _MessageService.Subscribe(Topics.CheckRangeFinderResponse, this);
    }

    public void UpdateNode()
    {
      switch (State)
      {
        case DriveHandlerState.NotMoving:
          OnNotMoving();
          break;
        case DriveHandlerState.NeedMove:
          OnNeedMove();
          break;
        case DriveHandlerState.Moving:
          break;
        case DriveHandlerState.MoveDone:
          OnMoveDone();
          break;
        default:
          Debug.LogWarning("state not handled in driver handler node");
          break;
      }
    }

    public void Update()
    {
      UpdateNode();
    }

    private void OnMoveDone()
    {
      State = DriveHandlerState.NotMoving;
    }

    private void OnNeedMove()
    {
      if (currentNodeCommand.Name == Commands.DriveCommand)
      {
        OnDriveCommand();
      }
      else if (currentNodeCommand.Name == Commands.TurnCommand)
      {
        OnTurnCommand();
      }
      else if (currentNodeCommand.Name == Commands.StopCommand)
      {
        OnStopCommand();
      }
      else
      {
        throw new ApplicationException("We can't handle this kind of command: " + currentNodeCommand.Name);
      }
    }

    private void OnStopCommand()
    {
      State = DriveHandlerState.NotMoving;
    }

    private void OnTurnCommand()
    {
      State = DriveHandlerState.Moving;
      var turnCommand = (TurnCommand)currentNodeCommand;
      Vector3 currentRotation = gameObject.transform.rotation.eulerAngles;
      Vector3 newRotation = new Vector3();
      newRotation.x = currentRotation.x;
      if (turnCommand.Direction == AstroDroid.Core.TurnDirection.Left)
        newRotation.y = currentRotation.y - turnCommand.Angle;
      else
        newRotation.y = currentRotation.y + turnCommand.Angle;
      newRotation.z = currentRotation.z;
      transform.DORotate(newRotation, 3).OnComplete(handleMoveCompleted);
    }

    private void OnDriveCommand()
    {
      State = DriveHandlerState.Moving;
      var driveCommand = (DriveCommand)currentNodeCommand;
      if (driveCommand.Direction == AstroDroid.Core.DriveDirection.Forward)
      {
        if (NearSomething && DistanceFromSomething < 2)
        {
          return;
        }

        Vector3 end = this.gameObject.transform.TransformPoint(Vector3.forward * driveCommand.DistanceInMeters);
        transform.DOMove(end, 3).SetEase(Ease.OutQuint).OnComplete(handleMoveCompleted);
      }
      else
      {
        Vector3 end = this.gameObject.transform.TransformPoint(Vector3.back * driveCommand.DistanceInMeters);
        transform.DOMove(end, 3).SetEase(Ease.OutQuint).OnComplete(handleMoveCompleted);
      }
    }

    private void OnNotMoving()
    {
      if (CommandsQueue.Count > 0)
      {
        currentNodeCommand = CommandsQueue.Dequeue();
        State = DriveHandlerState.NeedMove;
      }
    }

    private void handleMoveCompleted()
    {
      State = DriveHandlerState.MoveDone;
    }
  }
}