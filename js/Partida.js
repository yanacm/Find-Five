import { ModalController } from "./controllers/ModalController.js";
import { Sorteio } from "./models/game/Sorteio.js";

export class Partida {

    constructor(){
        this.isPlaying = false;
        this.isTyping = true;
        this.iniciar();
        this.urlStats = "https://find-five-api-n9nm.vercel.app";
    }

    async iniciar(){
        const preloaderWrapper = document.querySelector('.preloader-wrapper');
        const sorteio = new Sorteio();
        (async () => {
          this.resetGrid();
          await sorteio.sortear();
        
          const self = this;

          const palavraTenta = new PalavraTentativa();
          let qtd = sorteio.qtd;
          const escrita = new EscritaView(palavraTenta, qtd);
          escrita.updateGrid(sorteio.tentativas, sorteio.states);
          const modal = new ModalController();

          console.log(sorteio.palavra)

          self.isPlaying = true;
        
          const tecladoVirtual = new TecladoVirtual(clickTeclado);
          tecladoVirtual.atualizarStates(sorteio.tentativas, sorteio.states);

          preloaderWrapper.classList.add('fade-out-animation');
        
          const meuTeclado = new TecladoFisico(tecla => {
            clickTeclado(tecla)
            if(tecla != 'arrowright' && tecla != 'arrowleft' && self.isTyping){
              tecladoVirtual.clickTeclaFisica(tecla)
            }
          });
        
          function clickTeclado(tecla){
        
            if(tecla == 'arrowright' && self.isTyping){
              palavraTenta.movePointer(1);
            }
            if(tecla == 'arrowleft' && self.isTyping){
              palavraTenta.movePointer(-1);
            }
        
            if(tecla.match(/^[a-z]$/) && self.isTyping){
                palavraTenta.addLetra(new Letra(tecla.toUpperCase()));
            }
        
            if(tecla == 'backspace' && self.isPlaying){
              palavraTenta.popLetra();
            }

            if(palavraTenta.isCompleto() && tecla == 'enter' && !self.isPlaying){
              location.reload(true);
            }

            if(palavraTenta.isCompleto() && tecla == 'enter' && self.isPlaying){
              const tentativa = new TentativaView(palavraTenta, qtd, sorteio);
              self.isTyping = false;
              
              tentativa.update();
              
              tecladoVirtual.atualizarPartida(palavraTenta.letras, palavraTenta.states);
              
              if(!palavraTenta.checkGanhou()) {
                palavraTenta.resetPalavra();
                escrita.nextLinha();
                qtd++;
              }
              if(qtd == tentativa.qtdMax) {
                self.perder();
                self.isPlaying = false;
                setTimeout( () => {
                  modal.updateText("Que Pena!", sorteio.palavra);
                  modal.showModal()
                  sorteio.deleteSorteio();
                }, 2000)
              }

              setTimeout(() => {
                self.isTyping = true;
              }, 2000)
            }
        
            if(palavraTenta.checkGanhou() && self.isPlaying){
              self.ganhar(qtd + 1);
              self.isPlaying = false;
              setTimeout( () => {
                
                modal.updateText("Parabéns!", sorteio.palavra);
                modal.showModal()
                sorteio.deleteSorteio();
              }, 2000)
            }
        
            if(!escrita.isCompleto()){
              escrita.update();
              const controllerEscrita = new EscritaController(palavraTenta, escrita);
            }
          }
        })();
    }

