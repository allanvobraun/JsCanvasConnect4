import MicroModal from "micromodal";

export interface ModalOptions {
    title?: string;
    message?: string;
    onOk?: () => void;
    okButtonText?: string;
    closeButtonText?: string;
    delay?: number;
}

export class ModalFacade {
    static modalId: string = 'modal';

    static fire(options?: ModalOptions): void {
        MicroModal.init();

        ModalFacade.setTitle(options.title ?? '');
        ModalFacade.setContent(options.message ?? '');
        ModalFacade.setButtonsText(options.okButtonText, options.closeButtonText);
        ModalFacade.setOnOkHook(options.onOk);

        setTimeout(() => {
            MicroModal.show(this.modalId);
        }, options.delay ?? 0);
    }

    static close(): void {
        MicroModal.close(this.modalId);
    }

    protected static setContent(content: string): void {
        ModalFacade.setElement('.modal__content', content);
    }

    protected static setOnOkHook(hook: () => void): void {
        if (!hook) return;
        const modalReference = document.getElementById(this.modalId);
        const okButton = modalReference.querySelector('.modal__btn_ok');

        okButton.addEventListener('click', (e) => {
            e.preventDefault();
            hook();
        });
    }

    protected static setElement(elementClass: string, content: string): void {
        const modalReference = document.getElementById(this.modalId);
        const modalContent = modalReference.querySelector(elementClass);
        modalContent.innerHTML = content;
    }

    protected static setTitle(title: string): void {
        ModalFacade.setElement('.modal__title', title);
    }

    protected static setButtonsText(okButtonText: string, closeButtonText: string): void {
        ModalFacade.setElement('.modal__btn_ok', okButtonText);
        ModalFacade.setElement('.modal__btn_close', closeButtonText);
    }
}
