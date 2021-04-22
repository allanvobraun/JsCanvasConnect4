import {Colors, Coordinates, Drawable} from "./types.js";
import {drawEquilateralTriangle} from "./util.js";

class ArrowHead implements Drawable {
    color: Colors;
    position: Coordinates;
    size: number;

    constructor(position: Coordinates, size: number, color: Colors) {
        this.color = color;
        this.size = size;
        this.position = position;
    }

    draw(): void {
        drawEquilateralTriangle(this.position, this.size, this.color);
    }
}
export default ArrowHead;
