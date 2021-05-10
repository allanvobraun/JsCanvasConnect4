import Game from "@/game/Game";
import GameController from "@/game/GameController";
import KeyboardHandler from "@/game/KeyboardHandler";
import IA from '@/ia/IA';
import 'resources/css/index.css';
import Player from "@/game/Player";
import {Colors} from "@/types";

window.onload = () => {
    const players = [
        new Player('MIN', Colors.RED),
        new Player('MAX', Colors.SHREK),
    ];
    const game = new Game(players);
    const controller = new GameController(game);
    game.keyboardHandler = new KeyboardHandler(controller);
    game.run();
    const robo = new IA(players[1], players[0], game);
    (window as any).robo = robo;
    console.log(robo);
};
