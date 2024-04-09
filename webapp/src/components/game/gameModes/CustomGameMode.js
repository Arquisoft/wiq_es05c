const { default: BasicGame } = require("../BasicGame");

class CustomGameMode extends BasicGame{
    constructor(){
        super();
    }
   
    async fetchQuestions() {
        try {
          const response = await fetch(`${this.apiEndpoint}/getQuestionModoCustom`);
          const data = await response.json();
      
          this.questions = Object.values(data);
          this.isLoading = false;
      
        } catch (error) {
          console.error('Error fetching question data:', error);
        }
        return this.questions;
      }
}

module.exports = CustomGameMode;