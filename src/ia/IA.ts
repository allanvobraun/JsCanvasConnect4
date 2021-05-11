import Player from "@/game/Player";
import Board from "@/game/Board";
import {buildRepeatedArray, isSubArray, randomChoice, transposeMatrix} from "@/util/helpers";
import Game from "@/game/Game";
import cloneDeep from "lodash.clonedeep";
import {BoardConfiguration, Piece} from "@/types";
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

        this.configurations = BoardConfigurationFactory.buildNormalConfigurations(this.player, this.opponent);
        this.winConfiguration = BoardConfigurationFactory.buildWinConfigurations(this.player, this.opponent);

        window.addEventListener('fim-jogada', ((event: CustomEvent) => {
            if (event.detail === this.player) {
                this.play();
            }
        }) as EventListener);
    }

    play(): void {
        console.log("A IA VAI JOGAR");
        const jogada = this.getBestPlay(4);
        this.game.play(jogada.position);
    }

    rateBoard(board: Board): number {
        const locatedConfigurations: BoardConfiguration[] = [];
        const matrix_tanspose = transposeMatrix(board.matrix);

        for (const row of board.matrix) {
            const winConfiguration = this.winConfiguration.find((winConfig) => isSubArray(row, winConfig.pieces));
            if (winConfiguration) {
                return winConfiguration.points;
            }

            const locatedConfigurationsInRow = this.configurations.filter((configuration) => isSubArray(row, configuration.pieces));
            locatedConfigurations.push(...locatedConfigurationsInRow);
        }

        for (const column of matrix_tanspose) {
            if (isSubArray(column, buildRepeatedArray(Piece.EMPTY, 6))) continue;
            const winConfiguration = this.winConfiguration.find((winConfig) => {
                return isSubArray(column, winConfig.pieces);
            });
            if (winConfiguration) {
                return winConfiguration.points;
            }
            const locatedConfigurationsInColumn = this.configurations.filter((configuration) => isSubArray(column, configuration.pieces));
            locatedConfigurations.push(...locatedConfigurationsInColumn);
        }

        if (locatedConfigurations.length === 0) {
            return 0;
        }

        return locatedConfigurations.reduce((acc, config) => config.points + acc, 0);
    }

    isTerminalNode(board: Board): boolean {
        return board.isFull() || board.checkConnectFour();
    }

    possibleColumnsToMove(board: Board): number[] {
        const columnsIndexes: number[] = [];
        for (let i = 0; i < board.columnCount; i++) {
            if (!board.columnIsFull(i)) {
                columnsIndexes.push(i);
            }
        }
        return columnsIndexes;
    }

    getBestPlay(depht: number = 1): ScorePosition {
        return this.minimax(this.game.board, depht, null, true);
    }

    minimax(
        board: Board,
        depth: number,
        position: number,
        maximizingPlayer: boolean,
        alpha: number = Number.NEGATIVE_INFINITY,
        beta: number = Number.POSITIVE_INFINITY
    ): ScorePosition {

        if (depth === 0 || this.isTerminalNode(board)) {
            return {score: this.rateBoard(board), position};
        }
        if (maximizingPlayer) {
            let pivotScore = Number.NEGATIVE_INFINITY;
            const colunasPossiveis = this.possibleColumnsToMove(board);
            let column = randomChoice(colunasPossiveis);

            for (const moveIndex of colunasPossiveis) {

                const boardCopy = cloneDeep(board);
                boardCopy.placeDisc(moveIndex, this.player);
                const minimax = this.minimax(boardCopy, depth - 1, moveIndex, false);
                if (minimax.score > pivotScore) {
                    pivotScore = minimax.score;
                    column = minimax.position;
                }
                alpha = Math.max(alpha, pivotScore);
                if (alpha >= beta) {
                    break;
                }
            }
            return {score: pivotScore, position: column};

        } else {
            let pivotScore = Number.POSITIVE_INFINITY;
            const colunasPossiveis = this.possibleColumnsToMove(board);
            let column = randomChoice(colunasPossiveis);

            for (const moveIndex of colunasPossiveis) {
                const boardCopy = cloneDeep(board);
                boardCopy.placeDisc(moveIndex, this.opponent);
                const minimax = this.minimax(boardCopy, depth - 1, moveIndex, true);
                if (minimax.score < pivotScore) {
                    pivotScore = minimax.score;
                    column = minimax.position;
                }
                beta = Math.min(beta, pivotScore);
                if (alpha >= beta) {
                    break;
                }
            }
            return {score: pivotScore, position: column};
        }
    }

    chooseNewScore(old: ScorePosition, actual: ScorePosition, criterion: (a: number, b: number) => number): ScorePosition {
        if (old.score === actual.score) {
            return old.position === null ? actual : old;
        }
        const value = criterion(old.score, actual.score);
        if (value === old.score) {
            return old;
        }
        return actual;
    }
}

export default IA;
