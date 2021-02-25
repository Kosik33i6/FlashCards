export class ValueSetter {
    constructor(setterValueItem) {
        this.setterValueItem = setterValueItem;
    }
    setValue(event) {
        const value = event.target.value;
        const command = event.target.dataset['command'];
        document.execCommand(command, false, value);
    }
    setBgColor(event) {
        const value = event.target.value;
        this.bgColor = value;
        this.editorCardFrontSide.style.backgroundColor = this.bgColor;
        this.editorCardBackSide.style.backgroundColor = this.bgColor;
    }
}