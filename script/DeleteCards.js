export class DeleteCards {
    constructor(btnDelete) {
        this.btnDelete = btnDelete;
    }
    //  * Delete Cards
    deleteCards() {
        if(this.cardsData.length === 0) {
            return;
        }
        const confirm = window.confirm('Are you sure you want to remove all cards?');
        if(confirm) {
            this.cardsContainer.innerHTML = "";
            localStorage.clear();
            window.location.reload();
        }
    }
}