import Game from "./Game.js";
import GameController from "./GameController.js";
import KeyboardHandler from "./KeyboardHandler.js";

const game = new Game();
const controller = new GameController(game);
const inputHandler = new KeyboardHandler(controller);
game.run();

