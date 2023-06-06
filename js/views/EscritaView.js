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
        this.update();
        this.initGrid();
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

    initGrid(){
        let colunas = this.#elemento.querySelectorAll('.front');
        
        colunas.forEach(coluna => {
            coluna.classList.replace('empty','write');
        })
    }

    updateGrid(tentativas, estates){
        tentativas.forEach( (palavra, index) => {
            let elemento = this.#grid.children[index];
            let colunas = elemento.querySelectorAll('.col');
            let stateTemp = estates[index];
            let letras = palavra.split("");
            colunas.forEach((coluna, i) => {
                
                coluna.classList.add('active');
                let card = coluna.querySelector('.back')
                let front = coluna.querySelector('.front');
                card.innerHTML = letras[i];
                card.style.transition = 'transform 0s';
                front.style.transition = 'transform 0s';
                card.classList.replace('empty', stateTemp[i]);
            })

        });
        
    }

    get palavra(){
        return this.#palavra;
    }

    get elemento(){
        return this.#elemento;
    }
}
