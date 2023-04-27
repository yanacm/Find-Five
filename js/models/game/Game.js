class Game {
    #tentativasGame;

    constructor(){
        this.#tentativasGame = [];
    }

    addTentativa(tentativa){
        this.#tentativasGame.push(tentativa);
    }

    qtdTentativas(){
        return this.#tentativasGame.length;
    }

    get tentativas(){
        return this.#tentativasGame;
    }
}