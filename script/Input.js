export class Input {
    constructor(input) {
        this.input = input;
    }
    // * Set text color
    setTextColor(event) {
        const value = event.target.value;
        const command = event.target.dataset['command'];
        console.log(command, value);
        document.execCommand(command, false, value);
    }
    // * set bg card color
    setBgColor(event) {
        const value = event.target.value;
        this.bgColor = value;
        console.log('bgColor: ', this.bgColor);
        this.editorCardFrontSide.style.backgroundColor = this.bgColor;
        this.editorCardBackSide.style.backgroundColor = this.bgColor;
    }
}