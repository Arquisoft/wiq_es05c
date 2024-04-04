// BasicGame.js
/*
implementacion por defecto dle juego , esta implementacion es muy similar siempre
pero en ciertos casos como en el online si no quieres guardar el historial o quieres x cosa
heredas y sobreescribes  y list */

import GameMode from './GameMode';

class BasicGame extends GameMode {
  constructor() {
    super();
    this.isLoading = true;
  }
  async fetchQuestions() {
    try {
      const response = await fetch(`${this.apiEndpoint}/getQuestionModoBasico`);
      const data = await response.json();

      this.questions = Object.values(data);
      this.isLoading = false;

    } catch (error) {
      console.error('Error fetching question data:', error);
    }
    return this.questions;
  }
  async startGame() {
    this.isLoading = true;
    this.questionIndex = 0;
    await this.fetchQuestions();
  }
  endGame() {
    this.isGameEnded = true;
    this.questionIndex=0;
  }
  sendHistory() {
    // Implementación por defecto para enviar historial
  }
    nextQuestion() {
        if(!this.isGameEnded){
            this.questionIndex++;
            //es el json con pregunta {resp1 resp2 resp3 resp4 correcta}
            return this.questions[this.questionIndex];
        }else
        this.endGame();
   }
}

export default BasicGame;