export class Sorteio {
    #palavra;
  
    constructor() {
      this.#palavra = '';
      this.sortear();
    }
  
    async sortearPalavra() {
      const response = await fetch('../../../assets/base.txt');
      const text = await response.text();
      const palavras = text.split('\n').map(palavra => palavra.trim()).filter(palavra => palavra.length === 5);
      const indiceAleatorio = Math.floor(Math.random() * palavras.length);
      return palavras[indiceAleatorio];
    }
  
    async sortear() {
      this.#palavra = await this.sortearPalavra();
    }
  
    get palavra() {
      return this.#palavra;
    }
  }
  