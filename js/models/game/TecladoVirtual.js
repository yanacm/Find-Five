class TecladoVirtual extends Teclado {
    constructor(call) {
        super(call);
        this.teclas = document.querySelectorAll('.tecla');

        this.teclas.forEach(tecla => {
            tecla.addEventListener('click', this.clickTeclaVirtual.bind(this));
        });
    }

    clickTeclaVirtual(elemento) {
        const tecla = elemento.srcElement;
        this.callback(tecla.innerHTML || 'backspace');
        super.clickTecla(tecla);
    }

    clickTeclaFisica(valorTecla) {
        const tecla = [...this.teclas].find(tecla => {
            return tecla.innerHTML == valorTecla ||
                (tecla.classList.contains('delete') && valorTecla == 'backspace');
        });
        super.clickTecla(tecla);
    }
}