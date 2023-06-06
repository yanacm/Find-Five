export class Sorteio {
    #palavra;
    #tentativas;
    #states;
    #qtd;
    #url;
  
    constructor() {
      this.#url = "https://apifindfive-two.vercel.app";
      this.#qtd = 0;
      this.#tentativas = [];
      this.#states = []
      this.#palavra = '';
    }
    
    async sortear() {
      const token = getCookie('usuario_find_five');
      try {
        const res = await axios.post(`${this.#url}/partida`, {}, {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        });
        const data = res.data;
        this.#palavra = data.palavra_sorteada;
        this.#qtd = data.tentativas_palavras.length;
        this.#tentativas = data.tentativas_palavras;
        this.#states = data.tentativas_estados;

      } catch (error) {

        if(error.response.data.msg == "Já existe essa partida!"){
          await this.getSorteio()
        }
      }

    }

    async getSorteio(){
      const token = getCookie('usuario_find_five');
      try {
        const res = await axios.get(`${this.#url}/partida`, {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        });
        const data = res.data;
        this.#palavra = data.palavra_sorteada;
        this.#qtd = data.tentativas_palavras.length;
        this.#tentativas = data.tentativas_palavras;
        this.#states = data.tentativas_estados;
        
        if(this.#tentativas.length == 6){
          this.deleteSorteio();
        }
      } catch (error) {
        console.log(error);
      }
    }

    async deleteSorteio(){
      const token = getCookie('usuario_find_five');
      try {
        const res = await axios.delete(`${this.#url}/partida`, {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        });
        
      } catch (error) {
        console.log(error);
      }
    }

  
    get palavra() {
      return this.#palavra;
    }

    get tentativas(){
      return this.#tentativas;
    }

    get states(){
      return this.#states;
    }

    get qtd(){
      return this.#qtd;
    }
  }
  