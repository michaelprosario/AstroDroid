import { ISprite, ISpriteBehavior } from "../interfaces/interfaces";
import { GameConstants } from "./game-constants";

export class GridBotSetup {
    constructor(
        public x: number,
        public y: number,
        public gridCellWidth: number
    ) { }
}

export class GridBot implements ISprite {
    currentBehavior: ISpriteBehavior | undefined;
    forwardDelta: number = GameConstants.gridWidth;
    gridCellWidth: number = GameConstants.gridWidth;
    gridX: number = 0;
    gridY: number = 0;
    heading: number = 0;
    idleBehavior: ISpriteBehavior | undefined;
    moveBehavior: ISpriteBehavior | undefined;
    x: number = 0;
    y: number = 0;


    moveRight(angle: number) {
        this.heading += angle;
    }

    moveLeft(angle: number) {
        this.heading -= angle;
    }

    start(): void {
    }

    update(): void {
        this.currentBehavior?.update(this);
    }

    finish(): void { }

    setupBot(setup: GridBotSetup): void {
        this.gridCellWidth = setup.gridCellWidth;
        this.gridX = setup.x;
        this.gridY = setup.y;
        this.x = this.gridCellWidth * this.gridX;
        this.y = this.gridCellWidth * this.gridY;
    }

    moveForward(delta: number) {
        this.currentBehavior = this.moveBehavior;
        this.forwardDelta = delta;
    }
}