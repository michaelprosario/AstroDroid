import { IMessageService, INode, INodeMessage } from "astro-droid-js-core";
export declare class MovementNode implements INode {
    private messageService;
    NodeId: string;
    constructor(messageService: IMessageService);
    Setup(): void;
    Update(): void;
    ReceiveMessage(message: INodeMessage): void;
    SendMessage(message: INodeMessage): void;
}
