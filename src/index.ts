import Game from "@/game/Game";
import GameController from "@/game/GameController";
import KeyboardHandler from "@/game/KeyboardHandler";
import 'resources/css/index.css';

window.onload = () => {
    const game = new Game();
    const controller = new GameController(game);
    game.keyboardHandler = new KeyboardHandler(controller);
    game.run();
};
