export class Sorteio {
    #palavra

    constructor(){
        this.#palavra = ''
        this.sortear();
    }

    sortear(){
        this.#palavra = 'ponta';
    }

    get palavra(){
        return this.#palavra;
    }
}