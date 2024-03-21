import axios from 'axios';

export class BasicGameMode {
  constructor() {
    this.apiEndpoint = process.env.REACT_APP_API_URI || 'http://localhost:8000';
    this.questions=[];
  }

  async fetchQuestions() {
    try {
      const response = await axios.get(`${this.apiEndpoint}/getQuestion`);
      const data = response.data.resultado1;
      const questionJson = data;
      const correcta = data.correcta;
      const respuestas = [data.correcta, data.respuestasIncorrecta1, data.respuestasIncorrecta2, data.respuestasIncorrecta3];
  
      console.log("Pregunta: ", questionJson);
      console.log("Respuestas: ", respuestas);
      console.log("Correcta: ", correcta);
      return { questionJson, correcta, respuestas };
    } catch (error) {
      console.error('Error fetching question data:', error);
    }
  }
  
};
