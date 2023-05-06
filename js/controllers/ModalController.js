import { Modal } from '../models/game/Modal.js'
import { ModalView } from '../views/ModalView.js'

export class ModalController {

    constructor() {
      this.btnReiniciar = null;
      this.modalView = new ModalView(document.querySelector("#box-modal"));
    }
  
    updateText(title, palavra) {
      this.model = new Modal(title, palavra);
      this.modalView.update(this.model);
    }

    showModal(){
      const myModal = new bootstrap.Modal(document.getElementById("modalEnd"));
      myModal.show();
    }
}