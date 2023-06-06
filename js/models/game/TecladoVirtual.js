class TecladoVirtual extends Teclado {
    constructor(call) {
        super(call);
        this.states = {};
        this.teclas = document.querySelectorAll('.tecla');

        this.teclas.forEach(tecla => {
            tecla.addEventListener('click', this.clickTeclaVirtual.bind(this));
        });

        this.teclas.forEach(tecla => {
            this.states[(tecla.innerHTML).toUpperCase()] = ''
        })
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

    atualizarPartida(tentativa, states){

        const letras = tentativa;

        letras.forEach((letra, i) => {
            if(this.states[letra.valor] == ""){
                this.states[letra.valor] = states[i];
            }
            if(this.states[letra.valor] == "wrong" && (states[i] == "correct" || states[i] == "almost")){
                this.states[letra.valor] = states[i];
            }
            if(states[i] == "correct"){
                this.states[letra.valor] = states[i];
            }
        })
        setTimeout(() => {
            this.teclas.forEach(tecla => {
            
                if(this.states[(tecla.innerHTML).toUpperCase()] != ""){
                    tecla.classList.add(this.states[(tecla.innerHTML).toUpperCase()])
                }
    
            })
        }, 400 * 5)

    }

    atualizarStates(tentativas, states){

        tentativas.forEach((palavra, index) => {
            let estado = states[index];
            let letras = palavra.split("");
            estado.forEach((estate, i) => {
                if(this.states[letras[i]] == ''){
                    this.states[letras[i]] = estate
                }
                if(this.states[letras[i]] == 'wrong' && (estate == 'correct' || estate == 'almost')){
                    this.states[letras[i]] = estate
                }
                if(estate == 'correct'){
                    this.states[letras[i]] = estate
                }
            })
        })

        this.teclas.forEach(tecla => {
            
            if(this.states[(tecla.innerHTML).toUpperCase()] != ""){
                tecla.classList.add(this.states[(tecla.innerHTML).toUpperCase()])
            }

        })

    }
}