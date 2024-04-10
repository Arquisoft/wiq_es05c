const { default: BasicGame } = require("../BasicGame");

class SameCategoryMode extends BasicGame{
  constructor(){
    super();
}
    async fetchQuestions() {
        try {
        //getQuestionModoMismaCategoria?idioma=${idioma}?=categoria=${categoria}
          const response = await fetch(`${this.apiEndpoint}/getQuestionModoMismaCategoria`);
          const data = await response.json();
      
          this.questions = Object.values(data);
          this.isLoading = false; // Mover esta línea aquí
      
        } catch (error) {
          console.error('Error fetching question data:', error);
        }
        return this.questions;
      }
}
module.exports =  SameCategoryMode ;