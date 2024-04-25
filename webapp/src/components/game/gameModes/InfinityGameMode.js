import Swal from 'sweetalert2';

import i18n from 'i18next'; // Importa i18n
import BasicGame from "../BasicGame";
//const { default: GameMode } = require("./GameMode");

class InfinityGameMode extends BasicGame{

      async sendHistory(historyData) {
        //No se guarda la partida si no es clásica
      }

      //patron template method
      async nextQuestion() {
        //comprobamos si necesitamos mas preguntas sino llamamos a la implemntacion del padre
        if(this.questionIndex >= this.questions.length){
          await this.fetchQuestions();
        }
        return super.nextQuestion();
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
        super.endGame();//-<arreglar que el juego sea infinito 
        
         Swal.fire({
          title: i18n.t('basicGameEnd'),
          html: `
            <p>: ${i18n.t('correctAnswers')} ${this.correctas}</p>
          `,
          confirmButtonText: i18n.t('close')
        }).then(()=>{
  
          window.location.href = '/home';
          
        });

      }
    
   
}

export default InfinityGameMode;
