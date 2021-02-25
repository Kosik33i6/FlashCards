export class ToogleEditor {
    constructor(btnToggle, itemToChange) {
        this.btnToggle = btnToggle;
        this.itemToChange = itemToChange;
    }
    toggleEditor(editor, activeEditor) {
        this.btnToggle.classList.toggle('btn-toggle-editor--active');
        editor.classList.toggle('section-editor--visible');
        activeEditor.focus();
        if(this.btnToggle.classList.contains('btn-toggle-editor--active')) {
            this.itemToChange.textContent = 'Close';
        } else {
            this.itemToChange.textContent = 'New Card';
        }
    }
}