class RoomQuestions{
    constructor(){
        this.rooms = new Map();
    }
    async joinRoom(id, username) {
        console.log("entraJoinRoom id de entrada" + id);
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
            console.log("Rooms after creating: ", JSON.stringify([...this.rooms])); // Imprime el contenido de 'this.rooms'

            return "sala creada correctamente con el id"+id;
        }catch(error){
            console.log(error);
            return "Error al crear la sala"; // Devuelve un mensaje de error

        }
    }
    /**
     * funcion empieza el juego para todos los usuersz 
     */
    startGame(id,username){
        //solamente un solicitante puede empezar el juego 
        if(checkEnoughPlayers(id) && rooms.get(id).includes(username)){
            console.log("Game started");
            return "Juego iniciado";
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