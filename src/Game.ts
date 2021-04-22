import {Colors, Drawable} from "./types.js";
import {canvas, ctx} from "./canvasContext.js";
import Board from "./Board.js";
import ArrowHead from "./ArrowHead.js";

class Game {
    drawables: Drawable[] = [];
    board: Board;
    arrow: ArrowHead;
    GAME_WIDTH: number = canvas.width;
    GAME_HEIGHT: number = canvas.height;

    constructor() {
        this.board = new Board(this.GAME_WIDTH, this.GAME_HEIGHT, Colors.BOARD);
        this.arrow = new ArrowHead(this.board.position, 40, Colors.RED);

        this.drawables.push(this.board);
        this.drawables.push(this.arrow);
    }

    run(): void {
        ctx.clearRect(0, 0, this.GAME_WIDTH, this.GAME_HEIGHT);
        this.drawables.forEach((drawable: Drawable) => drawable.draw());
    }
}
export default Game;
