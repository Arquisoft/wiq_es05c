
export class RoomGameMode {
  constructor(questions) {
    this.apiEndpoint = process.env.REACT_APP_API_URI || 'http://localhost:8000';
    this.questions=questions;
  }
  //usado en el modo de sservidor, simplemente recibe las preguntas del servidor 
  async fetchQuestions() {
    return this.questions;
  }
  
};
