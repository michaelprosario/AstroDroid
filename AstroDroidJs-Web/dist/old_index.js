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
var ColorComponent = /** @class */ (function (_super) {
    __extends(ColorComponent, _super);
    function ColorComponent() {
        return _super.call(this, "color-component", {
            color: {
                type: "string",
                default: "colorless",
            },
        }) || this;
    }
    ColorComponent.prototype.init = function () {
        var entityColor = this.el.getAttribute("color");
        aframe_typescript_toolkit_1.EntityBuilder.create("a-text", {
            id: "color-text",
            value: entityColor || this.data.color,
            color: entityColor || "black",
            position: "-1 1.25 0",
        }).attachTo(this.el);
    };
    ColorComponent.prototype.tick = function () {
    };
    return ColorComponent;
}(aframe_typescript_toolkit_1.ComponentWrapper));
exports.ColorComponent = ColorComponent;
new ColorComponent().register();
//# sourceMappingURL=old_index.js.map