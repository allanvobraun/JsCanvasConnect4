import {BoardConfiguration, Piece} from "@/types";
import Player from "@/game/Player";


class BoardConfigurationFactory {

    static buildWinConfigurations(ia: Player, opponent: Player): BoardConfiguration[] {
        const iaPiece = ia.pieceValue;
        const opponentPiece = opponent.pieceValue;
        return [
            {
                pieces: [iaPiece, iaPiece, iaPiece, iaPiece],
                points: Number.POSITIVE_INFINITY,
            },
            {
                pieces: [opponentPiece, opponentPiece, opponentPiece, opponentPiece],
                points: Number.NEGATIVE_INFINITY,
            },
        ];
    }

    static buildNormalConfigurations(ia: Player, opponent: Player): BoardConfiguration[] {
        const emptyPiece = Piece.EMPTY;
        const iaPiece = ia.pieceValue;
        const opponentPiece = opponent.pieceValue;

        return [
            {
                pieces: [iaPiece, iaPiece, iaPiece, emptyPiece],
                points: 4
            },
            {
                pieces: [emptyPiece, iaPiece, iaPiece, iaPiece],
                points: 4
            },
            {
                pieces: [emptyPiece, iaPiece, iaPiece, emptyPiece, emptyPiece],
                points: 3
            },
            // {
            //     pieces: [iaPiece, iaPiece, emptyPiece],
            //     points: 2
            // },
            // {
            //     pieces: [emptyPiece, iaPiece, iaPiece],
            //     points: 2
            // },
            // {
            //     pieces: [emptyPiece, emptyPiece, iaPiece, emptyPiece, emptyPiece],
            //     points: 1
            // },
            {
                pieces: [emptyPiece, emptyPiece, opponentPiece, opponentPiece, emptyPiece, emptyPiece],
                points: -1
            },
            {
                pieces: [opponentPiece, opponentPiece, opponentPiece, emptyPiece],
                points: -10
            },
            {
                pieces: [emptyPiece, opponentPiece, opponentPiece, opponentPiece],
                points: -10
            },
        ];

    }

}

export default BoardConfigurationFactory;
