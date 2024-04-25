
const { default: BasicGame } = require("../BasicGame");

class SameCategoryMode extends BasicGame{

  constructor(category){
    super();
    this.category = category;
  }

    async fetchQuestions() {
        try {
          const response = await fetch(`${this.apiEndpoint}/getQuestionModoMismaCategoria?idioma=${this.idioma}&categoria=${this.category}`);
          const data = await response.json();
      
          this.questions = Object.values(data);
          this.isLoading = false; // Mover esta línea aquí
      
        } catch (error) {
          console.error('Error fetching question data:', error);
        }
        return this.questions;
      }

      async sendHistory(historyData) {
        //No se guarda la partida si no es clásica
      }
}
module.exports =  SameCategoryMode ;