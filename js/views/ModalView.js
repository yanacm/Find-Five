
export class ModalView {

    constructor(elemento){
        this.elemento = elemento;
    }
  

    template(model){
        return `
        <div class="modal fade" id="modalEnd" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg">
          <div class="modal-content bg-modal">
            <div class="modal-header position-relative text-end border-0">
              <button class="position-absolute top-0 end-0 btn" data-bs-dismiss="modal"><i class="fa-solid fa-xmark"></i></button>
            </div>
            <div class="modal-body text-center mx-0 mx-sm-4 mt-5 px-sm-5">
              <div class="my-4 mx-sm-2">

                <h3 class="text-white">${model.title}</h3>
                <h3 class="text-white mb-5">A palavra certa é: ${model.palavra}</h3>
              </div>
              <button class="btn bg-none text-white m-3 mt-3" data-bs-dismiss="modal"><i class="fa-solid fa-rotate-right"></i>Jogar novamente</button>
            </div>
          </div>
        </div>
      </div>
        `
    }
    
    update(model){
        this.elemento.innerHTML = this.template(model);
    }
  

}