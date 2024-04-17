// BasicGame.js
/*
implementacion por defecto dle juego , esta implementacion es muy similar siempre
pero en ciertos casos como en el online si no quieres guardar el historial o quieres x cosa
heredas y sobreescribes  y list */

import GameMode from './gameModes/GameMode';
import Swal from 'sweetalert2';

import i18n from 'i18next'; // Importa i18n

class BasicGame extends GameMode {

  constructor() {
    super();
       // Vincular nextQuestion al contexto correcto
       this.nextQuestion = this.nextQuestion.bind(this);
       this.correctas=0;
       this.incorrectas=0;
       this.tiempoTotal=null;

       this.timeToAnswer = 20000;//Tiempo de responder por defecto (20sec)

       this.idioma = null;
    

  }


  async fetchQuestions() {
    if(this.idioma === null || this.idioma === undefined)
      this.idioma = 'en';
    console.log("entra en fetchQuestions valor idioma "+this.idioma);
    try {
      const response = await fetch(`${this.apiEndpoint}/getQuestionModoBasico?idioma=${this.idioma}`);
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
    this.blockComponent(0,'dark-mode-switch', true);
    this.blockComponent(1,'change-language-button', true);
  }

  async endGame() {
    console.log('endGameeeeeeeeee');
    this.isGameEnded = true;
    this.questionIndex=0;
    this.blockComponent(0,'dark-mode-switch', true);
    this.blockComponent(1,'change-language-button', true);

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

      Swal.fire({
        title: i18n.t('basicGameEnd'),
        html: `
          <p>: ${i18n.t('correctAnswers')} ${this.correctas}</p>
          <p>${i18n.t('wrongAnswers')} ${this.incorrectas}</p>
          <p>${i18n.t('timePlayed')} ${this.tiempoTotal}</p>
        `,
        confirmButtonText: i18n.t('close')
      }).then(()=>{

          this.navigate('/home');
        
      });
  
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
    if(this.questions.length === 0){
      console.log("no se tiene seguiente preungta , el array es vaicio");
      return; // Salir del método si no hay preguntas
    }
    this.isLoading = true;
    if (this.questionIndex >=9) {
      console.log("fin juego");
      this.finishGame();
      //devuelve las ultima pregunta
      return this.questions[this.questions.length-1];
    } else {
      // Incrementar this.questionIndex después de comprobar si has llegado a la última pregunta
      this.questionIndex++;
      const currentQuestion = this.getCurrentQuestion();
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

  incrementCorrectas(){
    this.correctas++;
  }

  incrementIncorrectas(){
    this.incorrectas++;
  }

  setTiempoTotal(time){
    this.tiempoTotal=time;
  }
  //Paso el id y un booleano true si queremos que quede bloqueado o false para desbloquear (disabled solo funciona para inputs creo)
  //El tipo es porque necesito diferente comportamiento entre el switch que es input y el button
  blockComponent(typeComponent,componentId, putBlocked){
    switch(typeComponent){
      case 0://Switch oscuro claro
        // Esto para desbloquear el darkMode
        const switchToBlock = document.getElementById('dark-mode-switch');
        //Si existe el componente lo deshabilita
        if (switchToBlock) {
          switchToBlock.disabled = putBlocked;
        }
        break;
      case 1://Traductor
        const tradToBlock = document.getElementById('change-language-button');
        if (tradToBlock) {
          tradToBlock.setAttribute('inGame', putBlocked);
        }
        break;
      default:
        console.log('No se ha pasado un tipo de componente correcto');
        break;
      }
    }

}

export default BasicGame;