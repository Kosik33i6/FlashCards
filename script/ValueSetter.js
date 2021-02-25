export class ValueSetter {
    constructor(setterValueItem) {
        this.setterValueItem = setterValueItem;
    }
    // * Set text color
    setValue(event) {
        const value = event.target.value;
        const command = event.target.dataset['command'];
        document.execCommand(command, false, value);
    }
    // * set bg card color
    setBgColor(event) {
        const value = event.target.value;
        this.bgColor = value;
        this.editorCardFrontSide.style.backgroundColor = this.bgColor;
        this.editorCardBackSide.style.backgroundColor = this.bgColor;
    }
}