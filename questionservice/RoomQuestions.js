class RoomQuestions{
    constructor(question){
        this.question=question;//recibe el generador de preguntas 
        this.rooms = new Map();
    }
    async joinRoom(id, username) {
  
        try {
          if (id != null && id !== undefined) {
            if (this.rooms.has(id)) { // Verifica si la sala existe
              let userList = this.rooms.get(id);
              userList.push(username);
              this.rooms.set(id, userList);
              console.log("Rooms after adding: " + JSON.stringify([...this.rooms])); // mostrar los usuarios de la sala 
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
        console.log("entraRoom");
        try{
            let id=this.generateRandomInteger(1000,9999);
            this.rooms.set(id.toString(),[username]);//agregar al usuario a la sala 
            console.log( "Room created");
            return "sala creada correctamente con el id"+id;
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
            let preguntas = await this.question.obtenerPregunta(10);
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