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
