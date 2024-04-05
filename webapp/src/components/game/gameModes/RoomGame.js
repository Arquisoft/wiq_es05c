import Swal from 'sweetalert2';
import BasicGame from '../BasicGame';
/*
los sockets estan en room.js le pasas un objjeto con las funciones necesarias para que el juego funcione
que son el fetchquestions y el endgame

*/
class RoomGame extends BasicGame {
    constructor(room) {
      super();
      this.room = room;
      this.winner=room.winner;
    }
  
    async fetchQuestions() {
      this.questions = this.room.getQuestions();
    }
  
    async endGame() {
      console.log('RoomGame endGame');
      this.isGameEnded = true;
      this.questionIndex = 0;
      this.room.endGame({ correctas: this.correctAnswers, incorrectas: this.incorrectAnswers, tiempoTotal: this.totalTime });
  
      // Muestra el cuadro de diálogo aquí
      // Puedes utilizar un paquete como sweetalert2 para mostrar el cuadro de diálogo
      Swal.fire({
        title: 'Juego terminado',
        text: `El ganador es ${this.room.winner}`,
        confirmButtonText: 'Cerrar'
      });
    }
  }
  export default RoomGame;