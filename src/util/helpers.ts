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

export function getAllMatrixDiagonals<T>(matrix: T[][]): T[][] {
    const mainDiagonals = getMatrixDiagonals(matrix, 'primary');
    const secondaryDiagonals = getMatrixDiagonals(matrix, 'secondary');
    return mainDiagonals.concat(secondaryDiagonals);
}

/**
 * Retorna uma matriz feita da matriz transposta  + matriz de diagonais + matriz original
 * @param matrix
 */
export function combinatoryMatrixOf<T>(matrix: T[][]): T[][] {
    return matrix.concat(transposeMatrix(matrix), getAllMatrixDiagonals(matrix));
}

/**
 * Remove empty rows
 * @param matrix
 * @param emptyItem
 */
export function stripMatrixRows(matrix: number[][], emptyItem: number): number[][] {
    const newMatrix: number[][] = [];
    const emptyRow = buildRepeatedArray(emptyItem, matrix[0].length);
    for (const row of matrix) {
        if (arrayEquals(emptyRow, row)) {
            continue;
        }
        newMatrix.push(row);
    }
    return newMatrix;
}

export function arrayEquals(array1: number[], array2: number[]): boolean {
    if (array1.length !== array2.length) return false;
    if (array1.length === 0) return true;
    return array1.every((item, index) => item === array2[index]);
}

export function isSubArray(array1: number[], array2: number[]): boolean {
    for (let i = 0; i < array1.length; i++) {
        if (arrayEquals(array1.slice(i, i + array2.length), array2)) {
            return true;
        }
    }
    return false;
}

export function buildRepeatedArray<T>(item: T, length: number): T[] {
    return Array.from({length}, (_, i) => item);
}
