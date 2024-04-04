// GameMode.js
/*
interfaz con lo necesario para que un modo de juego funcione
*/

class GameMode {
    constructor() {
        this.questions=[];
        this.isLoading=false;
        this.apiEndpoint = process.env.REACT_APP_API_URI || 'http://localhost:8000';
        this.isGameEnded=false;
        this.questionIndex=0;
        this.timeToAnswer=20000;
    }
   async fetchQuestions() {
      throw new Error("Method 'fetchQuestions' must be implemented.");
    }
    async startGame() {
      throw new Error("Method 'startGame' must be implemented.");
    }
    async endGame() {
      throw new Error("Method 'endGame' must be implemented.");
    }
    async sendHistory() {
      throw new Error("Method 'sendHistory' must be implemented.");
    }
    /*
    hace lo necesario en la pregunta actual y pasa a la la siguiente pregunta
    pasa a la siguiente pregunta
    */
    nextQuestion(){
        throw new Error("Method 'nextQuestion' must be implemented.");
    }
    async  getCurrentQuestion(){}
    
  }
  
  export default GameMode;