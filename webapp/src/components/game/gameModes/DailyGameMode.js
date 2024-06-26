import BasicGame from "../BasicGame";

//const { default: GameMode } = require("./GameMode");
import Swal from 'sweetalert2';
import i18n from 'i18next'; // Importa i18n

class DailyGameMode extends BasicGame{

    constructor() {
      super();
      this.enviarHistorialPorQueHasAcetado=false;
      console.log("entra en dailygamemode");
      this.fechaAct = this.fechaActual();
    }
   
    async fetchQuestions() {
        try {
          const response = await fetch(`${this.apiEndpoint}/getQuestionDiaria?idioma=${this.idioma}&fecha=${this.fechaAct}`);
          const data = await response.json();
      
          this.questions = Object.values(data);
          this.isLoading = false;
      
        } catch (error) {
          console.error('Error fetching question data:', error);
        }
        return this.questions;
      }
      async sendHistorial() {
        const historyData = {
          user: null,
        };
        console.log("enviar historial gameMode daily ");
        //sacar del localStorage el usuario
        historyData.user = localStorage.getItem('username');

      
      }

      async incrementAcertadas(){
        try {
          const volverJugarData = {
            user: null,
            fecha : this.fechaAct
          };
          //sacar del localStorage el usuario
          volverJugarData.user = localStorage.getItem('username');
          console.log("enviar historial trycatch");
          const response = await fetch(`${this.apiEndpoint}/updateHistoryDiaria`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(volverJugarData)
          });
          const data = await response.json();
          console.log('Historial enviado:', data);
          window.location.href = '/home';

        } catch (error) {
          console.error('Error enviando historial:', error);
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

      //nectquestion con indice 10 termina el juego 

      incrementIncorrectas(){
        console.log("incrementa incorrectas");
        this.incorrectas++;
        super.finishGame();
        //this.questionIndex=10;
        this.volverAJugarCoockie();


      }
      
      //next question con indice 10 termina el juego 
      async incrementCorrectas(){
        await this.incrementAcertadas();
        this.enviarHistorialPorQueHasAcetado=true;
        this.correctas++;
        //this.questionIndex=10;
        super.finishGame();
        //this.sendHistorial();
        this.volverAJugarCoockie();
      }

      async volverAJugarCoockie(){       
        this.imprimirPopUP();

        // Obtener la fecha actual y establecer la hora a las 12 de la noche
        let expiryDate = new Date();
        expiryDate.setHours(24, 0, 0, 0);

        // Almacenar la variable en localStorage con la fecha de caducidad
        localStorage.setItem('lastDailyGame', JSON.stringify({
          value: 'valor que quieras almacenar',
          expiry: expiryDate.getTime(),
        }));

        console.log("localStorage" + localStorage.getItem('lastDailyGame'));

        try {
          console.log("entra en el try");
          const volverJugarData = {
            user: null,
            fecha : this.fechaAct
          };
          //sacar del localStorage el usuario
          volverJugarData.user = localStorage.getItem('username');

          const response = await fetch(`${this.apiEndpoint}/updateUserDaily`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(volverJugarData)
          });
          const data = await response.json();
          console.log('Datos enviados:', data);

        } catch (error) {
          console.error('Error enviando los datos de diaria del usuario:', error);
        }
      }

    imprimirPopUP(){
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
    
    fechaActual(){ 
        const fecha = new Date(); // Obtenemos la fecha actual
        // como nos da tambien la hora y no queremos eso, la eliminamos
        const año = fecha.getFullYear();
        const mes = fecha.getMonth() + 1;
        const dia = fecha.getDate();
        // Formateamos la fecha para que sea compatible con la base de datos
        const fechaSinHora = `${año}-${mes < 10 ? '0' : ''}${mes}-${dia < 10 ? '0' : ''}${dia}`;
        return fechaSinHora;
    }
}
export default DailyGameMode ;