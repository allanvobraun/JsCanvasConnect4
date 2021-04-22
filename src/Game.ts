import {Colors, Coordinates, Drawable} from "./types.js";
import {canvas, ctx} from "./canvasContext.js";
import Board from "./Board.js";
import ArrowHead from "./ArrowHead.js";
import Disc from "./Disc.js";

class Game {
    drawables: Drawable[] = [];
    board: Board;
    arrow: ArrowHead;
    arrowPositions: Coordinates[];
    arrowPositionHeight: number = 80; // relative to the fist top dist
    arrowSize: number = 40;
    GAME_WIDTH: number = canvas.width;
    GAME_HEIGHT: number = canvas.height;

    constructor() {
        this.board = new Board(this.GAME_WIDTH, this.GAME_HEIGHT, Colors.BOARD);
        this.arrowPositions = this.getArrowPositions();

        this.arrow = new ArrowHead(this.arrowPositions[0], this.arrowSize, Colors.RED);

        this.drawables.push(this.board);
        this.drawables.push(this.arrow);
    }

    getArrowPositions(): Coordinates[] {
        return this.board.matrix[0].map((disc: Disc) => {
            return {
                x: disc.position.x - this.arrowSize / 2,
                y: disc.position.y - this.arrowPositionHeight
            }
        });
    }

    run(): void {
        ctx.clearRect(0, 0, this.GAME_WIDTH, this.GAME_HEIGHT);
        this.drawables.forEach((drawable: Drawable) => drawable.draw());
    }
}

export default Game;
