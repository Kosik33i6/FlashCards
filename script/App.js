import {ToogleEditor} from './ToogleEditor.js';
import {AddCard} from './AddCard.js';
import {DeleteCards} from './DeleteCards.js';
import {CardChanger} from './CardChanger.js';
import {Toolbar} from './Toolbar.js';
import {ValueSetter} from './ValueSetter.js';
export class App {  
    constructor({ btnToggleEditor, shiftingElInBtn, btnAddCard, btnDeleteCards, btnPreviousCard, btnNextCard, editor, cardsContainer, cardsCounter, editorCardFrontSide, editorCardBackSide, toolbarButtons, inputTextColor, inputBgColor, selectFontSize}) {
        this.btnToggleEditor = new ToogleEditor(btnToggleEditor, shiftingElInBtn);

        this.btnAddCard = new AddCard(btnAddCard, this.currentCardNum);
        this.btnDeleteCards = new DeleteCards(btnDeleteCards);

        this.btnPreviousCard = new CardChanger(btnPreviousCard);
        this.btnNextCard = new CardChanger(btnNextCard);

        this.toolbarButtons = new Toolbar(toolbarButtons);

        this.inputTextColor = new ValueSetter(inputTextColor);
        this.inputBgColor = new ValueSetter(inputBgColor);

        this.selectFontSize = new ValueSetter(selectFontSize);

        this.editor = editor;
        this.cardsContainer = cardsContainer;
        this.cardsCounter = cardsCounter;
        this.editorCardFrontSide = editorCardFrontSide;
        this.editorCardBackSide = editorCardBackSide;

        this.cardsData = this.getCardsData();
        this.totalCardsNum = 0;
        this.currentCardNum = 0;
        this.activeEditor = this.editorCardFrontSide;
        this.bgColor = '#FFFFFF';
        this.textColor = '#000000';
    }
    init() {
        this.createCards(this.cardsData);

        this.btnToggleEditor.btnToggle.addEventListener('click', () => this.btnToggleEditor.toggleEditor(this.editor, this.activeEditor));
        
        this.btnDeleteCards.btnDelete.addEventListener('click', this.btnDeleteCards.deleteCards.bind(this));

        this.btnPreviousCard.btnChangeCard.addEventListener('click', this.btnPreviousCard.previousCard.bind(this));
        this.btnNextCard.btnChangeCard.addEventListener('click', this.btnNextCard.nextCard.bind(this));

        this.editor.addEventListener('click', this.setFocusOnEditor.bind(this));

        this.btnAddCard.button.addEventListener('click', this.btnAddCard.addCard.bind(this));

        this.toolbarButtons.toolbarBtns.forEach(button => {
            button.addEventListener('click', (element) => this.toolbarButtons.formatText(element.target));
        });
        this.inputTextColor.setterValueItem.addEventListener('change', this.inputTextColor.setValue.bind(this));
        this.inputBgColor.setterValueItem.addEventListener('change', this.inputBgColor.setBgColor.bind(this));

        this.selectFontSize.setterValueItem.addEventListener('click', this.selectFontSize.setValue.bind(this));
    }

    // * Get Cards Data from localstorage
    getCardsData() {
        const data = JSON.parse(localStorage.getItem('cardsData'));
        if(data === null) return [];
        else return data; 
    }

    //  * Set Cards Data
    setCardsData(cardsData) {
        localStorage.setItem('cardsData', JSON.stringify(cardsData));
        window.location.reload();
    }

    // * Create Cards
    createCards(cardsData) {
        if(cardsData.length === 0) {
            return;
        } else {
            cardsData.forEach((data, index) => this.createCard(data, index));
        }
    }

    //  * Create Card
    createCard({cardFrontSide, cardBackSide, bgColor}, index) {
        const cardSideFront = document.createElement('div');
        const cardSideBack = document.createElement('div');
        const cardInner = document.createElement('div');
        const card = document.createElement('div');
    
        cardSideFront.classList.add('card__side', 'card__side--front');
        cardSideBack.classList.add('card__side', 'card__side--back');
        cardInner.classList.add('card__inner');
    
        if(index === 0) {
            card.classList.add('card', 'card--current');
        } else {
            card.classList.add('card', 'card--next');
        }
        
        cardSideFront.innerHTML = cardFrontSide;
        cardSideBack.innerHTML = cardBackSide;
    
        cardSideFront.style.backgroundColor = bgColor;
        cardSideBack.style.backgroundColor = bgColor;
    
        cardInner.appendChild(cardSideFront);
        cardInner.appendChild(cardSideBack);
        card.appendChild(cardInner);
        this.cardsContainer.appendChild(card);
        
        card.addEventListener('click', () => this.flipElement(card));
    
        this.totalCardsNum = this.cardsData.length;
        if(this.cardsData.length > 0) {
            this.cardsCounter.textContent = `${this.currentCardNum + 1} | ${this.totalCardsNum}`;
        }
    }

    // *Flip Card
    flipElement(card) {
        const cardChild = [...card.childNodes].shift();
    
        if(card.classList.contains('card--current')) {
            cardChild.classList.toggle('card__inner--flipped');
        } else {
            return;
        }
    }
    // * Set focus on clicked editor
    setFocusOnEditor(event) {
        const clickedElement = event.target;

        if(clickedElement === this.selectFontSize.setterValueItem || clickedElement === this.inputTextColor.setterValueItem) {
            return;
        } else if(clickedElement === this.editorCardFrontSide) {
            this.activeEditor = this.editorCardFrontSide;
            this.activeEditor.focus();
        } else if (clickedElement === this.editorCardBackSide) {
            this.activeEditor = this.editorCardBackSide;
            this.activeEditor.focus();
        } else  if (clickedElement !== this.editorCardFrontSide && clickedElement !== this.editorCardBackSide) {
            this.activeEditor.focus()
        }
    }
}