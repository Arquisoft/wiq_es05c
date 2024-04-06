import Swal from 'sweetalert2';
import BasicGame from '../BasicGame';
/*
los sockets estan en room.js le pasas un objjeto con las funciones necesarias para que el juego funcione
que son el fetchquestions y el endgame

*/
class RoomGame extends BasicGame {
    constructor(room,navigate) {
      super();
      this.room = room;
      this.winner=room.winner;
      this.navigate=navigate;
    }
  
    async fetchQuestions() {
      this.questions = this.room.getQuestions();
    }
    async sendHistory(){
        console.log("no se envia el historial");
        return;
    }
  
    async endGame() {
      //this.navigate('/home');

      console.log('RoomGame endGame');
      this.isGameEnded = true;
      //this.questionIndex = 0;
      //this.room.endGame({ correctas: this.correctAnswers, incorrectas: this.incorrectAnswers, tiempoTotal: this.totalTime });
  
      // Muestra el cuadro de diálogo aquí
      // Puedes utilizar un paquete como sweetalert2 para mostrar el cuadro de diálogo
      Swal.fire({
        title: 'Esperando al resto de jugadores',
        text: `Esperando a que el resto de jugaores terminen la partida `,
        confirmButtonText: 'Cerrar'
      });
    }

    finishGame(){
        this.isGameEnded = true;
        this.endGame();
      }
  }
  export default RoomGame;