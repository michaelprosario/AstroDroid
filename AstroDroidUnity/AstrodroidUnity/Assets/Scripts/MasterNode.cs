using AstroDroid.Core.Interfaces;
using UnityEngine;
using Zenject;

namespace AstroDroidUnity.Assets.Scripts
{
    public class MasterNode : MonoBehaviour, INodeService
    {     
        public string NodeId { get; set; } = "MasterNode";
        IMessageService _MessageService;

        [Inject]
        public void Construct(IMessageService messageService)
        {
            _MessageService = messageService;
        }

        public void ReceiveMessage(INodeMessage message)
        {

        }

        public void SendMessage(INodeMessage message)
        {

        }

        public void Setup()
        {

        }

        public void Update()
        {

        }

        public void UpdateNode() {

        }        
    }
}