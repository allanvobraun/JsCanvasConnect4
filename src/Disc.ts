import {Colors, Coordinates, Drawable} from "./types";
import {ctx} from "./canvasContext.js";
import UpdateDrawEvent from "./UpdateDrawEvent.js";

class Disc implements Drawable {
    position: Coordinates;
    diameter: number;
    color: Colors;
    isDirty: boolean = false;

    constructor(position: Coordinates, diameter: number, color: Colors) {
        this.color = color;
        this.diameter = diameter;
        this.position = position;
    }

    changeColor(color: Colors): void {
        this.color = color;
        this.isDirty = true;
        UpdateDrawEvent.fire();
    }

    draw(): void {
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.diameter / 2, 0, 2 * Math.PI, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    equals(other: Disc): boolean {
        return this.color === other?.color && this.isDirty;
    }
}

export default Disc;
