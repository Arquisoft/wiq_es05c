const { Server } = require("socket.io");
const axios = require('axios');

const questionServiceUrl = process.env.QUESTION_SERVICE_URL || 'http://localhost:8003';

class RoomQuestions{
    constructor(io){
        this.rooms = new Map();
        this.io = io;
    }
    async joinRoom(id, username) {
  
        try {
          if (id != null && id !== undefined) {
            if (this.rooms.has(id)) { // Verifica si la sala existe
              let userList = this.rooms.get(id);
              userList.push(username);
              this.rooms.set(id, userList);
              console.log("Rooms after adding: " + JSON.stringify([...this.rooms])); // mostrar los usuarios de la sala 
              //this.io.to(id).emit('questions', questions);
    
              // Emitir evento 'roomCreated' con el ID de la sala
              this.io.emit('roomJoined', id);

            } else {
              throw new Error("la sala no existe ");
            }
          } else {
            throw new Error("ID de sala inválido");
          }
        } catch (error) {
          console.log(error);
        }
      }

    async createRoom(username){
        console.log("entraCrearRoom");
        try{
            let id=this.generateRandomInteger(1000,9999);
            this.rooms.set(id.toString(),[username]);//agregar al usuario a la sala 
            console.log( "Room created");
            // Emitir evento 'roomListUpdated' a todos los clientes
            //this.io.emit('roomListUpdated', [...this.rooms]);
            
            // Emitir evento 'roomCreated' con el ID de la sala
            this.io.emit('roomCreated', id);
            return id.toString(); // no haria falta 
          }catch(error){
            console.log(error);
            return "Error al crear la sala"; // Devuelve un mensaje de error

        }
    }
    /**
     * funcion empieza el juego para todos los usuersz 
     */
    async startGame(id, username, res) {
        try {
          if (this.checkEnoughPlayers(id) && this.rooms.get(id).includes(username)) {
            let preguntas =await axios.get(questionServiceUrl+'/getQuestionModoBasico');
            io.to(id).emit('startGame', preguntas);
            res.json({ success: true });
          } else {
            throw new Error('Error al iniciar el juego en la sala');
          }
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: error.message });
        }
      }
    //compreuba si hay suficientes jugadores para comenzar el juego min 2 
    checkEnoughPlayers(id){
        let userList = this.rooms.get(id);
        return userList.length>=2;
    }

    generateRandomInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}
module.exports=RoomQuestions;