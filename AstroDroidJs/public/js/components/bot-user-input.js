"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotUserInputNode = exports.OnMoveCommand = void 0;
const astro_droid_js_core_1 = require("astro-droid-js-core");
class OnMoveCommand {
    constructor() {
        this.Type = "OnMoveCommand";
        this.Topic = "BotUserInput";
        this.Sender = "botUserInput";
    }
}
exports.OnMoveCommand = OnMoveCommand;
class BotUserInputNode {
    constructor(messageService) {
        this.messageService = messageService;
        this.NodeId = "botUserInput";
    }
    Setup() {
    }
    Update() {
        throw new Error('Method not implemented.');
    }
    ReceiveMessage(message) {
        throw new Error('Method not implemented.');
    }
    SendMessage(message) {
        if (!message) {
            throw new Error("Message is not defined");
        }
        this.messageService.SendMessage(message);
    }
}
exports.BotUserInputNode = BotUserInputNode;
AFRAME.registerComponent('bot-user-input', {
    schema: {
        bar: { type: 'number' },
        baz: { type: 'string' }
    },
    init: function () {
        let messageService = new astro_droid_js_core_1.MessageService();
        let botUserInputNode = new BotUserInputNode(messageService);
        this.el.addEventListener('OnMoveCommand', function (event) {
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
    tick: function (time, timeDelta) {
        // Do something on every scene tick or frame.
    },
});
