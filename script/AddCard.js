export class AddCard {
    constructor(button) {
        this.button = button;
    }
    // *Add card
    addCard() {
        const newCardData = {
            cardFrontSide: this.editorCardFrontSide.innerHTML,
            cardBackSide: this.editorCardBackSide.innerHTML,
            bgColor: this.bgColor,
        };               
        if(newCardData.cardFrontSide === "" || newCardData.cardBackSide === "") {
            alert('The content on the card is empty');
            return;
        };
        this.createCard(newCardData);
    
        this.editor.classList.remove('section-editor--visible');
        this.btnToggleEditor.btnToggle.classList.remove('btn-toggle-editor--active');
    
        this.editorCardFrontSide.innerHTML = "";
        this.editorCardBackSide.innerHTML = "";
    
        this.btnToggleEditor.itemToChange.textContent = 'New Card';
    
        this.cardsData.push(newCardData);
        this.setCardsData(this.cardsData);
    }
}