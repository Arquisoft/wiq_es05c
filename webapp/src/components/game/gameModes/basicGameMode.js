import axios from 'axios';

export class BasicGameMode {
  constructor() {
    this.apiEndpoint = process.env.REACT_APP_API_URI || 'http://localhost:8000';
    this.questions=[];
  }

  async fetchQuestions() {
    try {
      const response = await fetch(`${this.apiEndpoint}/getQuestionModoBasico`);
      const data = await response.json();

      this.questions = Object.values(data);
    console.log("questions en fetchQuestions BasicGameMode: ", this.questions);
    } catch (error) {
      console.error('Error fetching question data:', error);
    }
    return this.questions;
  }
  
};
