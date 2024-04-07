const { Server } = require("socket.io");
const axios = require('axios');

const questionServiceUrl = 'http://gatewayservice:8000';

class RoomQuestions{
    constructor(io){
        this.rooms = new Map();
        this.gameResults= new Map();
        this.io = io;
    }
    async joinRoom(id, username, socket) {
      console.log("valores del join room params id "+id+" username "+username+" socket "+socket);
      try {
        if (id && id.trim() !== '') { // Comprueba que la id no sea null, undefined o un string vacío
          if (this.rooms.has(id)) { // Verifica si la sala existe
            let userList = this.rooms.get(id);
            // Verifica si el usuario ya existe en la sala
            if (!userList.includes(username)) {
              userList.push(username);
              this.rooms.set(id, userList);
            }
    
            // Asociar el socket a la sala
            socket.join(id);
            // Emitir evento 'roomJoined' solo al usuario que se acaba de unir a la sala
            socket.emit('roomJoined', id);
            console.log(`Usuario ${username} se ha unido a la sala ${id}`);
          } else {
            console.log(`La sala con id ${id} no existe.`);
            throw new Error("la sala no existe");
           
          }
        }
      } catch (error) {
        console.log(`Error al unirse a la sala: ${error.message}`);
        throw new Error('Error al unirse a la sala:', error);
      }
    }

    async createRoom(username,socket){
        console.log("entraCrearRoom");
        try{
            let id=this.generateRandomInteger(1000,9999);
            this.rooms.set(id.toString(),[username]);//agregar al usuario a la sala 
            console.log( "Room created");
            // Emitir evento 'roomListUpdated' a todos los clientes
            //this.io.emit('roomListUpdated', [...this.rooms]);
            // Emitir evento 'roomCreated' con el ID de la sala
            socket.emit('roomCreated', id);

            //llamar al join para unirte a la sala 
            this.joinRoom(id.toString(), username, socket);



            return id.toString(); // no haria falta 
          }catch(error){
            console.log(error);
            return "Error al crear la sala"; // Devuelve un mensaje de error

        }
    }
    /**
     * funcion empieza el juego para todos los usuersz 
     */
    async startGame(id,socket) {
        try {
          if (this.checkEnoughPlayers(id)) {
            //crear la zona de reusltado se hace aqui para que en caso de que abandonen la sala no se haya creado ya 
            this.gameResults.set(id,new Map());

            let preguntas =await axios.get(questionServiceUrl+'/getQuestionModoBasico');
            console.log("Preguntas: "+preguntas.data);
            socket.emit('gameStarted', preguntas.data);
            socket.to(id).emit('gameStarted', preguntas.data);
            
          } else {
            throw new Error('Error al iniciar el juego en la sala');
          }
        } catch (error) {
          console.error(error);
        }
      }

      //funcion que se encarga de guardarlos datos del usuario finalizado comprobaria si todos han termiando y dar ael ganador 

      async endGame(id,result,socket) {
        console.log("entro en endGame function servidor");
        try {
          // Recuperar el Map de resultados para la sala correspondiente
          let roomResults = this.gameResults.get(id);
      
          // Crear una nueva entrada en este Map para el usuario y guardar sus resultados
          roomResults.set(result.user, {
            correctas: result.correctas,
            incorrectas: result.incorrectas,
            tiempoTotal: result.tiempoTotal
          });
      
          // Comprobar si todos los usuarios de la sala han terminado el juego
          if (roomResults.size === this.rooms.get(id).length) {
            console.log("entreo en el id de emitir el juego terminado");
            // Si todos los usuarios han terminado el juego, determinar quién ha ganado
            let winner = this.determineWinner(roomResults);
            console.log("el ganador determinado es "+winner);
            //hacer uhnjson con el ganador y obtener su tiempo y correctas
            let data={
              winner:winner,
              correctas:roomResults.get(winner).correctas,
              tiempoTotal:roomResults.get(winner).tiempoTotal
            }
            socket.to(id).emit('gameEnded', data); // enviar a todos los de sala quien gano 
            socket.emit('gameEnded', winner); // 
           
          }
        } catch (error) {
          console.error(error);
        }
      }
      
      determineWinner(roomResults) {
        let winner = null;
        let maxCorrectAnswers = 0;
        let minTotalTime = Infinity;
      
        for (let [username, userResults] of roomResults.entries()) {
          if (userResults.correctas > maxCorrectAnswers) {
            maxCorrectAnswers = userResults.correctas;
            minTotalTime = userResults.tiempoTotal;
            winner = username;
          } else if (userResults.correctas === maxCorrectAnswers) {
            if (userResults.tiempoTotal < minTotalTime) {
              minTotalTime = userResults.tiempoTotal;
              winner = username;
            }
          }
        }
      
        return winner;
      }
    //compreuba si hay suficientes jugadores para comenzar el juego min 2 
    checkEnoughPlayers(id){
        let userList = this.rooms.get(id);
        return userList.length>=2;
    }

    generateRandomInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    emitCurrentUsers(id, socket) {
  
      if (this.rooms.has(id)) {
        const usersArray = this.rooms.get(id);
        console.log("Users in room: " + usersArray);
    
        // Convertir la matriz de usuarios en un objeto de usuarios
        const usersObject = usersArray.reduce((obj, user) => {
          obj[user] = {
            presente: true
          };
          return obj;
        }, {});
    
        // Emitir el objeto de usuarios en lugar de la matriz de usuarios
       // Emitir el objeto de usuarios a todos los sockets en la sala
        socket.to(id).emit('currentUsers', usersObject); // Modificado aquí
        socket.emit('currentUsers', usersObject); // 
      } else {
        console.log(`La sala con id ${id} no existe.`);
      }
    }
    getRoomUsers(id) {
      // Check if the room exists
      if (this.rooms.has(id)) {
          // Return the list of users in the room
          return this.rooms.get(id);
      } else {
          // If the room does not exist, return an empty array
          return [];
      }
  }
}
module.exports=RoomQuestions;