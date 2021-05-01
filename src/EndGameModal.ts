import MicroModal from 'micromodal';
import {Colors} from "./types";

interface EndGameModalOptions {
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

    constructor(options: EndGameModalOptions) {
        this.modalId = options.modalId ?? this.modalId;
        this.title = options.title ?? this.title;
        this.message = options.message ?? this.message;
        this.okButtonText = options.okButtonText ?? this.okButtonText;
        this.closeButtonText = options.closeButtonText ?? this.closeButtonText;

        this.modalReference = document.getElementById(this.modalId);
        this.setTitle(this.title);
        this.setOnOkHook(options.onOk);

        MicroModal.init();
    }

    setContent(content: string): EndGameModal {
        return this.setElement('.modal__content', content);
    }

    setTitle(title: string): EndGameModal {
        return this.setElement('.modal__title', title);
    }

    setButtonsText(): EndGameModal {
        return this.setElement('.modal__btn_ok', this.okButtonText)
            .setElement('.modal__btn_close', this.closeButtonText);
    }

    setOnOkHook(hook: (endGameModal?: EndGameModal) => void): EndGameModal {
        if (!hook) return this;
        const okButton = this.modalReference.querySelector('.modal__btn_ok');

        okButton.addEventListener('click', (e) => {
            e.preventDefault();
            hook(this);
        });
        return this;
    }

    show(winnerColor: Colors): void {
        this.buildContent(winnerColor);
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

    private buildContent(color: Colors): EndGameModal {
        this.setButtonsText();
        const content = `
            ${this.message}&nbsp&nbsp
            <span class="color-displayer" style="background-color: ${color}"></span>
        `;
        return this.setContent(content);
    }
}

export default EndGameModal;
