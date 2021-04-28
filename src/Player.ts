import {Colors} from "./types.js";

class Player {
    name: string;
    color: Colors;

    constructor(name: string, color: Colors) {
        this.name = name;
        this.color = color;
    }
}

export default Player;
