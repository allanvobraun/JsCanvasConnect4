import Game from "./Game";
import GameController from "./GameController";
import KeyboardHandler from "./KeyboardHandler";
import MicroModal from 'micromodal';
// import '../resources/css/index.css';
import 'resources/css/index.css';

MicroModal.init();
MicroModal.show('modal-1');

const game = new Game();
const controller = new GameController(game);
const inputHandler = new KeyboardHandler(controller);
game.run();

