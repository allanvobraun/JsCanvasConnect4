import {Colors, Coordinates, Drawable} from "./types";

class Disc implements Drawable {
    private position: Coordinates;
    private diameter: number;
    color: Colors;


    constructor(x: number, y: number, diameter: number, color: Colors) {
        this.color = color;
        this.diameter = diameter;

        this.position = {
            x: x,
            y: y
        }
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.diameter /2, 0, 2 * Math.PI, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

export default Disc;
