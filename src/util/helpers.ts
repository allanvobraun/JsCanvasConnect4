import {Colors, Coordinates} from "@/types";
import {ctx} from "@/game/canvasContext";

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


export function transposeMatrix<T>(matrix: T[][]): T[][] {
    return matrix[0].map(
        (item, i) => matrix.map(row => row[i])
    );
}

type diagonalsTypes = 'primary' | 'secondary';

export function getMatrixDiagonals<T>(matrix: T[][], diagonalType: diagonalsTypes = 'primary'): T[][] {
    const rowCount = matrix.length;
    const columnCount = matrix[0].length;

    const newMatrix = [];
    const diagonalCount = rowCount + columnCount - 1;

    for (let diagonalTh = 0; diagonalTh < diagonalCount; diagonalTh++) {
        const diagonal = [];
        const start = Math.max(diagonalTh - rowCount + 1, 0);
        const end = Math.min(diagonalTh + 1, columnCount);

        for (let elementIndex = start; elementIndex < end; elementIndex++) {
            const primaryDiagonalIndex = rowCount - diagonalTh + elementIndex - 1;
            const secondaryDiagonalIndex = diagonalTh - elementIndex;

            const rowIndex = diagonalType === 'primary' ? primaryDiagonalIndex : secondaryDiagonalIndex;

            diagonal.push(matrix[rowIndex][elementIndex]);
        }
        newMatrix.push(diagonal);
    }
    return newMatrix;
}
