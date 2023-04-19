class PalavraTentativa extends Palavra {

    constructor(){
        super();
    }

    removeUltimaLetra() {
        this.letras.pop();
    }

    removeLetras(){
        this.letras.splice(0, this.letras.length);
    }
}