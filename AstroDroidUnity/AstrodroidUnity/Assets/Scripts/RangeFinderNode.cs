
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
            Debug.Log("RangeFinderNode");
            Debug.Log("ReceiveMessage(INodeMessage message) -------------- ");
            Debug.Log("topic " + message.Topic);
            Debug.Log("sender " + message.Sender);


            CheckRangeFinderCommand checkRangeFinderCommand = (CheckRangeFinderCommand)message.Content;

            // check sensor 
            RaycastHit hit;
            Ray ray = new Ray(transform.position, transform.forward);
            
            bool hitSomething = Bot.GetComponent<Collider>().Raycast(ray, out hit, 1000);
            Debug.Log("hitSomething --> " + hitSomething);
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

        public void Update()
        {

        }
    }
}
