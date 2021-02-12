import { INodeMessage } from "./node-message";

export interface INode {
  NodeId: string;
  Setup();
  Update();
  ReceiveMessage(message: INodeMessage);
  SendMessage(message: INodeMessage);
}
