import Game from "./Game.js";

class GameController {
    game: Game;

    constructor(game: Game) {
        this.game = game;
    }

    moveLeft(): void {
        this.game.arrow.moveLeft();
    }

    moveRight(): void {
        this.game.arrow.moveRight();
    }

    playerMove(): void {
        this.game.board.placeDisc(this.game.arrow.actualPosition);
    }
}

export default GameController;
