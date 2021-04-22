import {Colors, Coordinates, Drawable} from "./types.js";

class ArrowHead implements Drawable {
    color: Colors;
    private position: Coordinates;

    constructor(x: number, y: number, color: Colors) {
        this.color = color;
        this.position = {
            x: x,
            y: y
        }
    }

    draw(ctx: CanvasRenderingContext2D): void {

    }

}
