import {Colors} from "./types.js";
import Board from "./Board.js";
import ArrowHead from "./ArrowHead.js";
import {canvas, ctx} from "./canvasContext.js";

const GAME_WIDTH = canvas.width;
const GAME_HEIGHT = canvas.height;

ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
const board = new Board(GAME_WIDTH, GAME_HEIGHT, Colors.BOARD);
board.draw();
// drawEquilateralTriangle(ctx, {x: 155, y: 10}, 50, Colors.RED);
// drawEquilateralTriangle(board.position, 40, Colors.RED);
const arrow = new ArrowHead(board.position, 40, Colors.RED);
arrow.draw();


