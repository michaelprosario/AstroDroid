import { DriveCommand, DriveDirection, IMessageService, INode, INodeMessage } from "astro-droid-js-core";
import { Topics } from "../enums";

export class DriverNode implements INode {
  NodeId: string;

  constructor(private messageService: IMessageService) {
    this.NodeId = "DriverNode";    
  }

  Setup() {
    let commands = [];

    for (let i=0; i<10; i++) {
      let command = new DriveCommand();
      command.direction = DriveDirection.Forward;
      command.distance = 200;

      let command2 = new DriveCommand();
      command2.direction = DriveDirection.Forward;
      command2.distance = 200;

      commands.push(command);
      commands.push(command2);
    }

    for (let command of commands) {
      let message: INodeMessage = {
        Topic: Topics.Driving,
        Content: command,
        Type: command.GetName(),
        Sender: this.NodeId
      }

      this.SendMessage(message)
    }
  }

  Update() {

  }

  ReceiveMessage(message: INodeMessage) {

  }

  SendMessage(message: INodeMessage) {
    if (!message) {
      throw new Error("Message is not defined");
    }

    this.messageService.SendMessage(message);
  }
}