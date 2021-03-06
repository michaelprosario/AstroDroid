using AstroDroid.Core.Interfaces;
using System;
using UnityEngine;
using Zenject;
using System.Collections.Generic;
using AstroDroid.Core.Commands;
using DG.Tweening;

namespace AstroDroidUnity.Assets.Scripts
{
    public enum DriveHandlerState
    {
        NotMoving, NeedMove, Moving, MoveDone
    }

    public class DriveHandlerNode : MonoBehaviour, INodeService
    {
        public string NodeId { get; set; }
        IMessageService _MessageService;
        public DriveHandlerState State = new DriveHandlerState();
        Queue<INodeCommand> CommandsQueue = new Queue<INodeCommand>();
        INodeCommand currentNodeCommand;

        [Inject]
        public void Construct(IMessageService messageService)
        {
            _MessageService = messageService;
            NodeId = "DriveHandler";
        }

        public void ReceiveMessage(INodeMessage message)
        {
            Debug.Log("received message - placed into queue");
            INodeCommand command = (INodeCommand)message.Content;
            CommandsQueue.Enqueue(command);
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

            _MessageService.Subscribe("Driving", this);
        }

        public void Update()
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

        private void OnMoveDone()
        {
            State = DriveHandlerState.NotMoving;
        }

        private void OnNeedMove()
        {
            if (currentNodeCommand.Name == "DriveCommand")
            {
                OnDriveCommand();
            }
            else if (currentNodeCommand.Name == "TurnCommand")
            {
                OnTurnCommand();
            }
            else
            {
                throw new ApplicationException("We can't handle this kind of command: " + currentNodeCommand.Name);
            }
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