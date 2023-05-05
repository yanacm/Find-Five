class EscritaView {
    #grid
    #palavra
    #linha_atual;
    #elemento;
    #qtd_linhas;

    constructor(palavra, linha_atual){
        this.#palavra = palavra;
        this.#linha_atual = linha_atual;
        this.#qtd_linhas = 6;
        this.#grid = document.querySelector('.grid-palavras');
        this.#elemento = this.#grid.children[this.#linha_atual];
        this.update()
    }
    
    update(){
        const cards = this.#elemento.querySelectorAll('.front');
        if(!this.isCompleto()){
            this.#updatePalavra(cards);
        }
        this.#updatePointer(cards);
    }

    #updatePalavra(cards){
        
        cards.forEach( (card, i) => {
            let digitar = this.#palavra.letras[i] || ''
            card.innerHTML = digitar === '' ? '' : digitar.valor
        })
    }

    #updatePointer(cards){
        this.#removeElementPointer(cards);
        const cardPointer = cards[this.#palavra.pointer];
        cardPointer.classList.add('active');
        this.#toggleVisiblePointer(cardPointer);
    }

    #removeElementPointer(cards){
        const elementoAtual = [... cards].find( card => { return card.classList.contains('active')});
        if (elementoAtual) {
            elementoAtual.classList.remove('active');
        }
    }

    #toggleVisiblePointer(card){

        if (!this.#palavra.state_pointer) {
            card.style.setProperty('--opacity-faixa', '0');
            return;
        }
        card.style.setProperty('--opacity-faixa', '1');
    }

    isCompleto(){
        return (this.#linha_atual) === this.#qtd_linhas;
    }   

    nextLinha(){
        if(!this.isCompleto()){
            const cardPointer = this.#elemento.querySelector('.active')
            cardPointer.classList.remove('active')
            this.#linha_atual++;
            this.#elemento = this.#grid.children[this.#linha_atual];
        }
    }

    get palavra(){
        return this.#palavra;
    }

    get elemento(){
        return this.#elemento;
    }
}
