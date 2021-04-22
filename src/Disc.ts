import {Colors, Coordinates, Drawable} from "./types";
import {ctx} from "./canvasContext.js";

class Disc implements Drawable {
    position: Coordinates;
    diameter: number;
    color: Colors;

    constructor(position: Coordinates, diameter: number, color: Colors) {
        this.color = color;
        this.diameter = diameter;
        this.position = position;
    }

    draw(): void {
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.diameter /2, 0, 2 * Math.PI, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

export default Disc;
