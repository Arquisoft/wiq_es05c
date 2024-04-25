import BasicGame from "../BasicGame";
import Swal from 'sweetalert2';

import i18n from 'i18next'; // Importa i18n

class CustomGameMode extends BasicGame{
    constructor(timeCustom, numQuestionCustom){
        super();
        this.timeToAnswer = timeCustom; 
        this.numQuestions = numQuestionCustom;
    }
   
    async fetchQuestions() {
        try {
          const response = await fetch(`${this.apiEndpoint}/getQuestionModoCustom?numPreguntas=${this.numQuestions}`);
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
    
      finishGame(){
        //llamare al endgame del padre y luego redirecciona 
        this.endGame();

        //ahora mostrar el popup con el resultado y cuando se cierre redireccionar a=/home
        Swal.fire({
          title: i18n.t('basicGameEnd'),
          html: `
            <p>: ${i18n.t('correctAnswers')} ${this.correctas}</p>
            <p>${i18n.t('wrongAnswers')} ${this.incorrectas}</p>
            <p>${i18n.t('timePlayed')} ${this.tiempoTotal}</p>
          `,
          confirmButtonText: i18n.t('close'),
          customClass: {         
            popup: 'finDelJuego'
          }
        }).then(()=>{
  
            this.navigate('/home');
          
        });

      }
}
export default CustomGameMode;
