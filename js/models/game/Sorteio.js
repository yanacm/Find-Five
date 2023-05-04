export class Sorteio {
    #palavra

    constructor(){
        this.#palavra = ''
        this.sortear();
    }

    sortear(){
        this.#palavra = 'cones';
    }

    get palavra(){
        return this.#palavra;
    }
}