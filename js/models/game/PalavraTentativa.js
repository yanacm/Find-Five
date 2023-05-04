class PalavraTentativa extends Palavra {

    #pointer;
    #state_pointer;
    #tamanhoAtual;

    constructor(){
        super();
        this.#pointer = 0;
        this.#state_pointer = true;
        this.#tamanhoAtual = 0;
    }

    addLetra(letra){
        if(this.#state_pointer){
            this.letras[this.#pointer] = letra;
            this.#tamanhoAtual = this.#tamanhoAtual < this.tamanhoMax ? this.#tamanhoAtual + 1 : this.tamanhoMax;
        }
        if(this.isCompleto()){
            this.disablePointer();
            return;
        }
        this.#nextVazio()
    }

    popLetra(){
        if(!this.#state_pointer) this.enablePointer();

        if(this.letras[this.#pointer] != undefined || this.#pointer == 0) this.#apagarLetra(this.#pointer);
        else if(this.#pointer > 0){
            this.#pointer--;
            this.#apagarLetra(this.#pointer);
        }
    }

    #apagarLetra(posicao){
        if(this.#tamanhoAtual > 0) this.#tamanhoAtual--;
        if(posicao >= 0) this.letras[posicao] = undefined;
    }

    #nextVazio(){
        for(let novoPointer = this.#pointer; novoPointer < this.tamanhoMax; novoPointer++){
            if(this.letras[novoPointer] == undefined){
                this.#pointer = novoPointer;
                return;
            }
        }
        for(let novoPointer = 0; novoPointer < this.#pointer; novoPointer++){
            if(this.letras[novoPointer] == undefined){
                this.#pointer = novoPointer;
                return;
            }
        }
    }

    disablePointer(){
        this.#state_pointer = false;
    }

    enablePointer(){
        this.#state_pointer = true;
    }

    movePointer(valor){
        if(this.isCompleto() && !this.#state_pointer){
            this.#pointer = valor < 0 ? 0 : this.tamanhoMax - 1;
            this.enablePointer();
            return;
        }
        if(valor > 0 && this.tamanhoMax - 1 > this.#pointer) this.#pointer++;
        else if(valor < 0 && this.#pointer > 0) this.#pointer--;
    }
    movePointerPos(posicao){
        this.#pointer = posicao;
        
        if(this.isCompleto() && !this.#state_pointer){
            this.enablePointer();
        }
    }

    isCompleto(){
        return this.#tamanhoAtual === this.tamanhoMax;
    }

    checkGanhou(){
        console.log(this.states.map( (state) => {state === 'correct'}))
    }

    resetPalavra(){
        this.enablePointer();
        this.letras = [undefined, undefined, undefined, undefined, undefined];
        this.states = ['empty', 'empty', 'empty', 'empty', 'empty']
        this.#pointer = 0;
        this.#tamanhoAtual = 0;
    }

    get state_pointer(){
        return this.#state_pointer;
    }

    get tamanhoAtual(){
        return this.#tamanhoAtual
    }

    set tamanhoAtual(tam){
        this.#tamanhoAtual = tam;
    }

    get pointer(){
        return this.#pointer;
    }
}