class EscritaView {
    #palavra
    #numero;
    #elemento;
    #qtdMax;

    constructor(palavra, numero){
        this.#palavra = palavra;
        this.#numero = numero;
        this.#qtdMax = 6;
        const grid  = document.querySelector('.grid-palavras');
        this.#elemento = grid.children[this.#numero];
    }
    
    update(){

        if(this.#numero < this.#qtdMax){
            const cards = this.#elemento.querySelectorAll('.write');
        
            cards.forEach( (card, i) => {
                let digitar = this.#palavra.letras[i] || ''
                card.innerHTML = digitar === '' ? '' : digitar.valor
            })
        }
    }

    updateNumero(){
        if(this.#numero < this.#qtdMax){
            this.#numero++;
            const grid  = document.querySelector('.grid-palavras');
            this.#elemento = grid.children[this.#numero];
        }
    }


    get palavra(){
        return this.#palavra;
    }

    get elemento(){
        return this.#elemento;
    }
}
