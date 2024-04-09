const { default: BasicGame } = require("../BasicGame");
const { default: GameMode } = require("./GameMode");

class InfinityGameMode extends BasicGame{
    constructor(){
        super();
    }
   
    async fetchQuestions() {
        try {
          const response = await fetch(`${this.apiEndpoint}/getQuestion`);
          const data = await response.json();
      
          this.questions = Object.values(data);
          this.isLoading = false;
      
        } catch (error) {
          console.error('Error fetching question data:', error);
        }
        return this.questions;
      }

      async sendHistory(historyData) {
        //No se guarda la partida si no es clásica
      }
    
   
}

module.exports =  InfinityGameMode ;