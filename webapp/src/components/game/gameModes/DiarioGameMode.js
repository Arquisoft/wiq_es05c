const { default: BasicGame } = require("../BasicGame");

class DiaroGameMode extends BasicGame{
    constructor(timeCustom, numQuestionCustom){
        super();
        this.timeToAnswer = timeCustom; 
        this.numQuestions = numQuestionCustom;
    }
   
    async fetchQuestions() {
        try {
          const response = await fetch(`${this.apiEndpoint}/getQuestionModoCustom?numPreguntas=${this.numQuestions}`);
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
module.exports = DiaroGameMode;
