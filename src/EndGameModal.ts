import MicroModal from 'micromodal';
import {Colors} from "./types";



class EndGameModal {
    modalId: string = 'end-game-modal';
    title: string = 'Fim de jogo';
    message: string = 'Vencedor: ';
    modalReference: HTMLElement;
    winnerColor: Colors;

    constructor(winnerColor: Colors, modalId?: string) {
        this.winnerColor = winnerColor;
        this.modalId = modalId ?? this.modalId;
        MicroModal.init();
        this.modalReference = document.getElementById(this.modalId);
        this.setTitle(this.title);
        this.buildContent();
    }

    setContent(content: string): EndGameModal {
        const modalContent = this.modalReference.querySelector('.modal__content');
        modalContent.innerHTML = content;
        return this;
    }

    setTitle(title: string): EndGameModal {
        const modalTitle = this.modalReference.querySelector('.modal__title');
        modalTitle.innerHTML = title;
        return this;
    }

    show(): void {
        MicroModal.show(this.modalId);
    }

    close(): void {
        MicroModal.close(this.modalId);
    }

    private buildContent(): EndGameModal {
        const content = `
            ${this.message}
            <span class="color-displayer" style="background-color: ${this.winnerColor}"></span>
        `;
        return this.setContent(content);
    }
}

export default EndGameModal;
