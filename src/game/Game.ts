import {Colors, Coordinates, Drawable} from "@/types";
import {canvas, ctx} from "./canvasContext";
import Board from "./Board";
import ArrowHead from "./ArrowHead";
import Disc from "./Disc";
import UpdateDrawEvent from "./UpdateDrawEvent";
import Player from "./Player";
import CircularArray from "@/util/CircularArray";
import KeyboardHandler from "./KeyboardHandler";
import {ModalFacade} from "@/util/ModalFacade";

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
    keyboardHandler: KeyboardHandler;

    constructor(players: Player[]) {
        this.board = new Board(this.GAME_WIDTH, this.GAME_HEIGHT, Colors.BOARD);
        this.players = new CircularArray<Player>(players);

        this.players = new CircularArray<Player>([
            new Player('MIN', Colors.RED),
            new Player('MAX', Colors.SHREK),
        ]);

        this.arrowPositions = this.getArrowPositions();
        this.arrow = ArrowHead.makeFromArrowPositions(this.arrowPositions, this.arrowSize, this.actualPlayer.color);

        this.drawables.push(this.board);
        this.drawables.push(this.arrow);

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
        this.board.placeDisc(this.arrow.actualPosition, this.actualPlayer.color);

        this.winCheck();
        this.drawCheck();

        this.arrow.changeColor(this.nextPlayer.color);
        this.playerTurnIndex++;
    }

    winCheck(): void {
        if (!this.board.checkConnectFour()) return;
        const winnerColor = this.actualPlayer.color;
        this.showEndGameModal(winnerColor);
    }

    showEndGameModal(winnerColor: Colors): void {
        ModalFacade.fire({
            title: 'Fim de jogo',
            message: `
            Vencedor: &nbsp&nbsp
            <span class="color-displayer" style="background-color: ${winnerColor}"></span>
            `,
            closeButtonText: 'Fechar',
            okButtonText: 'Novo Jogo',
            onOk: () => this.reset(),
            delay: 200
        });
    }

    showDrawModal(): void {
        ModalFacade.fire({
            title: 'Empatou!',
            closeButtonText: 'Fechar',
            okButtonText: 'Novo Jogo',
            onOk: () => this.reset(),
            delay: 200
        });
    }

    drawCheck(): void {
        if (this.board.isFull()) {
            this.showDrawModal();
        }
    }

    reset(): void {
        location.reload();
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
