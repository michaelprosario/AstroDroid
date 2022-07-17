import { GridBot } from "../core/entities/grid-bot";

export class GridBotView {
    start() {
        document.addEventListener('keydown', keyEventArgs => {
            if (keyEventArgs.key === 'w') {
                this.gridBot.moveForward(12);
            }

            if (keyEventArgs.key === 'a') {
                this.gridBot.moveLeft(45);
            }

            if (keyEventArgs.key === 'd') {
                this.gridBot.moveRight(45);
            }

            if (keyEventArgs.key === 's') {
                this.gridBot.moveForward(-12);
            }

        });
    }
    sprite: Sprite;
    constructor(private gridBot: GridBot) {
        this.sprite = Sprite.from('assets/grid-bot.png')
        let offset = gridBot.gridCellWidth / 2;
        this.sprite.pivot.x = offset;
        this.sprite.pivot.y = offset;
        this.update();
    }

    update() {
        this.sprite.x = this.gridBot.x;
        this.sprite.y = this.gridBot.y;
        this.sprite.width = this.gridBot.gridCellWidth;
        this.sprite.height = this.gridBot.gridCellWidth;

        this.sprite.angle = this.gridBot.heading;
    }
}