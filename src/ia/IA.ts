import Player from "@/game/Player";
import Disc from "@/game/Disc";
import DiscFactory from "@/util/DiscFactory";
import Board from "@/game/Board";
import {isSubArray, transposeMatrix} from "@/util/helpers";
import Game from "@/game/Game";
import cloneDeep from "lodash.clonedeep";
import {BoardConfiguration} from "@/types";
import BoardConfigurationFactory from "@/ia/BoardConfigurationFactory";

interface ScorePosition {
    score: number;
    position: number;
}

class IA {
    player: Player;
    opponent: Player;
    configurations: BoardConfiguration[];
    winConfiguration: BoardConfiguration[];
    game: Game;

    constructor(player: Player, enemy: Player, game: Game) {
        this.player = player;
        this.opponent = enemy;
        this.game = game;

        // this.configurations = BoardConfigurationFactory.buildNormalConfigurations(this.player, this.opponent);
        // this.winConfiguration = BoardConfigurationFactory.buildWinConfigurations(this.player, this.opponent);
    }



    // rateBoard(board: Board): number {
    //     const locatedConfigurations: BoardConfiguration[] = [];
    //     const matrix_tanspose = transposeMatrix(board.matrix);
    //     for (const row of board.matrix) {
    //         const winConfiguration = this.winConfiguration.find((winConfig) => isSubArray(row, winConfig.discs));
    //         if (winConfiguration) {
    //             return winConfiguration.points;
    //         }
    //
    //         const locatedConfigurationsInRow = this.configurations.filter((configuration) => isSubArray(row, configuration.discs));
    //         locatedConfigurations.push(...locatedConfigurationsInRow);
    //     }
    //
    //     for (const column of matrix_tanspose) {
    //         const winConfiguration = this.winConfiguration.find((winConfig) => isSubArray(column, winConfig.discs));
    //         if (winConfiguration) {
    //             return winConfiguration.points;
    //         }
    //         const locatedConfigurationsInColumn = this.configurations.filter((configuration) => isSubArray(column, configuration.discs));
    //         locatedConfigurations.push(...locatedConfigurationsInColumn);
    //     }
    //
    //     return locatedConfigurations.reduce((acc, config) => config.points + acc, 0);
    // }

    // isTerminalNode(board: Board): boolean {
    //     return board.isFull();
    // }
    //
    // possibleColumnsToMove(board: Board): number[] {
    //     const columnsIndexes: number[] = [];
    //     for (let i = 0; i < board.columnCount; i++) {
    //         if (!board.columnIsFull(i)) {
    //             columnsIndexes.push(i);
    //         }
    //     }
    //     return columnsIndexes;
    // }
    //
    // showBestPlay(depht: number = 1): void {
    //     console.log(this.minimax(this.game.board, depht, 0, true));
    // }
    //
    // minimax(board: Board, depth: number, position: number, maximizingPlayer: boolean): ScorePosition {
    //     if (depth === 0 || this.isTerminalNode(board)) {
    //         return {score: this.rateBoard(board), position};
    //     }
    //     if (maximizingPlayer) {
    //         let pivotScore: ScorePosition = {score: Number.NEGATIVE_INFINITY, position};
    //         for (const moveIndex of this.possibleColumnsToMove(board)) {
    //             const boardCopy = cloneDeep(board);
    //             boardCopy.placeDisc(moveIndex, this.player.color);
    //             const minimax = this.minimax(boardCopy, depth - 1, moveIndex, false);
    //             pivotScore = this.chooseNewScore(pivotScore, minimax, Math.max);
    //         }
    //         return pivotScore;
    //     } else {
    //         let pivotScore: ScorePosition = {score: Number.POSITIVE_INFINITY, position};
    //
    //         for (const moveIndex of this.possibleColumnsToMove(board)) {
    //             const boardCopy = cloneDeep(board);
    //             boardCopy.placeDisc(moveIndex, this.player.color);
    //             const minimax = this.minimax(boardCopy, depth - 1, moveIndex, true);
    //             pivotScore = this.chooseNewScore(pivotScore, minimax, Math.min);
    //         }
    //         return pivotScore;
    //     }
    // }
    //
    // chooseNewScore(old: ScorePosition, actual: ScorePosition, criterion: (a: number, b: number) => number): ScorePosition {
    //     const value = criterion(old.score, actual.score);
    //     if (value === old.score) {
    //         return old;
    //     }
    //     return actual;
    // }
}

export default IA;
