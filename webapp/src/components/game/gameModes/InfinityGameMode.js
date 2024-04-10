const { default: BasicGame } = require("../BasicGame");
const { default: GameMode } = require("./GameMode");

class InfinityGameMode extends BasicGame{
    constructor(){
        super();
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

      async sendHistory(historyData) {
        //No se guarda la partida si no es clásica
      }

      async nextQuestion() {
        // Incrementar el índice de la pregunta actual
        this.questionIndex++;
      
        // Comprobar si hemos llegado al final de las preguntas
        if (this.questionIndex >= this.questions.length) {
          //Relleno si se acabaron
          await this.fetchQuestions();
        }
        // Obtener la siguiente pregunta
        const nextQuestion = this.getCurrentQuestion();
      
        return nextQuestion;
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

      incrementIncorrectas(){
        console.log("incrementa incorrectas");
        this.incorrectas++;
        this.finishGame();
      }
    
   
}

module.exports =  InfinityGameMode ;