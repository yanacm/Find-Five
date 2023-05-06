class Teclado {
    constructor(callback) {
        this.callback = callback;
    }

    clickTecla(tecla) {
        tecla.classList.add('press');

        setTimeout(() => {
            tecla.classList.remove('press');
        }, 200);
    }
}