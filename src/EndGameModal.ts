import MicroModal from 'micromodal';
import {Colors} from "./types";

interface EndGameModalOptions {
    winnerColor: Colors;
    modalId?: string;
    title?: string;
    message?: string;
    onShow?: (modal?: HTMLElement) => void;
    onClose?: (modal?: HTMLElement) => void;
    onOk?: (endGameModal?: EndGameModal) => void;
    okButtonText?: string;
    closeButtonText?: string;
}

export class EndGameModal {
    modalId: string = 'end-game-modal';
    title: string = 'Fim de jogo';
    message: string = 'Vencedor: ';
    okButtonText: string = 'Novo Jogo';
    closeButtonText: string = 'Fechar';
    modalReference: HTMLElement;
    winnerColor: Colors;

    constructor(options: EndGameModalOptions) {
        this.winnerColor = options.winnerColor;
        this.modalId = options.modalId ?? this.modalId;
        this.title = options.title ?? this.title;
        this.message = options.message ?? this.message;
        this.okButtonText = options.okButtonText ?? this.okButtonText;
        this.closeButtonText = options.closeButtonText ?? this.closeButtonText;

        this.modalReference = document.getElementById(this.modalId);
        this.setTitle(this.title);
        this.setOnOkHook(options.onOk);
        this.buildContent();
        MicroModal.init({onShow: options.onShow, onClose: options.onClose});
    }

    setContent(content: string): EndGameModal {
        return this.setElement('.modal__content', content);
    }

    setTitle(title: string): EndGameModal {
        return this.setElement('.modal__title', title);
    }

    setOnOkHook(hook: (endGameModal?: EndGameModal) => void): EndGameModal {
        if (!hook) return this;
        const okButton = this.modalReference.querySelector('.modal__btn_ok');
        okButton.addEventListener('click', (e) => hook(this), false);
        return this;
    }

    show(): void {
        MicroModal.show(this.modalId);
    }

    close(): void {
        MicroModal.close(this.modalId);
    }

    private setElement(elementClass: string, content: string): EndGameModal {
        const modalContent = this.modalReference.querySelector(elementClass);
        modalContent.innerHTML = content;
        return this;
    }

    private buildContent(): EndGameModal {
        const content = `
            ${this.message}&nbsp&nbsp
            <span class="color-displayer" style="background-color: ${this.winnerColor}"></span>
        `;
        return this.setContent(content);
    }
}

export default EndGameModal;
