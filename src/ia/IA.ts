import Player from "@/game/Player";
import Board from "@/game/Board";
import {combinatoryMatrixOf, getAllMatrixDiagonals, isSubArray, stripMatrixRows, transposeMatrix} from "@/util/helpers";
import Game from "@/game/Game";
import cloneDeep from "lodash.clonedeep";
import {BoardConfiguration, Piece} from "@/types";
import BoardConfigurationFactory from "@/ia/BoardConfigurationFactory";
import GameController from "@/game/GameController";

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
    iaController: GameController;
    optimizeEmptyRows: boolean = true;

    constructor(player: Player, enemy: Player, game: Game, iaController: GameController) {
        this.player = player;
        this.opponent = enemy;
        this.game = game;
        this.iaController = iaController;

        this.configurations = BoardConfigurationFactory.buildNormalConfigurations(this.player, this.opponent);
        this.winConfiguration = BoardConfigurationFactory.buildWinConfigurations(this.player, this.opponent);

        window.addEventListener('fim-jogada', ((event: CustomEvent) => {
            if (event.detail === this.player) {
                setTimeout(() => this.play(), 1000);
            }
        }) as EventListener);
    }

    play(): void {
        const jogada = this.getBestPlay(4);
        this.iaController.playerMove(jogada.position);
    }

    rateBoard(board: Board, endgameBoard: boolean): number {
        if (endgameBoard) {
            return this.getWinConfiguration(board.matrix).points;
        }

        const locatedConfigurations: BoardConfiguration[] = this.getConfigurations(board.matrix);

        if (locatedConfigurations.length === 0) {
            return 0;
        }

        return locatedConfigurations.reduce((acc, config) => config.points + acc, 0);
    }

    getConfigurations(matrix: number[][]): BoardConfiguration[] {
        const locatedConfigurations: BoardConfiguration[] = [];
        let testMatrix: number[][];

        if (this.optimizeEmptyRows) {
            const stripedMatrix = stripMatrixRows(matrix, Piece.EMPTY);
            testMatrix = combinatoryMatrixOf(stripedMatrix);
        } else {
            testMatrix = combinatoryMatrixOf(matrix);
        }

        for (const row of testMatrix) {
            const locatedConfigurationsInRow = this.configurations.filter((configuration) => isSubArray(row, configuration.pieces));
            locatedConfigurations.push(...locatedConfigurationsInRow);
        }
        return locatedConfigurations;
    }


    getWinConfiguration(matrix: number[][]): BoardConfiguration {
        const nomalMatrix = this.getWinConfigurationOf(matrix);
        if (nomalMatrix) return nomalMatrix;

        const transpostedMatrix = this.getWinConfigurationOf(transposeMatrix(matrix));
        if (transpostedMatrix) return transpostedMatrix;

        const matrixDiagonals = this.getWinConfigurationOf(getAllMatrixDiagonals(matrix));
        if (matrixDiagonals) return matrixDiagonals;
    }

    getWinConfigurationOf(matrix: number[][]): BoardConfiguration {
        for (const row of matrix) {
            const winConfiguration = this.winConfiguration.find((winConfig) => {
                return isSubArray(row, winConfig.pieces);
            });
            if (winConfiguration) return winConfiguration;
        }
        return null;
    }


    isTerminalNode(board: Board): boolean {
        return board.checkConnectFour() || board.isFull();
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
        return this.maximazing(board, depth, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
    }

    maximazing(board: Board, depth: number, alpha: number, beta: number): ScorePosition {
        if (this.isTerminalNode(board)) {
            return {score: this.rateBoard(board, true), position: null};
        } else if (depth === 0) {
            return {score: this.rateBoard(board, false), position: null};
        }
        let pivotScore: ScorePosition = {score: Number.NEGATIVE_INFINITY, position: null};

        for (const moveIndex of this.possibleColumnsToMove(board)) {
            const boardCopy = cloneDeep(board);
            boardCopy.placeDisc(moveIndex, this.player);

            const minimax = this.minimizing(boardCopy, depth - 1, alpha, beta);
            pivotScore = this.chooseNewScore(pivotScore, {position: moveIndex, score: minimax.score}, Math.max);

            if (pivotScore.score >= beta) return pivotScore;

            alpha = Math.max(alpha, pivotScore.score);
        }
        return pivotScore;
    }

    minimizing(board: Board, depth: number, alpha: number, beta: number): ScorePosition {
        if (this.isTerminalNode(board)) {
            return {score: this.rateBoard(board, true), position: null};
        } else if (depth === 0) {
            return {score: this.rateBoard(board, false), position: null};
        }
        let pivotScore: ScorePosition = {score: Number.POSITIVE_INFINITY, position: null};

        for (const moveIndex of this.possibleColumnsToMove(board)) {
            const boardCopy = cloneDeep(board);
            boardCopy.placeDisc(moveIndex, this.opponent);

            const minimax = this.maximazing(boardCopy, depth - 1, alpha, beta);
            pivotScore = this.chooseNewScore(pivotScore, {position: moveIndex, score: minimax.score}, Math.min);

            if (pivotScore.score <= alpha) return pivotScore;

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
