class TecladoFisico {
    constructor(callback) {
      this.callback = callback;
      document.addEventListener('keydown', this.handleKeyDown.bind(this));
    }
  
    handleKeyDown(event) {
      const tecla = event.key.toLowerCase();
      if (tecla.match(/^[a-z]$/)) {
        this.callback(tecla);
      } else if (tecla === 'enter') {
        this.callback(tecla);
      } else if (tecla === 'backspace') {
        this.callback(tecla);
      }
    }
}