class EscritaController{

    #palavraTentativa;
    #celulas;
    #escritaView;

    constructor(palavraTentativa, escritaView){
        this.#palavraTentativa = palavraTentativa;
        this.#escritaView = escritaView;

        this.#celulas = (this.#escritaView.elemento).querySelectorAll('.front');

        this.addEventListeners();

    }

    addEventListeners() {
        this.#celulas.forEach((celula, index) => {
            celula.addEventListener('click', () => {
                this.#palavraTentativa.movePointerPos(index);
                this.#escritaView.update();
            });
        });
    }

    update(palavraTentativa, escritaView){
        this.#palavraTentativa = palavraTentativa;
        this.#escritaView = escritaView;
        this.#celulas = (this.#escritaView.elemento).querySelectorAll('.front');

        this.addEventListeners();
    }
}