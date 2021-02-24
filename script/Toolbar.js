export class Toolbar {
    constructor(toolbarBtns) {
        this.toolbarBtns = toolbarBtns;
    }
    formatText(element) {
        const command = element.dataset['command'];
        console.log(command);
        if(command === 'createLink' || command === 'insertImage') {
            let url = prompt('Enter the link here:');
            document.execCommand(command, false, url);
        } else {
            document.execCommand(command, false, null);
        }
    }
}