import Game from "@/game/Game";

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
        this.game.play();
    }
}

export default GameController;
