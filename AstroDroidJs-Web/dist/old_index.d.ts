import { ComponentWrapper } from "aframe-typescript-toolkit";
interface ColorComponentSchema {
    readonly color: string;
}
export declare class ColorComponent extends ComponentWrapper<ColorComponentSchema> {
    constructor();
    init(): void;
    tick(): void;
}
export {};
