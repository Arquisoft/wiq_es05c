
import { useTranslation } from 'react-i18next';

export class BasicGameMode {
  constructor() {
    this.apiEndpoint = process.env.REACT_APP_API_URI || 'http://localhost:8000';
    this.questions=[];
  }



  async fetchQuestions(idioma) {
    try {
      const response = await fetch(`${this.apiEndpoint}/getQuestionModoBasico?idioma=${idioma}`);
      const data = await response.json();

      this.questions = Object.values(data);
    } catch (error) {
      console.error('Error fetching question data:', error);
    }
    return this.questions;
  }
  
};
