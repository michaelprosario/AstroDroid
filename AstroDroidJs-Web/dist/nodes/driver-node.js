"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var astro_droid_js_core_1 = require("astro-droid-js-core");
var enums_1 = require("../enums");
var DriverNode = /** @class */ (function () {
    function DriverNode(messageService) {
        this.messageService = messageService;
        this.NodeId = "DriverNode";
    }
    DriverNode.prototype.Setup = function () {
        var commands = [];
        for (var i = 0; i < 10; i++) {
            var command = new astro_droid_js_core_1.DriveCommand();
            command.direction = astro_droid_js_core_1.DriveDirection.Forward;
            command.distance = 200;
            var command2 = new astro_droid_js_core_1.DriveCommand();
            command2.direction = astro_droid_js_core_1.DriveDirection.Forward;
            command2.distance = 200;
            commands.push(command);
            commands.push(command2);
        }
        for (var _i = 0, commands_1 = commands; _i < commands_1.length; _i++) {
            var command = commands_1[_i];
            var message = {
                Topic: enums_1.Topics.Driving,
                Content: command,
                Type: command.GetName(),
                Sender: this.NodeId
            };
            this.SendMessage(message);
        }
    };
    DriverNode.prototype.Update = function () {
    };
    DriverNode.prototype.ReceiveMessage = function (message) {
    };
    DriverNode.prototype.SendMessage = function (message) {
        if (!message) {
            throw new Error("Message is not defined");
        }
        this.messageService.SendMessage(message);
    };
    return DriverNode;
}());
exports.DriverNode = DriverNode;
//# sourceMappingURL=driver-node.js.map