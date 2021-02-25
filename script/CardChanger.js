export class CardChanger {
    constructor(btnChangeCard) {
        this.btnChangeCard = btnChangeCard;
    }
    previousCard() {
        const previousCards = [...document.querySelectorAll('.card--previous')];
        const currentCard = document.querySelector('.card--current');
        
        if(previousCards.length > 0) {
            const previousCard = previousCards.pop()
            currentCard.classList.remove('card--current');
            currentCard.classList.add('card--next');
            previousCard.classList.remove('card--previous');
            previousCard.classList.add('card--current');
            this.currentCardNum--;
            this.cardsCounter.textContent = `${this.currentCardNum + 1} | ${this.totalCardsNum}`;
        }
    }
    nextCard() {
        const nextCards = [...document.querySelectorAll('.card--next')];
        const currentCard = document.querySelector('.card--current');
    
        if(nextCards.length > 0) {
            const nextCard =  nextCards.shift();
            currentCard.classList.remove('card--current');
            currentCard.classList.add('card--previous');
            nextCard.classList.remove('card--next');
            nextCard.classList.add('card--current');
            this.currentCardNum++;
            this.cardsCounter.textContent = `${this.currentCardNum + 1} | ${this.totalCardsNum}`;
        }
    }
}