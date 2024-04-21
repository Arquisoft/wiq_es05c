import { render, screen, waitFor } from "@testing-library/react";
import Game from "./Game";
import BasicGame from './BasicGame';
import { BrowserRouter as Router} from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { act } from '@testing-library/react'; // no olvides importar act

const mockedDarkMode = { darkMode: false };

// Mocked implementation for useTranslation hook
jest.mock('react-i18next', () => ({
    useTranslation: () => ({ i18n: { language: 'en' } }),
  }));  

describe("Game", () => {
  it("starts the game correctly", async () => {
    // Mock the necessary dependencies and setup initial state
    let game = new BasicGame();
    game.navigate = jest.fn();
    game.i18n = { language: 'en' };
    game.startGame = jest.fn(); 
    game.getCurrentQuestion = jest.fn().mockReturnValue(
        {pregunta:"¿Cual es la capital de Francia?",correcta:"Paris",respuestasIncorrecta1:"Berlin",respuestasIncorrecta2:"Madrid",respuestasIncorrecta3:"Londres"}
      );

    game.questions = [
        {pregunta:"¿Cual es la capital de Francia?",correcta:"Paris",respuestasIncorrecta1:"Berlin",respuestasIncorrecta2:"Madrid",respuestasIncorrecta3:"Londres"},
        {pregunta:"¿Cual es la capital de Alemania?",correcta:"Berlin",respuestasIncorrecta1:"Paris",respuestasIncorrecta2:"Madrid",respuestasIncorrecta3:"Londres"},
        {pregunta:"¿Cual es la capital de España?",correcta:"Madrid",respuestasIncorrecta1:"Berlin",respuestasIncorrecta2:"Paris",respuestasIncorrecta3:"Londres"}
      ];

    game.fetchQuestions = jest.fn().mockResolvedValue([
        {pregunta:"¿Cual es la capital de Francia?",correcta:"Paris",respuestasIncorrecta1:"Berlin",respuestasIncorrecta2:"Madrid",respuestasIncorrecta3:"Londres"},
        {pregunta:"¿Cual es la capital de Alemania?",correcta:"Berlin",respuestasIncorrecta1:"Paris",respuestasIncorrecta2:"Madrid",respuestasIncorrecta3:"Londres"},
        {pregunta:"¿Cual es la capital de España?",correcta:"Madrid",respuestasIncorrecta1:"Berlin",respuestasIncorrecta2:"Paris",respuestasIncorrecta3:"Londres"}
      ]);

      await act(async () => {
        render(
          <Router>
            <ChakraProvider>
              <Game darkMode={mockedDarkMode} gameMode={game} />
            </ChakraProvider>
          </Router>
        );
      });

    // Verify that the necessary functions are called and state is updated correctly
    expect(game.isLoading).toBe(false);
    await waitFor(() => expect(game.startGame).toHaveBeenCalled());
    expect(game.getCurrentQuestion).toHaveBeenCalled();
    expect(game.isLoading).toBe(false);
    expect(screen.getByText("¿Cual es la capital de Francia?")).toBeInTheDocument();
  });

  /*
  it("handles error when loading questions", async () => {

    // Mock the necessary dependencies and setup initial state
    let game = new BasicGame();
    game.navigate = jest.fn();
    game.i18n = { language: 'en' };
    game.startGame = jest.fn().mockRejectedValue('Error'); 
    game.questions = [];
    game.getCurrentQuestion = jest.fn().mockReturnValue(null);
        
    // Mock window.alert
    await act(async () => {
        render(
            <Router>
                <ChakraProvider>
                <Game darkMode={mockedDarkMode} gameMode={game} />
                </ChakraProvider>
            </Router>
        ); 
        
        expect(game.isLoading).toBe(false);
        expect(game.questions.length).toBe(0);     
    }); 
   
  });
    */ 
});