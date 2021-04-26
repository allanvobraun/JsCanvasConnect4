import {Colors, Coordinates, Drawable} from "./types.js";
import {drawEquilateralTriangle} from "./util.js";

class ArrowHead implements Drawable {
    color: Colors;
    position: Coordinates;
    size: number;
    arrowPositions: Coordinates[] = [];
    actualPosition: number = 0;

    constructor(position: Coordinates, size: number, color: Colors, arrowPositions?: Coordinates[]) {
        this.color = color;
        this.size = size;
        this.position = position;
        this.arrowPositions = arrowPositions;
        console.log(this);
    }

    static makeFromArrowPositions(arrowPositions: Coordinates[], size: number, color: Colors): ArrowHead {
        return new ArrowHead(arrowPositions[0], size, color, arrowPositions);
    }

    moveLeft(): void {
        if (this.actualPosition === 0) return;
        this.position = this.arrowPositions[this.actualPosition - 1];
        this.draw();
    }

    moveRight(): void {
        if (this.actualPosition === this.arrowPositions.length) return;
        this.position = this.arrowPositions[this.actualPosition + 1];
        this.draw();
    }

    draw(): void {
        drawEquilateralTriangle(this.position, this.size, this.color);
    }
}
export default ArrowHead;
