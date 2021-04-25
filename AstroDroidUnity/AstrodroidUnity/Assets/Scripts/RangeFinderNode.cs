
using AstroDroid.Core.Commands;
using AstroDroid.Core.Entities;
using AstroDroid.Core.Interfaces;
using AstroDroid.Core.Responses;
using AstroDroid.Core.Utils;
using System;
using UnityEngine;
using Zenject;

namespace Assets.Scripts
{
    public class RangeFinderNode : MonoBehaviour, INodeService
    {
        public string NodeId { get; set; } = "RangeFinderNode";
        public GameObject Bot;
        IMessageService _MessageService;

        [Inject]
        public void Construct(IMessageService messageService)
        {
            _MessageService = messageService;
            NodeId = "RangeFinderNode";
        }

        public void ReceiveMessage(INodeMessage message)
        {            
            CheckRangeFinderCommand checkRangeFinderCommand = (CheckRangeFinderCommand)message.Content;

            RaycastHit hit;
            Ray ray = new Ray(Bot.transform.position, Bot.transform.forward);
            
            
            bool hitSomething = Physics.Raycast(ray, out hit, checkRangeFinderCommand.MaxDistance);
            CheckRangeFinderResponse response = new CheckRangeFinderResponse
            {
                Hit = hitSomething
            };

            if (hitSomething)
            {
                response.Distance = hit.distance;                
            }
            
            SendMessage(new NodeMessage("CheckRangeFinder", "CheckRangeFinderResponse", NodeId, response));
        }

        public void SendMessage(INodeMessage message)
        {
            Require.ObjectNotNull(message, "message");
            _MessageService.SendMessage(message);
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

            _MessageService.Subscribe("RangeFinder", this);
        }

        public void UpdateNode(){
            
        }

        public void Update()
        {
            Debug.DrawRay(Bot.transform.position, Bot.transform.forward * 10f, Color.red);
        }
    }
}
