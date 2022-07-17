import { GridBot } from "../core/entities/grid-bot";
import { MathService } from "../core/services/math-service";

function drawImageCenter(image: any, x: number, y: number, cx: number, cy: number, scale: number, rotation: number, ctx: any){
    console.log(rotation);
    ctx.setTransform(scale, 0, 0, scale, x, y); // sets scale and origin
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.drawImage(image, -cx, -cy);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
} 

function drawImageCenter2(img: any, ctx: any, xPos: number, yPos: number, angle: number) {
 
    ctx.save()
    ctx.scale(0.1,0.1);
    var pos = {x: xPos, y: yPos}
    ctx.translate(pos.x ,pos.y)    
    ctx.rotate(angle)
    ctx.drawImage(img, -img.width / 2, -img.height / 2, img.width, img.height)
    ctx.restore()
}

export class GridBotView {
    canvas: any | undefined;
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
    
    constructor(private gridBot: GridBot, drawingCanvas: any, private botImage: any) {        
        this.canvas = drawingCanvas;
        let offset = gridBot.gridCellWidth / 2;
    }

    update() {
        let ctx = this.canvas.getContext('2d');
        
        let rotation = MathService.degreesToRadians(this.gridBot.heading);
        //drawImageCenter(this.botImage, this.gridBot.x, this.gridBot.y,15,15, 0.1, rotation, ctx);
        drawImageCenter2(this.botImage, ctx, this.gridBot.x, this.gridBot.y, rotation);
        //ctx.setTransform(1,0,0,1,0,0); // which is much quicker than save and restore
    }
}