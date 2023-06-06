import { Modal } from '../models/game/Modal.js'
import { ModalView } from '../views/ModalView.js'

export class ModalController {

    constructor() {
      this.btnReiniciar = null;
      this.modalView = new ModalView(document.querySelector("#box-modal"));
      
    }

    init() {
      this.btnReiniciar = document.getElementById("btn-reiniciar");
      this.btnReiniciar.addEventListener("click", this.reiniciarJogo.bind(this));
    }
  
    updateText(title, palavra) {
      this.model = new Modal(title, palavra);
      this.modalView.update(this.model);
    }

    showModal(){
      const myModal = new bootstrap.Modal(document.getElementById("modalEnd"));
      myModal.show();
      this.init();
    }

    reiniciarJogo(){
      location.reload(true);
    }
}