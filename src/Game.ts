import {Colors, Coordinates, Drawable} from "./types";
import {canvas, ctx} from "./canvasContext";
import Board from "./Board";
import ArrowHead from "./ArrowHead";
import Disc from "./Disc";
import UpdateDrawEvent from "./UpdateDrawEvent";
import Player from "./Player";
import CircularArray from "./CircularArray";
import EndGameModal from "./EndGameModal";
import KeyboardHandler from "./KeyboardHandler";

class Game {
    drawables: Drawable[] = [];
    players: CircularArray<Player>;
    playerTurnIndex: number = 0;
    board: Board;
    arrow: ArrowHead;
    arrowPositions: Coordinates[];
    arrowPositionHeight: number = 80; // relative to the fist top disc
    arrowSize: number = 40;
    GAME_WIDTH: number = canvas.width;
    GAME_HEIGHT: number = canvas.height;
    endGameModal: EndGameModal;
    keyboardHandler: KeyboardHandler;

    constructor() {
        this.board = new Board(this.GAME_WIDTH, this.GAME_HEIGHT, Colors.BOARD);
        this.players = new CircularArray<Player>([
            new Player('MIN', Colors.RED),
            new Player('MAX', Colors.SHREK),
        ]);

        this.arrowPositions = this.getArrowPositions();
        this.arrow = ArrowHead.makeFromArrowPositions(this.arrowPositions, this.arrowSize, this.actualPlayer.color);

        this.drawables.push(this.board);
        this.drawables.push(this.arrow);

        this.endGameModal = new EndGameModal({
            onOk: (param) => this.reset(),
        });
        UpdateDrawEvent.listen(this.update.bind(this));
    }

    get actualPlayer(): Player {
        return this.players.get(this.playerTurnIndex);
    }

    get nextPlayer(): Player {
        return this.players.get(this.playerTurnIndex + 1);
    }

    play(): void {
        if (this.board.columnIsFull(this.arrow.actualPosition)) return;
        this.placeDisc(this.arrow.actualPosition, this.actualPlayer.color);
        this.winCheck();

        this.arrow.changeColor(this.nextPlayer.color);
        this.playerTurnIndex++;
    }

    winCheck(): void {
        if (!this.board.checkConnectFour()) return;
        const winnerColor = this.actualPlayer.color;
        setTimeout(() => {
            this.endGameModal.show(winnerColor);
        }, 200);
    }

    reset(): void {
        location.reload();
    }

    placeDisc(columnIndex: number, color: Colors): void {
        for (let i = this.board.rowCount; i--;) {
            const row = this.board.matrix[i];
            const disc: Disc = row[columnIndex];
            if (!disc.isDirty) {
                disc.changeColor(color);
                break;
            }
        }
    }

    getArrowPositions(): Coordinates[] {
        return this.board.matrix[0].map((disc: Disc): Coordinates => {
            return {
                x: disc.position.x - this.arrowSize / 2,
                y: disc.position.y - this.arrowPositionHeight
            };
        });
    }

    update(): void {
        ctx.clearRect(0, 0, this.GAME_WIDTH, this.GAME_HEIGHT);
        this.drawables.forEach((drawable: Drawable) => drawable.draw());
    }

    run(): void {
        canvas.focus();
        this.keyboardHandler?.enableListeners();
        this.update();
    }
}

export default Game;
