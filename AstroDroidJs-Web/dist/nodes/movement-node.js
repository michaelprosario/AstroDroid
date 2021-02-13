"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var enums_1 = require("../enums");
var MovementNode = /** @class */ (function () {
    function MovementNode(messageService) {
        this.messageService = messageService;
        this.NodeId = "MovementNode";
        this.messageService.Subscribe(enums_1.Topics.Driving, this);
    }
    MovementNode.prototype.Setup = function () {
    };
    MovementNode.prototype.Update = function () {
    };
    MovementNode.prototype.ReceiveMessage = function (message) {
        if (message.Type === "DriveCommand") {
            console.log(message);
        }
    };
    MovementNode.prototype.SendMessage = function (message) {
    };
    return MovementNode;
}());
exports.MovementNode = MovementNode;
//# sourceMappingURL=movement-node.js.map