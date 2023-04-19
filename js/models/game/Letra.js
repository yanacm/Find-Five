class Letra {
    #valor;

    constructor(valor){
        this.#valor = valor;
    }

    get valor(){
        return this.#valor;
    }
}