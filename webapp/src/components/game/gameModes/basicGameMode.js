import axios from 'axios';

const apiEndpoint = process.env.REACT_APP_API_URI ||'http://localhost:8000';

const BasicGameMode = {
  url: apiEndpoint+'/getQuestionModoBasico',
  questions: [],
  async fetchQuestions() {
    console.log('obtieniendo preguntas para el juego modo basico');

    const response = await axios.get(this.url);
    const data = response.data;
    console.log('Response recived Data:', data);


    // Extraer las preguntas del objeto de respuesta
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        this.questions.push(data[key].pregunta);
      }
    }
  }
}
export default BasicGameMode;