"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var aframe_typescript_toolkit_1 = require("aframe-typescript-toolkit");
var astro_droid_js_core_1 = require("astro-droid-js-core");
var driver_node_1 = require("./nodes/driver-node");
var messageService = new astro_droid_js_core_1.MessageService();
var BotDriverComponent = /** @class */ (function (_super) {
    __extends(BotDriverComponent, _super);
    function BotDriverComponent() {
        return _super.call(this, "bot-driver", {}) || this;
    }
    BotDriverComponent.prototype.init = function () {
        this.driverNode = new driver_node_1.DriverNode(messageService);
    };
    BotDriverComponent.prototype.tick = function () {
    };
    return BotDriverComponent;
}(aframe_typescript_toolkit_1.ComponentWrapper));
exports.BotDriverComponent = BotDriverComponent;
new BotDriverComponent().register();
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
//# sourceMappingURL=index.js.map