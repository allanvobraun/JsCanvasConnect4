import {Colors} from "@/types";
import Disc from "@/game/Disc";

class Player {
    name: string;
    color: Colors;

    constructor(name: string, color: Colors) {
        this.name = name;
        this.color = color;
    }

    isPlayerDisc(disc: Disc): boolean {
        return disc.color === this.color;
    }
}

export default Player;
