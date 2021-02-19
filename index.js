const btnPreviousCard = document.querySelector('.btn-move-card--previous')
const btnNextCard = document.querySelector('.btn-move-card--next')

const btnToggleEditor = document.querySelector('.btn-toggle-editor');
const btnToggleEditorText = document.querySelector('.btn-toggle-editor__text');

const toolbarButtons = document.querySelectorAll('.toolbar__btn');
const inputTextColor = document.querySelector('.toolbar__input--text-color');
const inputBgColor = document.querySelector('.toolbar__input--bg-color');

const btnCreateCard = document.querySelector('.btn-create-card');
 

const cardsCounter = document.querySelector('.counter');
const editor = document.querySelector('.section-editor');

const editors = {
    cardFrontSide: document.querySelector('.editor--card-front-side'),
    cardBackSide: document.querySelector('.editor--card-back-side'),
};

const cards = [];
let totalCardsNum = 0;
let currentCardNum = 0;
let activeEditor = editors.cardFrontSide;
let bgColor = '#f8f8f8';

// * Open editor
function toggleEditor() {
    btnToggleEditor.classList.toggle('btn-toggle-editor--active');
    editor.classList.toggle('section-editor--visible');
    activeEditor.focus();
    if(btnToggleEditor.classList.contains('btn-toggle-editor--active')) {
        btnToggleEditorText.textContent = 'Close';
    } else {
        btnToggleEditorText.textContent = 'New Card';
    }
}
btnToggleEditor.addEventListener('click', toggleEditor);


// * Set Foucs on editor
function setFocusOnEditor(event) {
    const clickedElement = event.target;
    if(clickedElement === editors.cardFrontSide) {
        activeEditor = editors.cardFrontSide;
        activeEditor.focus();
    } else if (clickedElement === editors.cardBackSide) {
        activeEditor = editors.cardBackSide;
        activeEditor.focus();
    } else  if (clickedElement !== editors.cardFrontSide && clickedElement !== editors.cardBackSide) {
        activeEditor.focus()
    }
}

editor.addEventListener('click', setFocusOnEditor);

// * Set button active
function setToolbarBtnActive(btn) {
    const parentEl = btn.parentElement;
    const command = btn.dataset['command'];
    
    if(command === 'bold' || command === 'italic' || command === 'underline' || command === 'strikethrough' || command === 'insertUnorderedList' || command === 'insertOrderedList') {
        parentEl.classList.toggle('toolbar__btn--active');
    }
}

// * Format Text
function formatText(element) {
    const command = element.dataset['command'];
    console.log(command);
    if(command === 'createLink' || command === 'insertImage') {
        let url = prompt('Enter the link here:');
        document.execCommand(command, false, url);
    } else {
        document.execCommand(command, false, null);
    }
    setToolbarBtnActive(element);
}

toolbarButtons.forEach(button => {
    button.addEventListener('click', (element) => formatText(element.target));
});

function setTextColor(event) {
    const value = event.target.value;
    const command = event.target.dataset['command'];
    console.log(command, value);
    document.execCommand(command, false, value);
}

inputTextColor.addEventListener('change', setTextColor);

function setBgColor(event) {
    const value = event.target.value;
    bgColor = value;
    console.log('bg: ', bgColor);
}

inputBgColor.addEventListener('change', setBgColor);


// * Create Card
function createCard({cardFrontSide, cardBackSide}) {
    const cardsContainer = document.querySelector('.section-cards__cards-box');

    const cardSideFront = document.createElement('div');
    const cardSideBack = document.createElement('div');
    const cardInner = document.createElement('div');
    const card = document.createElement('div');

    cardSideFront.classList.add('card__side', 'card__side--front');
    cardSideBack.classList.add('card__side', 'card__side--back');
    cardInner.classList.add('card__inner');

    if(cards.length === 0) {
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
    cardsContainer.appendChild(card);

    cards.push(card);

    card.addEventListener('click', () => flipElement(card));

    totalCardsNum = cards.length;
    cardsCounter.textContent = `${currentCardNum + 1} | ${totalCardsNum}`;
}

// * Add card
function addCard() {

    const editorsContent = {
        cardFrontSide: editors.cardFrontSide.innerHTML,
        cardBackSide: editors.cardBackSide.innerHTML,
    };
    
    if(editorsContent.cardFrontSide === "" || editorsContent.cardBackSide === "") {
        alert('The content on the card is empty');
        return;
    };

    createCard(editorsContent);

    editor.classList.remove('section-editor--visible');
    btnToggleEditor.classList.remove('btn-toggle-editor--active');

    editors.cardFrontSide.innerHTML = "";
    editors.cardBackSide.innerHTML = "";

    btnToggleEditorText.textContent = 'New Card';

}
btnCreateCard.addEventListener('click', addCard);

// * Previous Card
function previousCard() {
    const previousCards = [...document.querySelectorAll('.card--previous')];
    const currentCard = document.querySelector('.card--current');
    
    if(previousCards.length > 0) {
        const previousCard = previousCards.pop()
        currentCard.classList.remove('card--current');
        currentCard.classList.add('card--next');
        previousCard.classList.remove('card--previous');
        previousCard.classList.add('card--current');
        currentCardNum--;
        console.log('minus');
        cardsCounter.textContent = `${currentCardNum + 1} | ${totalCardsNum}`;
    }
}
//  * Next Card
function nextCard() {
    const nextCards = [...document.querySelectorAll('.card--next')];
    const currentCard = document.querySelector('.card--current');

    if(nextCards.length > 0) {
        const nextCard =  nextCards.shift();
        currentCard.classList.remove('card--current');
        currentCard.classList.add('card--previous');
        nextCard.classList.remove('card--next');
        nextCard.classList.add('card--current');
        currentCardNum++;
        console.log('plus');
        cardsCounter.textContent = `${currentCardNum + 1} | ${totalCardsNum}`;
    }
}

btnPreviousCard.addEventListener('click', previousCard);
btnNextCard.addEventListener('click', nextCard);

//  * Move card 
function navigateWithButtons(event) {
    let key = event.which;
    
    switch(key) {
        case 39:
            nextCard();
            break;
        case 37:
            previousCard();
            break;
        case 27:
            toggleEditor()
            break;
    }
}

window.addEventListener('keydown', navigateWithButtons);

// * Flip card
function flipElement(card) {
    const cardChild = [...card.childNodes].shift();

    if(card.classList.contains('card--current')) {
        cardChild.classList.toggle('card__inner--flipped');
    } else {
        return;
    }
}