// GameMode.js
/*
interfaz con lo necesario para que un modo de juego funcione
*/

class GameMode {
    constructor() {
        this.questions=[];
        this.isLoading=false;
    }
    fetchQuestions() {
      throw new Error("Method 'fetchQuestions' must be implemented.");
    }
    startGame() {
      throw new Error("Method 'startGame' must be implemented.");
    }
    endGame() {
      throw new Error("Method 'endGame' must be implemented.");
    }
    sendHistory() {
      throw new Error("Method 'sendHistory' must be implemented.");
    }
  }
  
  export default GameMode;