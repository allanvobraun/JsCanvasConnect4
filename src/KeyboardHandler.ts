import GameController from "./GameController";
import {canvas} from "./canvasContext";

class KeyboardHandler {
    controller: GameController;
    keyDownActionMap: Record<string, () => void>;
    keyPressActionMap: Record<string, () => void>;

    constructor(controller: GameController) {
        this.controller = controller;

        this.keyDownActionMap = {
            'ArrowRight': () => this.controller.moveRight(),
            'ArrowLeft': () => this.controller.moveLeft(),
        };

        this.keyPressActionMap = {
            ' ': () => this.controller.playerMove(),
        };
    }

    enableListeners(): void {
        canvas.addEventListener('keydown', (event) => {
            event.stopPropagation();
            event.preventDefault();
            const action = this.keyDownActionMap[event.key];
            action?.();
        });
        canvas.addEventListener('keydown', (event) => {
            event.stopPropagation();
            event.preventDefault();
            if (event.repeat) return;

            const action = this.keyPressActionMap[event.key];
            action?.();
        });
    }
}

export default KeyboardHandler;
