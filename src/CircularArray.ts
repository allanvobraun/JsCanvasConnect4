class CircularArray<T> {
    private array: T[];

    constructor(array: T[]) {
        this.array = array;
    }

    get(index: number): T {
        return this.array[(index % this.array.length + this.array.length) % this.array.length];
    }
}

export default CircularArray;
