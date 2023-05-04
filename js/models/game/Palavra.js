class Palavra {
    #tamanhoMax;
    #letras;
    #states;

    constructor(){
        this.#tamanhoMax = 5;
        this.#letras = new Array(this.#tamanhoMax);
        this.#states = new Array(this.#tamanhoMax);
        this.#letras.fill(undefined);
        this.#states.fill('empty');
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

    get tamanhoMax(){
        return this.#tamanhoMax;
    }

    get states() {
        return this.#states;
    }

    get letras(){
        return this.#letras;
    }

    set letras(letrasNovas){
        this.#letras = letrasNovas
    }

    set states(newStates){
        this.#states = newStates;
    }
}
