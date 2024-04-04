// BasicGame.js
/*
implementacion por defecto dle juego , esta implementacion es muy similar siempre
pero en ciertos casos como en el online si no quieres guardar el historial o quieres x cosa
heredas y sobreescribes  y list */

import GameMode from './gameModes/GameMode';

class BasicGame extends GameMode {
  constructor() {
    super();
       // Vincular nextQuestion al contexto correcto
       this.nextQuestion = this.nextQuestion.bind(this);
    
  }
  async fetchQuestions() {
    try {
      const response = await fetch(`${this.apiEndpoint}/getQuestionModoBasico`);
      const data = await response.json();
  
      this.questions = Object.values(data);
      this.isLoading = false; // Mover esta línea aquí
  
    } catch (error) {
      console.error('Error fetching question data:', error);
    }
    return this.questions;
  }
  
  async startGame() {
    this.isLoading = true;
    this.questionIndex = 0;
    await this.fetchQuestions();
    this.isLoading = false;
  }
  async endGame() {
    console.log('endGameeeeeeeeee');
    this.isGameEnded = true;
    this.questionIndex=0;
  }
  /*
  recibe el objeto que representa los datos asi si quieres no guardar un dato no se lo pasas 
  */
  async sendHistory(historyData) {
    if (localStorage.getItem('username') != null) {
      if (!('correctas' in historyData) || !('incorrectas' in historyData) || !('tiempoTotal' in historyData)) {
        throw new Error('historyData must have correctas, incorrectas, and tiempoTotal properties');
      }
  
      const data = {
        user: localStorage.getItem('username'),
        correctas: historyData.correctas,
        incorrectas: historyData.incorrectas,
        tiempoTotal: historyData.tiempoTotal
      };
  
      console.log("Se envian los siguientes datos al historial", data);
      fetch(`${this.apiEndpoint}/updateHistory`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Respuesta del servidor:', data);
      })
      .catch(error => {
        console.error('Error al enviar el historial al servidor:', error);
      });
    }
  }
  nextQuestion() {
    console.log('questions en el next questions ',this.questions);
    this.isLoading = true;
    console.log('a ',this.questionIndex);
    if (this.questionIndex >=9) {
      console.log("fin juego");
      this.finishGame();
      return null;
    } else {
      // Incrementar this.questionIndex después de comprobar si has llegado a la última pregunta
      this.questionIndex++;
      console.log('b ',this.questionIndex);
      const currentQuestion = this.getCurrentQuestion();
     console.log('c ',currentQuestion);
      this.isLoading = false;
      return currentQuestion; // devolver la pregunta actual
    }
  }
    getCurrentQuestion() {
    // Comprobar si this.questions[this.questionIndex] es undefined
    if (this.questions[this.questionIndex] === undefined) {
      throw new Error('No question at index ' + this.questionIndex);
    }
  
    // Obtener la pregunta actual del array de preguntas
    const data = this.questions[this.questionIndex];
  
    // Convertir los datos de la pregunta al formato que necesita QuestionArea
    const questionData = {
      pregunta: data.pregunta,
      correcta: data.correcta,
      respuestasIncorrecta1: data.respuestasIncorrecta1,
      respuestasIncorrecta2: data.respuestasIncorrecta2,
      respuestasIncorrecta3: data.respuestasIncorrecta3
    };
  
    return questionData;
  }

  finishGame(){
    this.isGameEnded = true;
    this.endGame();
  }
}

export default BasicGame;