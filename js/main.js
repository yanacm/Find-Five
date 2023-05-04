import { ModalController } from "./controllers/ModalController.js";
import { Sorteio } from "./models/game/Sorteio.js";

const sorteio = new Sorteio();
console.log(sorteio.palavra)
const palavraTenta = new PalavraTentativa();
let qtd = 0;
const escrita = new EscritaView(palavraTenta, qtd);
const controllerGrid = new EscritaController(palavraTenta, escrita);

const tecladoVirtual = new TecladoVirtual(clickTeclado)

const meuTeclado = new TecladoFisico(tecla => {
  clickTeclado(tecla)
  if(tecla != 'arrowright' && tecla != 'arrowleft'){
    tecladoVirtual.clickTeclaFisica(tecla)
  }
});

function clickTeclado(tecla){

  if(tecla == 'arrowright'){
    palavraTenta.movePointer(1);
  }
  if(tecla == 'arrowleft'){
    palavraTenta.movePointer(-1);
  }

  if(tecla.match(/^[a-z]$/)){
      palavraTenta.addLetra(new Letra(tecla.toUpperCase()));
  }

  if(tecla == 'backspace'){
    palavraTenta.popLetra();
  }

  if(palavraTenta.isCompleto() && tecla == 'enter'){
    const tentativa = new TentativaView(palavraTenta, qtd, sorteio);
    tentativa.update();
    qtd++;
    palavraTenta.resetPalavra();
    escrita.nextLinha();
    controllerGrid.update(palavraTenta, escrita);
  }
  if(!escrita.isCompleto()){
    escrita.update();
  }
}
