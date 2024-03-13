import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Game from './Game';
import { ChakraProvider } from '@chakra-ui/react';


describe('Game component', () => {
  it('should render correctly', () => {
    render(
        <ChakraProvider>
          <Game />
        </ChakraProvider>
      );
    
    // Verificar que el componente QuestionArea se renderice dentro de Game
    waitFor(() => {
        const questionAreaElement = screen.getByTestId('question-area');
        expect(questionAreaElement).toBeInTheDocument();
    });
  });
});