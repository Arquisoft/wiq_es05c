import Swal from 'sweetalert2';

import i18n from 'i18next'; // Importa i18n
import BasicGame from "../BasicGame";
//const { default: GameMode } = require("./GameMode");

class InfinityGameMode extends BasicGame{

      async sendHistory(historyData) {
        //No se guarda la partida si no es clásica
      }
      //el unico cambio con le padre es que agrega mas preguntas al arary 
      async fetchQuestions() {
        if(this.idioma === null || this.idioma === undefined)
          this.idioma = 'en';
        console.log("entra en fetchQuestions valor idioma "+this.idioma);
        try {
          const response = await fetch(`${this.apiEndpoint}/getQuestionModoBasico?idioma=${this.idioma}`);
          const data = await response.json();
      
          this.questions = this.questions.concat(Object.values(data));
          this.isLoading = false; // Mover esta línea aquí
      
        } catch (error) {
          console.error('Error fetching question data:', error);
        }
        return this.questions;
      }
      //patron template method
      nextQuestion() {
        //comprobamos si necesitamos mas preguntas sino llamamos a la implemntacion del padre
        if(this.questionIndex >= this.questions.length){
          this.fetchQuestions().then(() => {
            return super.nextQuestion();
          });
        } else {
          return super.nextQuestion();
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
      incrementIncorrectas(){
        console.log("test");
        //llamar al incrementar incorrectas del padre la uncia diff es que terminaste el juego
        this.finishGame();//-<arreglar que el juego sea infinito 
        
         

      }

      finishGame(){
        //lammar al finish game del padre 

        super.finishGame();
        //redirijir a home y mostrar el popup 
       
        Swal.fire({
          title: i18n.t('basicGameEnd'),
          html: `
            <p>: ${i18n.t('correctAnswers')} ${this.correctas}</p>
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

export default InfinityGameMode;
