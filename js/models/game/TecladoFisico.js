class TecladoFisico extends Teclado {
  constructor(callback) {
      super(callback);
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
      } else if (tecla === 'arrowright' || tecla === 'arrowleft') {
          this.callback(tecla);
      }
      super.clickTecla(event.target);
  }
}