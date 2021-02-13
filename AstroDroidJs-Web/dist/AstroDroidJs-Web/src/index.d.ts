import { ComponentWrapper } from "aframe-typescript-toolkit";
import { DriverNode } from "./nodes/driver-node";
interface BotDriverSchema {
}
export declare class BotDriverComponent extends ComponentWrapper<BotDriverSchema> {
    driverNode: DriverNode;
    constructor();
    init(): void;
    tick(): void;
}
export {};
