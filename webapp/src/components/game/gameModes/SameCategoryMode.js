
import BasicGame from '../BasicGame';
import Swal from 'sweetalert2';
import i18n from 'i18next'; // Importa i18n

class SameCategoryMode extends BasicGame{

  constructor(category){
    super();
    this.category = category;
  }

    async fetchQuestions() {
        try {
          const response = await fetch(`${this.apiEndpoint}/getQuestionModoMismaCategoria?idioma=${this.idioma}&categoria=${this.category}`);
          const data = await response.json();
      
          this.questions = Object.values(data);
          this.isLoading = false; // Mover esta línea aquí
      
        } catch (error) {
          console.error('Error fetching question data:', error);
        }
        return this.questions;
      }

      async sendHistory(historyData) {
        //No se guarda la partida si no es 
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
export default SameCategoryMode;  