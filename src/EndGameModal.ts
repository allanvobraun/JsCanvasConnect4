import {Colors} from "./types";
import {Modal, BaseModalOptions} from "./Modal";


export class EndGameModal extends Modal {

    showEndgame(winnerColor: Colors): void {
        this.buildContent(winnerColor);
        super.show();
    }

    protected init(options: BaseModalOptions): void {
        super.init(options);

        this.modalId = 'end-game-modal';
        this.title = 'Fim de jogo';
        this.message = 'Vencedor: ';
        this.okButtonText = 'Novo Jogo';
        this.closeButtonText = 'Fechar';
        this.setOnOkHook(options.onOk);
        this.setTitle(this.title);
    }

    private buildContent(color: Colors): this {
        this.setButtonsText();
        const content = `
            ${this.message}&nbsp&nbsp
            <span class="color-displayer" style="background-color: ${color}"></span>
        `;

        return this.setContent(content);
    }
}

export default EndGameModal;
