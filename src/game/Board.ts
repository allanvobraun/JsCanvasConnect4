import {Colors, Coordinates, Drawable, MatrixCoordinates, Piece} from "@/types";
import Disc from "./Disc";
import {ctx} from "./canvasContext";
import {buildRepeatedArray, getAllMatrixDiagonals, isSubArray, transposeMatrix} from "@/util/helpers";
import Player from "@/game/Player";

export default class Board implements Drawable {
    color: Colors;
    position: Coordinates;
    height: number;
    width: number;
    matrix: number[][];
    discs: Disc[];
    rowCount: number = 6;
    columnCount: number = 7;
    boardMargin: number = 20;
    discMargin: number = 15;
    dirtyDiscCount: number = 0;

    constructor(gameWidth: number, gameHeight: number, color: Colors) {
        this.height = gameHeight - 60;
        this.width = gameWidth - 170;
        this.color = color;

        this.position = {
            x: gameWidth / 2 - this.width / 2,
            y: gameHeight - this.height - 10,
        };

        this.discs = this.buildDiscs();
        this.matrix = this.buildMatrix();
    }

    get totalDiscsCount(): number {
        return this.rowCount * this.columnCount;
    }

    draw(): void {
        this.drawBoard();
        this.drawDiscs();
    }

    drawBoard(): void {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    drawDiscs(): void {
        for (const disc of this.discs) {
            disc.draw();
        }
    }

    placeDisc(columnIndex: number, player: Player): void {
        const coordinate: MatrixCoordinates = {i: 0, j: columnIndex};
        for (let i = this.rowCount; i--;) {
            const row = this.matrix[i];
            if (row[columnIndex] === Piece.EMPTY) {
                coordinate.i = i;
                break;
            }
        }
        this.matrix[coordinate.i][coordinate.j] = player.pieceValue;
        const disc = this.getDiscAtCoordinate(coordinate);
        disc.changeColor(player.color);
        this.dirtyDiscCount++;
    }

    getDiscAtCoordinate(coordinate: MatrixCoordinates): Disc {
        return this.discs.find((disc) => {
            return disc.matrixAddress.i === coordinate.i && disc.matrixAddress.j === coordinate.j;
        });
    }

    isFull(): boolean {
        return this.dirtyDiscCount === this.totalDiscsCount;
    }

    columnIsFull(columnIndex: number): boolean {
        return this.matrix[0][columnIndex] !== Piece.EMPTY;
    }

    checkConnectFour(): boolean {
        const matrix_tanspose = transposeMatrix(this.matrix);

        const diagonals = getAllMatrixDiagonals(this.matrix);

        return this.matrix.some((row: number[]) => this.checkArrayConnectFour(row)) ||
            matrix_tanspose.some((column: number[]) => this.checkArrayConnectFour(column)) ||
            diagonals.some((diagonal: number[]) => this.checkArrayConnectFour(diagonal));
    }

    checkArrayConnectFour(row: number[]): boolean {
        const p1Connect4 = isSubArray(row, buildRepeatedArray(Piece.P1, 4));
        const p2Connect4 = isSubArray(row, buildRepeatedArray(Piece.P2, 4));

        return p1Connect4 || p2Connect4;
    }

    private buildDiscs(): Disc[] {
        const discDiameter = this.calcDiscDiameter();
        const discs: Disc[] = [];

        for (let i = 0; i < this.rowCount; i++) {
            const discY = this.calcDiscCenter(discDiameter, this.position.y, i);

            for (let j = 0; j < this.columnCount; j++) {
                const discX = this.calcDiscCenter(discDiameter, this.position.x, j);
                discs.push(new Disc({x: discX, y: discY}, discDiameter, Colors.BACKGROUD, {i, j}));
            }
        }
        return discs;
    }

    private buildMatrix(): number[][] {
        const matrix = [];
        for (let i = 0; i < this.rowCount; i++) {
            matrix.push(buildRepeatedArray(0, this.columnCount));
        }
        return matrix;
    }

    private calcDiscDiameter(): number {
        const diameter = (this.width - (this.discMargin * (this.columnCount - 1)) - 2 * this.boardMargin) / this.columnCount;
        return Math.floor(diameter);
    }

    private calcDiscCenter(diameter: number, coordinate: number, position: number): number {
        const radius = diameter / 2;
        const firstCirclePosition = coordinate + this.boardMargin + radius;
        if (position === 0) {
            return firstCirclePosition;
        }
        return firstCirclePosition + (radius * 2 + this.discMargin) * position;
    }
}
