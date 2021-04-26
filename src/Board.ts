import {Colors, Coordinates, Drawable} from "./types.js";
import Disc from "./Disc.js";
import {ctx} from "./canvasContext.js";

export default class Board implements Drawable {
    color: Colors;
    position: Coordinates;
    height: number;
    width: number;
    matrix: Disc[][];
    rows: number = 6;
    columns: number = 7;
    boardMargin: number = 20;
    discMargin: number = 15;

    constructor(gameWidth: number, gameHeight: number, color: Colors) {
        this.height = gameHeight - 60;
        this.width = gameWidth - 170;
        this.color = color;

        this.position = {
            x: gameWidth / 2 - this.width / 2,
            y: gameHeight - this.height - 10,
        };

        this.matrix = this.buildMatrix();
    }


    private buildMatrix(): Disc[][] {
        const matrix: Disc[][] = [];
        const discDiameter = this.calcDiscDiameter();

        for (let i = 0; i < this.rows; i++) {
            const row: Disc[] = [];
            const discY = this.calcDiscCenter(discDiameter, this.position.y, i);

            for (let j = 0; j < this.columns; j++) {
                const discX = this.calcDiscCenter(discDiameter, this.position.x, j);
                row.push(new Disc({x: discX, y: discY}, discDiameter, Colors.BACKGROUD));
            }
            matrix.push(row);
        }
        return matrix;
    }

    private calcDiscDiameter(): number {
        const diameter = (this.width - (this.discMargin * (this.columns - 1)) - 2 * this.boardMargin) / this.columns;
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

    draw(): void {
        this.drawBoard();
        this.drawDiscs();
    }

    drawBoard(): void {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    drawDiscs(): void {
        for (const row of this.matrix) {
            for (const disc of row) {
                disc.draw();
            }
        }
    }
}
