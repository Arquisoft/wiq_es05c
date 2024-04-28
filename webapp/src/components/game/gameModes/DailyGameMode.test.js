import DailyGameMode from './DailyGameMode';
import axios from 'axios';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthContext } from '../../authcontext';
import { ThemeProvider,createTheme } from '@mui/material/styles';

jest.mock('axios');
describe('DailyGameMode', () => {
  let dailyGameMode;

  const theme = createTheme({
    spacing: 4,
  });
  axios.post.mockResolvedValue({
    data: {
      token: 'test-token',
      username: 'test-username',
      lastDailyGame: 'test-lastDailyGame',
    },
  });
  beforeEach(() => {
    dailyGameMode = new DailyGameMode();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch questions successfully', async () => {
    const mockData = {
      question1: {
        id: 1,
        text: 'Question 1',
      },
      question2: {
        id: 2,
        text: 'Question 2',
      },
    };

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    const questions = await dailyGameMode.fetchQuestions();

    expect(global.fetch).toHaveBeenCalledWith(`${dailyGameMode.apiEndpoint}/getQuestionDiaria?idioma=${dailyGameMode.idioma}&fecha=${dailyGameMode.fechaAct}`);
    expect(questions).toEqual(Object.values(mockData));
    expect(dailyGameMode.isLoading).toBe(false);
  });

  it('should handle error when fetching questions', async () => {
    const mockError = new Error('Failed to fetch questions');

    global.fetch = jest.fn().mockRejectedValue(mockError);
    console.error = jest.fn();

    const questions = await dailyGameMode.fetchQuestions();

    expect(global.fetch).toHaveBeenCalledWith(`${dailyGameMode.apiEndpoint}/getQuestionDiaria?idioma=${dailyGameMode.idioma}&fecha=${dailyGameMode.fechaAct}`);
    expect(questions).toEqual([]);
    expect(console.error).toHaveBeenCalledWith('Error fetching question data:', mockError);
  });

  it('should send historial correctly', async () => {
    const mockData = {
      user: 'test-user',
    };
  
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });
  
    localStorage.setItem('username', 'test-user');
    dailyGameMode.enviarHistorialPorQueHasAcetado = true;
  
    await dailyGameMode.sendHistorial();
  
    expect(global.fetch).toHaveBeenCalledWith(`${dailyGameMode.apiEndpoint}/updateHistoryDiaria`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user: 'test-user' })
    });
  });
  
  it('should get current question correctly', () => {
    const mockData = {
      pregunta: 'Question 1',
      correcta: 'Answer 1',
      respuestasIncorrecta1: 'Wrong answer 1',
      respuestasIncorrecta2: 'Wrong answer 2',
      respuestasIncorrecta3: 'Wrong answer 3',
    };
  
    dailyGameMode.questions = [mockData];
  
    const questionData = dailyGameMode.getCurrentQuestion();
  
    expect(questionData).toEqual(mockData);
  });
  
  it('should increment incorrectas correctly', () => {
    dailyGameMode.incrementIncorrectas();
  
    expect(dailyGameMode.incorrectas).toBe(1);
    expect(localStorage.getItem('lastDailyGame')).toBeTruthy();
  });
  
  it('should increment correctas correctly', () => {
    dailyGameMode.incrementCorrectas();
  
    expect(dailyGameMode.correctas).toBe(1);
    expect(dailyGameMode.enviarHistorialPorQueHasAcetado).toBe(true);
    expect(localStorage.getItem('lastDailyGame')).toBeTruthy();
  });
  
  it('should set volverAJugarCoockie correctly', () => {
    dailyGameMode.volverAJugarCoockie();
  
    const diaria = JSON.parse(localStorage.getItem('lastDailyGame'));
  
    expect(diaria.value).toBe('valor que quieras almacenar');
    expect(diaria.expiry).toBeGreaterThan(Date.now());
  });

});