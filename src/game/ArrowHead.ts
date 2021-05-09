import {Colors, Coordinates, Drawable} from "@/types";
import {drawEquilateralTriangle} from "@/util/helpers";
import UpdateDrawEvent from "./UpdateDrawEvent";


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
    }

    static makeFromArrowPositions(arrowPositions: Coordinates[], size: number, color: Colors): ArrowHead {
        return new ArrowHead(arrowPositions[0], size, color, arrowPositions);
    }

    changeColor(color: Colors): void {
        this.color = color;
        UpdateDrawEvent.fire();
    }

    moveLeft(): void {
        if (this.actualPosition === 0) return;
        this.position = this.arrowPositions[this.actualPosition - 1];
        this.actualPosition--;
        UpdateDrawEvent.fire();
    }

    moveRight(): void {
        if (this.actualPosition === this.arrowPositions.length - 1) return;
        this.position = this.arrowPositions[this.actualPosition + 1];
        this.actualPosition++;
        UpdateDrawEvent.fire();
    }

    draw(): void {
        drawEquilateralTriangle(this.position, this.size, this.color);
    }
}

export default ArrowHead;
