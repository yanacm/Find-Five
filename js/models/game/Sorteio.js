export class Sorteio {
    #palavra;
    #url;
  
    constructor() {
      this.#url = "https://findfiveapi.onrender.com";
      this.#palavra = '';
      this.sortear();
    }
    
    async sortearPalavra() {
      const res = await axios.get(`${this.#url}/palavras/randomWord`);
      const palavra = res.data.name;
      return palavra;
    }
  
    async sortear() {
      this.#palavra = await this.sortearPalavra();
    }
  
    get palavra() {
      return this.#palavra;
    }
  }
  