import GameController from "./GameController";

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
            'Enter': () => this.controller.playerMove(),
        };

        window.addEventListener('keydown', (event: KeyboardEvent) => {
            const action = this.keyDownActionMap[event.key];
            action?.();
        });

        window.addEventListener('keydown', (event: KeyboardEvent) => {
            if (event.repeat) {
                return;
            }
            const action = this.keyPressActionMap[event.key];
            action?.();
        });
    }
}

export default KeyboardHandler;
