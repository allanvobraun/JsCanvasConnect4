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
}
export default GameController;
