import Game from "./Game";
import GameController from "./GameController";
import KeyboardHandler from "./KeyboardHandler";
import 'resources/css/index.css';

const game = new Game();
const controller = new GameController(game);
const inputHandler = new KeyboardHandler(controller);
game.run();

