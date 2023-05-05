class Game {
    #tentativasGame;
    #gameState = false;

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

    get gameState(){
        return this.gameState;
    }

    set gameState(booleano){
        this.gameState = this.booleano;
    }

}