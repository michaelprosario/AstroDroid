import { ComponentWrapper, EntityBuilder } from "aframe-typescript-toolkit"

interface BotUserInputSchema {    
}

export class BotUserInputComponent extends ComponentWrapper<BotUserInputSchema> {

    constructor() {
        super("bot-user-input", {})
    }

    init() {

    }

    tick() {
        
    }
}

new BotUserInputComponent().register()


/*

import { MessageService, INodeService, IMessageService, INodeMessage } from "astro-droid-js-core";

export class OnMoveCommand implements INodeMessage {
  Type: string = "OnMoveCommand";
  Content: any;
  Topic: string = "BotUserInput";
  Sender: string = "botUserInput";
}

export class BotUserInputNode implements INodeService {
  NodeId: string;

  constructor(private messageService: IMessageService) {
    this.NodeId = "botUserInput";
  }

  Setup() {

  }

  Update() {
    throw new Error('Method not implemented.');
  }

  ReceiveMessage(message: INodeMessage) {
    throw new Error('Method not implemented.');
  }

  SendMessage(message: INodeMessage) {
    if (!message) {
      throw new Error("Message is not defined");
    }

    this.messageService.SendMessage(message);
  }
}


AFRAME.registerComponent('bot-user-input', {

  schema: {
    bar: { type: 'number' },
    baz: { type: 'string' }
  },

  init: function () {
    let messageService = new MessageService();
    let botUserInputNode = new BotUserInputNode(messageService);

    this.el.addEventListener('OnMoveCommand', function (event: any) {
      debugger;
      console.log('OnMoveCommand', event);
      let command = new OnMoveCommand();
      command.Content = event.detail.moveRequest;
      botUserInputNode.SendMessage(command);
    });
  },

  update: function () {
    // Do something when component's data is updated.
  },

  remove: function () {
    // Do something the component or its entity is detached.
  },

  tick: function (time: number, timeDelta: number) {
    // Do something on every scene tick or frame.
  },

});
*/