const { default: BasicGame } = require("../BasicGame");

class DiaroGameMode extends BasicGame{
    constructor(){
        super();

    }
   
    async fetchQuestions() {
        try {
          const response = await fetch(`${this.apiEndpoint}/getQuestionDiaria`);
          const data = await response.json();
      
          this.questions = Object.values(data);
          this.isLoading = false;

          //Marcamos que el user jugó la partida diaria
          let userName = localStorage.getItem('username')
          if(userName===undefined || userName===null){
            throw new Error('No se ha encontrado el usuario');
          }
          console.log('antes');
          const record = await fetch(`${this.apiEndpoint}/grabarJugadoDiario?userName=${userName}`);
          console.log('dspss');

      
        } catch (error) {
          console.error('Error fetching question data:', error);
        }
        return this.questions;
      }

      nextQuestion() {
            this.isLoading = true;
            const currentQuestion = this.getCurrentQuestion();
            this.isLoading = false;
            return currentQuestion; // devolver la pregunta actual
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

        incrementCorrectas(){
            this.correctas++;
        }

        incrementIncorrectas(){
            this.incorrectas++;
        }

        async sendHistory(historyData) {
            //Sumar si se acertó
        }
}
module.exports = DiaroGameMode;
