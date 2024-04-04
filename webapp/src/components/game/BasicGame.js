// Modo de juego básico
class BasicGame extends GameMode {
    constructor(context) {
      super();
      this.context = context;
    }
    fetchQuestions() {
      // Implementación por defecto para obtener preguntas
      return this.context.questions;
    }
    startGame() {
      // Implementación por defecto para iniciar el juego
      this.context.startGame();
    }
    endGame() {
      // Implementación por defecto para terminar el juego
    }
    sendHistory() {
      // Implementación por defecto para enviar historial
    }
  }