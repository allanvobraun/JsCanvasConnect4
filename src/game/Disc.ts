import {Colors, Coordinates, Drawable, MatrixCoordinates} from "@/types";
import {ctx} from "./canvasContext";
import UpdateDrawEvent from "./UpdateDrawEvent";

class Disc implements Drawable {
    position: Coordinates;
    diameter: number;
    color: Colors;
    isDirty: boolean = false;
    matrixAddress: MatrixCoordinates;

    constructor(position: Coordinates, diameter: number, color: Colors, matrixAddress: MatrixCoordinates) {
        this.color = color;
        this.diameter = diameter;
        this.position = position;
        this.matrixAddress = matrixAddress;
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
