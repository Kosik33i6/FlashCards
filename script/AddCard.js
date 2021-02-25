export class AddCard {
    constructor(button) {
        this.button = button;
    }
    addCard() {
        const newCardData = {
            cardFrontSide: this.editorCardFrontSide.innerHTML,
            cardBackSide: this.editorCardBackSide.innerHTML,
            bgColor: this.bgColor,
        };
        const btnToggleBox = this.btnToggleEditor.btnToggle.parentNode;       
        console.log(btnToggleBox.classList);        
        if(newCardData.cardFrontSide === "" || newCardData.cardBackSide === "") {
            alert('The content on the card is empty');
            return;
        };
        this.createCard(newCardData);
    
        this.editor.classList.remove('section-editor--visible');
        this.btnToggleEditor.btnToggle.classList.remove('btn-toggle-editor--active');
        btnToggleBox.classList.remove('section-cards__btn-toggle-editor-box--active');
        console.log(btnToggleBox);

        this.editorCardFrontSide.innerHTML = "";
        this.editorCardBackSide.innerHTML = "";
    
        this.btnToggleEditor.itemToChange.textContent = 'New Card';
    
        this.cardsData.push(newCardData);
        setTimeout(() => this.setCardsData(this.cardsData), 600);
    }
}