import Game from "./Game";
import GameController from "./GameController";
import KeyboardHandler from "./KeyboardHandler";
import 'resources/css/index.css';

window.onload = () => {
    const game = new Game();
    const controller = new GameController(game);
    game.keyboardHandler = new KeyboardHandler(controller);
    game.run();
};
