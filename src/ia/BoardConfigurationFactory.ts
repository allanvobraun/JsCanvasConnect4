import {BoardConfiguration} from "@/types";
import DiscFactory from "@/util/DiscFactory";
import Player from "@/game/Player";


class BoardConfigurationFactory {

    // static buildWinConfigurations(ia: Player, opponent: Player): BoardConfiguration[] {
    //     const iaDisc = DiscFactory.createDirty(ia.color);
    //     const opponentDisc = DiscFactory.createDirty(ia.color);
    //     return [
    //         {
    //             discs: [iaDisc, iaDisc, iaDisc, iaDisc],
    //             points: Number.POSITIVE_INFINITY,
    //         },
    //         {
    //             discs: [opponentDisc, opponentDisc, opponentDisc, opponentDisc],
    //             points: Number.NEGATIVE_INFINITY,
    //         },
    //     ];
    // }
    //
    // static buildNormalConfigurations(ia: Player, opponent: Player): BoardConfiguration[] {
    //     const emptyDisc = DiscFactory.createDefaut();
    //     const iaDisc = DiscFactory.createDirty(ia.color);
    //     const opponentDisc = DiscFactory.createDirty(ia.color);
    //
    //     return [
    //
    //         {
    //             discs: [iaDisc, iaDisc, iaDisc, emptyDisc],
    //             points: 4
    //         },
    //         {
    //             discs: [emptyDisc, iaDisc, iaDisc, iaDisc],
    //             points: 4
    //         },
    //         {
    //             discs: [emptyDisc, iaDisc, iaDisc, emptyDisc, emptyDisc],
    //             points: 3
    //         },
    //         {
    //             discs: [iaDisc, iaDisc, emptyDisc],
    //             points: 2
    //         },
    //         {
    //             discs: [emptyDisc, iaDisc, iaDisc],
    //             points: 2
    //         },
    //         {
    //             discs: [emptyDisc, emptyDisc, iaDisc, emptyDisc, emptyDisc],
    //             points: 1
    //         },
    //         {
    //             discs: [emptyDisc, opponentDisc, opponentDisc, emptyDisc],
    //             points: -1
    //         },
    //         {
    //             discs: [opponentDisc, opponentDisc, opponentDisc, emptyDisc],
    //             points: -4
    //         },
    //         {
    //             discs: [emptyDisc, opponentDisc, opponentDisc, opponentDisc],
    //             points: -4
    //         },
    //         {
    //             discs: [opponentDisc],
    //             points: 0
    //         },
    //         {
    //             discs: [iaDisc],
    //             points: 0
    //         },
    //     ];
    //
    // }

}

export default BoardConfigurationFactory;