    resetGrid(){
        const grid = document.querySelector(".grid-palavras")
      
        grid.innerHTML = `
          <div class="row px-md-4">
            <div class="col m-1 my-2 d-flex justify-content-center align-items-center text-white">
              <div class="front write"></div>
              <div class="back empty"></div>
            </div>
            <div class="col m-1 my-2 d-flex justify-content-center align-items-center text-white">
              <div class="front write"></div>
              <div class="back empty"></div>
            </div>
            <div class="col m-1 my-2 d-flex justify-content-center align-items-center text-white correct">
              <div class="front write"></div>
              <div class="back empty"></div>
            </div>
            <div class="col m-1 my-2 d-flex justify-content-center align-items-center text-white almost">
              <div class="front write"></div>
              <div class="back empty"></div>
            </div>
            <div class="col m-1 my-2 d-flex justify-content-center align-items-center text-white wrong">
              <div class="front write"></div>
              <div class="back empty"></div>
            </div>
          </div>
          <div class="row px-md-4">
            <div class="col m-1 my-2 d-flex justify-content-center align-items-center text-white">
              <div class="front empty"></div>
              <div class="back empty"></div>
            </div>
            <div class="col m-1 my-2 d-flex justify-content-center align-items-center text-white">
              <div class="front empty"></div>
              <div class="back empty"></div>
            </div>
            <div class="col m-1 my-2 d-flex justify-content-center align-items-center text-white">
              <div class="front empty"></div>
              <div class="back empty"></div>
            </div>
            <div class="col m-1 my-2 d-flex justify-content-center align-items-center text-white">
              <div class="front empty"></div>
              <div class="back empty"></div>
            </div>
            <div class="col m-1 my-2 d-flex justify-content-center align-items-center text-white">
              <div class="front empty"></div>
              <div class="back empty"></div>
            </div>
          </div>
          <div class="row px-md-4">
            <div class="col m-1 my-2 d-flex justify-content-center align-items-center text-white">
              <div class="front empty"></div>
              <div class="back empty"></div>
            </div>
            <div class="col m-1 my-2 d-flex justify-content-center align-items-center text-white">
              <div class="front empty"></div>
              <div class="back empty"></div>
            </div>
            <div class="col m-1 my-2 d-flex justify-content-center align-items-center text-white">
              <div class="front empty"></div>
              <div class="back empty"></div>
            </div>
            <div class="col m-1 my-2 d-flex justify-content-center align-items-center text-white">
              <div class="front empty"></div>
              <div class="back empty"></div>
            </div>
            <div class="col m-1 my-2 d-flex justify-content-center align-items-center text-white">
              <div class="front empty"></div>
              <div class="back empty"></div>
            </div>
          </div>
          <div class="row px-md-4">
            <div class="col m-1 my-2 d-flex justify-content-center align-items-center text-white">
              <div class="front empty"></div>
              <div class="back empty"></div>
            </div>
            <div class="col m-1 my-2 d-flex justify-content-center align-items-center text-white">
              <div class="front empty"></div>
              <div class="back empty"></div>
            </div>
            <div class="col m-1 my-2 d-flex justify-content-center align-items-center text-white">
              <div class="front empty"></div>
              <div class="back empty"></div>
            </div>
            <div class="col m-1 my-2 d-flex justify-content-center align-items-center text-white">
              <div class="front empty"></div>
              <div class="back empty"></div>
            </div>
            <div class="col m-1 my-2 d-flex justify-content-center align-items-center text-white">
              <div class="front empty"></div>
              <div class="back empty"></div>
            </div>
          </div>
          <div class="row px-md-4">
            <div class="col m-1 my-2 d-flex justify-content-center align-items-center text-white">
              <div class="front empty"></div>
              <div class="back empty"></div>
            </div>
            <div class="col m-1 my-2 d-flex justify-content-center align-items-center text-white">
              <div class="front empty"></div>
              <div class="back empty"></div>
            </div>
            <div class="col m-1 my-2 d-flex justify-content-center align-items-center text-white">
              <div class="front empty"></div>
              <div class="back empty"></div>
            </div>
            <div class="col m-1 my-2 d-flex justify-content-center align-items-center text-white">
              <div class="front empty"></div>
              <div class="back empty"></div>
            </div>
            <div class="col m-1 my-2 d-flex justify-content-center align-items-center text-white">
              <div class="front empty"></div>
              <div class="back empty"></div>
            </div>
          </div>
          <div class="row px-md-4">
            <div class="col m-1 my-2 d-flex justify-content-center align-items-center text-white">
              <div class="front empty"></div>
              <div class="back empty"></div>
            </div>
            <div class="col m-1 my-2 d-flex justify-content-center align-items-center text-white">
              <div class="front empty"></div>
              <div class="back empty"></div>
            </div>
            <div class="col m-1 my-2 d-flex justify-content-center align-items-center text-white">
              <div class="front empty"></div>
              <div class="back empty"></div>
            </div>
            <div class="col m-1 my-2 d-flex justify-content-center align-items-center text-white">
              <div class="front empty"></div>
              <div class="back empty"></div>
            </div>
            <div class="col m-1 my-2 d-flex justify-content-center align-items-center text-white">
              <div class="front empty"></div>
              <div class="back empty"></div>
            </div>
          </div>    
        `
    }

    async ganhar(qtd){
      await this.atualizarEstatisticas('ganhar', qtd);
    }

    async perder(){
      await this.atualizarEstatisticas('perder', 7);
    }

    async atualizarEstatisticas(resultado, qtd){
      const token = getCookie('usuario_find_five');
      
      try {
        const res = await axios.put(`${this.urlStats}/estatisticas/${resultado}`, {}, {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        });
        
      } catch (error) {
        console.log(error);
      }

      try {
        const res = await axios.put(`${this.urlStats}/tentativas/${qtd}`, {}, {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        });
        
      } catch (error) {
        console.log(error);
      }
    }


}
