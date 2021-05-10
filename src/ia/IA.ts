import Player from "@/game/Player";
import Disc from "@/game/Disc";
import DiscFactory from "@/util/DiscFactory";
import Board from "@/game/Board";
import {isDiscSubArray, transposeMatrix} from "@/util/helpers";
import Game from "@/game/Game";
import cloneDeep from "lodash.clonedeep";

interface BoardConfiguration {
    discs: Disc[];
    points: number;
}

interface ScorePosition {
    score: number;
    position: number;
}

class IA {
    player: Player;
    opponent: Player;
    configurations: BoardConfiguration[];
    game: Game;

    constructor(player: Player, enemy: Player, game: Game) {
        this.player = player;
        this.opponent = enemy;
        this.game = game;

        this.configurations = this.buildBoardConfigurations();
    }

    buildBoardConfigurations(): BoardConfiguration[] {
        const emptyDisc = DiscFactory.createDefaut();
        const iaDisc = DiscFactory.createDirty(this.player.color);
        const opponentDisc = DiscFactory.createDirty(this.opponent.color);
        return [
            {
                discs: [iaDisc, iaDisc, iaDisc, iaDisc],
                points: Number.POSITIVE_INFINITY
            },
            {
                discs: [iaDisc, iaDisc, iaDisc, emptyDisc],
                points: 4
            },
            {
                discs: [emptyDisc, iaDisc, iaDisc, iaDisc],
                points: 4
            },
            {
                discs: [emptyDisc, iaDisc, iaDisc, emptyDisc, emptyDisc],
                points: 3
            },
            {
                discs: [iaDisc, iaDisc, emptyDisc],
                points: 2
            },
            {
                discs: [emptyDisc, iaDisc, iaDisc],
                points: 2
            },
            {
                discs: [emptyDisc, emptyDisc, iaDisc, emptyDisc, emptyDisc],
                points: 1
            },
            {
                discs: [emptyDisc, opponentDisc, opponentDisc, emptyDisc],
                points: -1
            },
            {
                discs: [opponentDisc, opponentDisc, opponentDisc, emptyDisc],
                points: -4
            },
            {
                discs: [emptyDisc, opponentDisc, opponentDisc, opponentDisc],
                points: -4
            },
            {
                discs: [opponentDisc, opponentDisc, opponentDisc, opponentDisc],
                points: Number.NEGATIVE_INFINITY
            },
            {
                discs: [opponentDisc],
                points: 10
            },
            {
                discs: [iaDisc],
                points: 10
            },
        ];
    }


    rateBoard(board: Board): number {
        const locatedConfigurations: BoardConfiguration[] = [];
        const matrix_tanspose = transposeMatrix(board.matrix);
        for (const row of board.matrix) {
            const locatedConfigurationsInRow = this.configurations.filter((configuration) => isDiscSubArray(row, configuration.discs));
            locatedConfigurations.push(...locatedConfigurationsInRow);
        }

        for (const column of matrix_tanspose) {
            const locatedConfigurationsInColumn = this.configurations.filter((configuration) => isDiscSubArray(column, configuration.discs));
            locatedConfigurations.push(...locatedConfigurationsInColumn);
        }

        return locatedConfigurations.reduce((acc, config) => config.points + acc, 0);
    }

    isTerminalNode(board: Board): boolean {
        return board.isFull();
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

    showBestPlay(depht: number = 1): void {
        console.log(this.minimax(this.game.board, depht, 0, true));
    }

    minimax(board: Board, depth: number, position: number, maximizingPlayer: boolean): ScorePosition {
        if (depth === 0 || this.isTerminalNode(board)) {
            return {score: this.rateBoard(board), position};
        }
        if (maximizingPlayer) {
            let pivotScore: ScorePosition = {score: Number.NEGATIVE_INFINITY, position};
            for (const moveIndex of this.possibleColumnsToMove(board)) {
                const boardCopy = cloneDeep(board);
                boardCopy.placeDisc(moveIndex, this.player.color);
                const minimax = this.minimax(boardCopy, depth - 1, moveIndex, false);
                pivotScore = this.chooseNewScore(pivotScore, minimax, Math.max);
            }
            return pivotScore;
        } else {
            let pivotScore: ScorePosition = {score: Number.POSITIVE_INFINITY, position};

            for (const moveIndex of this.possibleColumnsToMove(board)) {
                const boardCopy = cloneDeep(board);
                boardCopy.placeDisc(moveIndex, this.player.color);
                const minimax = this.minimax(boardCopy, depth - 1, moveIndex, true);
                pivotScore = this.chooseNewScore(pivotScore, minimax, Math.min);
            }
            return pivotScore;
        }
    }

    chooseNewScore(old: ScorePosition, actual: ScorePosition, criterion: (a: number, b: number) => number): ScorePosition {
        const value = criterion(old.score, actual.score);
        if (value === old.score) {
            return old;
        }
        return actual;
    }
}

export default IA;
