class Palavra {
    #tamanho;
    #letras;
    #states;

    constructor(){
        this.#tamanho = 5;
        this.#letras = [];
        this.#states = [];
    }

    addOneLetra(letra){
        this.#letras.push(letra)
    }

    addLetra(letra, posicao){
        this.#letras[posicao] = letra
    }

    addStates(state, posicao){
        this.#states[posicao] = state
    }

    addStatesAll(states){
        this.#states = states;
    }

    get tamanho(){
        return this.#tamanho;
    }

    get states() {
        return this.#states;
    }

    get letras(){
        return this.#letras;
    }
}
