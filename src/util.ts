import {Colors, Coordinates} from "./types.js";
import {ctx} from "./canvasContext.js";

export function drawEquilateralTriangle(
    coordinate: Coordinates,
    size: number,
    color: Colors,
    lineColor: Colors = Colors.BLACK
): void {

    const height = size * Math.cos(Math.PI / 6);
    const triangleXCenter = coordinate.x + size / 2;

    ctx.beginPath();
    ctx.moveTo(coordinate.x, coordinate.y);
    ctx.lineTo(coordinate.x + size, coordinate.y);
    ctx.lineTo(triangleXCenter, coordinate.y + height);
    ctx.closePath();

    // the outline
    ctx.lineWidth = 5;
    ctx.strokeStyle = lineColor;
    ctx.stroke();

    // the fill color
    ctx.fillStyle = color;
    ctx.fill();
}

