import Disc from "@/game/Disc";

export interface Coordinates {
    x: number;
    y: number;
}

export interface Drawable {
    color: Colors;
    position: Coordinates;

    draw(): void;

    changeColor?(color: Colors): void;
}

export enum Colors {
    RED = '#660000',
    BLUE = '#020079',
    BACKGROUD = '#e3e3e3',
    BOARD = '#003466',
    BLACK = '#000',
    SHREK = '#668300'
}

export interface MatrixCoordinates {
    i: number;
    j: number;
}

export interface BoardConfiguration {
    discs: Disc[];
    points: number;
}

export enum Piece {
    EMPTY = 0,
    P1 = 1,
    P2 = 2
}
