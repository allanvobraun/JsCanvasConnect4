import GameController from "./GameController";

class KeyboardHandler {
    controller: GameController;
    keyActionMap: Record<string, () => void>;

    constructor(controller: GameController) {
        this.controller = controller;

        this.keyActionMap = {
            'ArrowRight': () => this.controller.moveRight(),
            'ArrowLeft': () => this.controller.moveLeft(),
        };

        window.addEventListener('keydown', (event: KeyboardEvent) => {
            this.keyActionMap[event.key]();
        });
    }
}

export default KeyboardHandler;
