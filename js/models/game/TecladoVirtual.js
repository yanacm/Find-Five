class TecladoVirtual {

    #teclas;

    constructor(){
        this.#teclas = document.querySelectorAll('.tecla');

        this.#teclas.forEach( tecla => {
            
            tecla.addEventListener('click', () => {
                tecla.classList.add('press')

                setTimeout( () => {
                    tecla.classList.remove('press')
                }, 200)
            })
        })
    }
}
