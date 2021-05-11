import {Colors, Piece} from "@/types";

class Player {
    name: string;
    color: Colors;
    pieceValue: Piece;

    constructor(name: string, color: Colors, pieceValue: Piece) {
        this.name = name;
        this.color = color;
        this.pieceValue = pieceValue;
    }
}

export default Player;
