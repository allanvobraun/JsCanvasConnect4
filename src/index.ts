import Game from "@/game/Game";
import GameController from "@/game/GameController";
import KeyboardHandler from "@/game/KeyboardHandler";
import IA from '@/ia/IA';
import 'resources/css/index.css';
import Player from "@/game/Player";
import {Colors, Piece} from "@/types";

window.onload = () => {
    const userPlayer = new Player('MIN', Colors.RED, Piece.P1);
    const iaPlayer = new Player('MAX', Colors.SHREK, Piece.P2);

    const players = [
        userPlayer,
        iaPlayer,
    ];

    const game = new Game(players);
    const playerController = new GameController(game, userPlayer);
    const iaController = new GameController(game, iaPlayer);

    game.keyboardHandler = new KeyboardHandler(playerController);
    game.run();
    const robo = new IA(iaPlayer, userPlayer, game, iaController);
    // (window as any).robo = robo;
    // console.log(robo);
};
