class TentativaView {

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
            const letras = this.#palavra.letras;
            letras.forEach( (letra, i) => {
                let coluna = this.#elemento.children[i]
                let front = coluna.querySelector('.front')
                let back = coluna.querySelector('.back')
                front.innerHTML = back.innerHTML = letra.valor
                back.classList.replace('empty', this.#palavra.states[i]);
            })
    
            this.cardGiro()
            this.updateNextLinha()
        }
    }

    cardGiro(){
        let children = this.#elemento.querySelectorAll('.col');

        for (var i = 0; i < children.length; i++) {
            setTimeout(this.addActive, i * 400, children[i]);
        }
    }

    addActive(coluna){
        coluna.classList.add('active');
    }

    updateNextLinha(){
        if(this.#numero + 1 < this.#qtdMax){
            let nextLinha = this.#elemento.nextElementSibling;
            setTimeout( () => {
                let cardsFront = nextLinha.querySelectorAll('.front');
    
                cardsFront.forEach( card => {
                    card.classList.replace('empty', 'write');
                })
            }, 2000)
        }
    }

    get palavra(){
        return this.#palavra;
    }

    get elemento(){
        return this.#elemento;
    }

}