import { IMessageService, INode, INodeMessage } from "astro-droid-js-core";
import { Topics } from "../enums";

export class MovementNode implements INode {
  NodeId: string;

  constructor(private messageService: IMessageService) {
    this.NodeId = "MovementNode";    
    this.messageService.Subscribe(Topics.Driving, this);
  }

  Setup() {
  }

  Update() {

  }

  ReceiveMessage(message: INodeMessage) {
    if(message.Type === "DriveCommand"){
      console.log(message);
    }
  }

  SendMessage(message: INodeMessage) 
  {
    
  }
}