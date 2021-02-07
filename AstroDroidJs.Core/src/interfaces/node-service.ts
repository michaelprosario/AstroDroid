import { INodeMessage } from "./node-message";

export interface INodeService {
  NodeId: string;
  Setup();
  Update();
  ReceiveMessage(message: INodeMessage);
}
