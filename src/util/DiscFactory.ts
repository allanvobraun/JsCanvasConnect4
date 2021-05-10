import Disc from "@/game/Disc";
import {Colors} from "@/types";

class DiscFactory {
    static createDefaut(): Disc {
        return new Disc({x: 0, y: 0}, 0, Colors.BACKGROUD);
    }

    static createDirty(color: Colors): Disc {
        const disc = new Disc({x: 0, y: 0}, 0, color);
        disc.isDirty = true;
        return disc;
    }
}

export default DiscFactory;
