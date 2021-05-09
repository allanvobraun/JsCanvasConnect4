class UpdateDrawEvent {
    name: string = 'update-draw';

    static fire(): void {
        window.dispatchEvent(new Event(this.name));
    }

    static listen(listener: (event?: Event) => any): void {
        window.addEventListener(UpdateDrawEvent.name, listener, false);
    }
}

export default UpdateDrawEvent;
