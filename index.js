import {App} from './script/App.js';

const flashCards = new App({
    btnToggleEditor: document.querySelector('.btn-toggle-editor'),
    shiftingElInBtn: document.querySelector('.btn-toggle-editor__text'),
    btnAddCard: document.querySelector('.btn-create-card'),
    btnDeleteCards: document.querySelector('.btn-remove-cards'),
    btnPreviousCard: document.querySelector('.btn-move-card--previous'),
    btnNextCard: document.querySelector('.btn-move-card--next'),
    editor: document.querySelector('.section-editor'),
    cardsContainer: document.querySelector('.section-cards__cards-box'),
    cardsCounter: document.querySelector('.counter'),
    editorCardFrontSide: document.querySelector('.editor--card-front-side'),
    editorCardBackSide: document.querySelector('.editor--card-back-side'),
    toolbarButtons: document.querySelectorAll('.toolbar__btn'),
    inputTextColor: document.querySelector('.toolbar__input--text-color'),
    inputBgColor: document.querySelector('.toolbar__input--bg-color'),
});
flashCards.init();