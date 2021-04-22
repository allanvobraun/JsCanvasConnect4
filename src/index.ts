import {Colors} from "./types.js";
import Board from "./Board.js";

const canvas = document.getElementById("game") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");
const GAME_WIDTH = canvas.width;
const GAME_HEIGHT = canvas.height;

ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
const board = new Board(GAME_WIDTH, GAME_HEIGHT, Colors.BOARD);
board.draw(ctx);

