const { default: BasicGame } = require("../BasicGame");
//const { default: GameMode } = require("./GameMode");

class DailyGameMode extends BasicGame{

    constructor() {
      super();
      this.enviarHistorialPorQueHasAcetado=false;
    }
   
    async fetchQuestions() {
        try {
          const response = await fetch(`${this.apiEndpoint}/getQuestionDiaria`);
          const data = await response.json();
      
          this.questions = Object.values(data);
          this.isLoading = false;
      
        } catch (error) {
          console.error('Error fetching question data:', error);
        }
        return this.questions;
      }

      async sendHistory(historyData) {
        //sacar del localStorage el usuario
        historyData.user = localStorage.getItem('username');
        if(this.enviarHistorialPorQueHasAcetado){
          try {
            const response = await fetch(`${this.apiEndpoint}/updateHistoryDiaria`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(historyData)
            });
            const data = await response.json();
            console.log('Historial enviado:', data);
          } catch (error) {
            console.error('Error enviando historial:', error);
          }
        }
      }

      nextQuestion() {
       this.getCurrentQuestion();
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

      incrementCorrectas(){
        this.enviarHistorialPorQueHasAcetado=true;
        this.correctas++;
        this.finishGame();
      }
    
   
}

module.exports =  DailyGameMode ;