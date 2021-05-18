import Game from "@/game/Game";
import Player from "@/game/Player";

class GameController {
    game: Game;
    player: Player;
    locked: boolean;

    constructor(game: Game, player: Player, startLocked: boolean = false) {
        this.game = game;
        this.player = player;
        this.locked = startLocked;

        window.addEventListener('fim-jogada', ((event: CustomEvent) => {
            this.locked = event.detail !== this.player;
        }) as EventListener);
    }

    moveLeft(): void {
        this.game.arrow.moveLeft();
    }

    moveRight(): void {
        this.game.arrow.moveRight();
    }

    playerMove(position?: number): void {
        if (!this.locked) {
            this.game.play(this.player, position);
        }
    }
}

export default GameController;
