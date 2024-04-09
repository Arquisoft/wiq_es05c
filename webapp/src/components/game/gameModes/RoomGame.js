import Swal from 'sweetalert2';
import BasicGame from '../BasicGame';

import i18n from 'i18next'; // Importa i18n

/*
los sockets estan en room.js le pasas un objjeto con las funciones necesarias para que el juego funcione
que son el fetchquestions y el endgame

*/
class RoomGame extends BasicGame {
    constructor(room,navigate) {
      console.log('RoomGame constructor', room);
      super();
      this.room = room;
      console.log('RoomGame del constructor', this.room);
      this.winner=room.winner;
      this.navigate=navigate;
      this.questions=[];
    }
  
    startGame() {
      return new Promise(async (resolve, reject) => {
        try {
          this.isLoading = true;
          this.questionIndex = 0;
          console.log('RoomGame startGame', this.room);
    
          // Asegúrate de que getQuestions es una función que devuelve una promesa
          let data = await this.room.getQuestions;
    
          this.questions=Object.values(data);
          console.log('questions:', this.questions); // Añade una declaración de registro para depurar
    
          this.isLoading = false;
    
          // Resuelve la promesa cuando todo ha terminado
          resolve();
        } catch (error) {
          // Si algo sale mal, rechaza la promesa con el error
          reject(error);
        }
      });
    }
    async fetchQuestions() {
      this.questions = this.room.getQuestions();
    }

  
    async sendHistory(historyData) {
      console.log("no se envia historial de este modo");
      return ;
    }
    async endGame() {

      console.log('RoomGame endGame');
      this.isGameEnded = true;
      //emitir el evento y la logica relevante de socket.io le pasas los resultados
   
      let data={
        user:localStorage.getItem('username'),
        correctas:this.correctas,
        incorrectas:this.incorrectas,
        tiempoTotal:this.tiempoTotal
      }
      this.room.endGame(data);
      // Muestra el cuadro de diálogo aquí
      // Puedes utilizar un paquete como sweetalert2 para mostrar el cuadro de diálogo
      Swal.fire({
        title: i18n.t('roomGameWaitPlayersStart'),
        text: i18n.t('roomGameWaitPlayersEnd'),
        confirmButtonText: i18n.t('close')
      });
    }

    finishGame(){
        this.isGameEnded = true;
        this.endGame();
      }

    
  }
  export default RoomGame;