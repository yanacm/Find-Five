class TentativaView {

    #palavra
    #numero;
    #elemento;
    #qtdMax;
    #sorteio;

    constructor(palavra, numero, sorteio){
        this.#palavra = palavra;
        this.#numero = numero;
        this.#sorteio = sorteio;
        this.#qtdMax = 6;
        const grid  = document.querySelector('.grid-palavras');
        this.#elemento = grid.children[this.#numero];
    }

    update(){
        if(this.#numero < this.#qtdMax){
            const letras = this.#palavra.letras;
            this.checkTentativa()
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
        this.#palavra.checkGanhou()
    }

    checkTentativa(){
        let strPalavra = this.#palavra.letras.map(letra => (letra.valor).toLowerCase());

        // Obtém a palavra selecionada do armazenamento local, remove acentos e transforma em letras minúsculas
        const palavraSelecionada = this.removerAcentos(this.#sorteio.palavra).toLowerCase();

        const tentativaAtual = strPalavra;

        // Cria um array com 5 elementos vazios
        const estates = this.#palavra.states;

        // Cria um objeto que conta a quantidade de ocorrências de cada letra na palavra selecionada
        const letterCount = [...palavraSelecionada].reduce((count, letter) => {
            count[letter] = (count[letter] || 0) + 1;
            return count;
        }, {});

        // Itera sobre os caracteres da tentativaAtual usando um laço for...of
        for (const [i, letter] of tentativaAtual.entries()) {
            if (letter == palavraSelecionada[i]) {
                estates[i] = "correct";
                letterCount[letter] -= 1;
            }
        }

        // Itera sobre os caracteres da tentativaAtual novamente para verificar letras que existem na palavra selecionada mas estão nas posições erradas
        for (const [i, letter] of tentativaAtual.entries()) {
            if (estates[i] != "correct") {
                if (letter in letterCount && letterCount[letter] > 0) {
                    estates[i] = "almost";
                    letterCount[letter] -= 1;
                } else {
                    estates[i] = "wrong";
                }
            }
        }

        this.#palavra.states = estates;
    }

    removerAcentos(str) {
        return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
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