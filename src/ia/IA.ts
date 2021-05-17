import Player from "@/game/Player";
import Board from "@/game/Board";
import {buildRepeatedArray, getAllMatrixDiagonals, isSubArray, transposeMatrix} from "@/util/helpers";
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

        const matrixDiagonals = getAllMatrixDiagonals(board.matrix);
        for (const diagonal of matrixDiagonals) {
            if (isSubArray(diagonal, buildRepeatedArray(Piece.EMPTY, 6))) continue;
            const winConfiguration = this.winConfiguration.find((winConfig) => {
                return isSubArray(diagonal, winConfig.pieces);
            });
            if (winConfiguration) {
                return winConfiguration.points;
            }
            const locatedConfigurationsInColumn = this.configurations.filter((configuration) => isSubArray(diagonal, configuration.pieces));
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
        return this.minimax(this.game.board, depht);
    }

    minimax(board: Board, depth: number): ScorePosition {
        return this.maximazing(board, depth,Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
    }

    maximazing(board: Board, depth: number, alpha: number, beta: number): ScorePosition {
        if (depth === 0 || this.isTerminalNode(board)) {
            return {score: this.rateBoard(board), position: null};
        }
        let pivotScore: ScorePosition = {score: Number.NEGATIVE_INFINITY, position: null};

        for (const moveIndex of this.possibleColumnsToMove(board)) {
            const boardCopy = cloneDeep(board);
            boardCopy.placeDisc(moveIndex, this.player);

            const minimax = this.minimizing(boardCopy, depth - 1, alpha, beta);
            pivotScore = this.chooseNewScore(pivotScore, {position: moveIndex, score: minimax.score}, Math.max);

            if (pivotScore.score >= beta) {
                console.log("max alphabeta");
                return pivotScore;
            }
            alpha = Math.max(alpha, pivotScore.score);
        }
        return pivotScore;
    }

    minimizing(board: Board, depth: number, alpha: number, beta: number): ScorePosition {
        if (depth === 0 || this.isTerminalNode(board)) {
            return {score: this.rateBoard(board), position: null};
        }
        let pivotScore: ScorePosition = {score: Number.POSITIVE_INFINITY, position: null};

        for (const moveIndex of this.possibleColumnsToMove(board)) {
            const boardCopy = cloneDeep(board);
            boardCopy.placeDisc(moveIndex, this.opponent);

            const minimax = this.maximazing(boardCopy, depth - 1, alpha, beta);
            pivotScore = this.chooseNewScore(pivotScore, {position: moveIndex, score: minimax.score}, Math.min);

            if (pivotScore.score <= alpha) {
                console.log("min alphabeta");
                return pivotScore;
            }
            beta = Math.min(beta, pivotScore.score);
        }
        return pivotScore;
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
