import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { QuestionArea } from './QuestionArea';

describe('QuestionArea component', () => {
  let mock;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.restore();
  });

  it('should render loading message while fetching data', async () => {
    // Arrange
    mock.onGet('http://localhost:8000/getQuestion').reply(200, {});

    // Act
    render(<QuestionArea />);

    // Assert
    expect(screen.getByText('Cargando...')).toBeInTheDocument();
  });

  it('should render question and answers when data is fetched', async () => {
    // Arrange
    const data = {
      pregunta: 'What is the capital of France?',
      correcta: 'Paris',
      respuestasIncorrecta1: 'London',
      respuestasIncorrecta2: 'Berlin',
      respuestasIncorrecta3: 'Madrid',
    };
    mock.onGet('http://localhost:8000/getQuestion').reply(200, data);

    // Act
    render(<QuestionArea />);

    // Assert
    await waitFor(() => {
      expect(screen.getByText(data.pregunta)).toBeInTheDocument();
      expect(screen.getByText(data.respuestasIncorrecta1)).toBeInTheDocument();
      expect(screen.getByText(data.respuestasIncorrecta2)).toBeInTheDocument();
      expect(screen.getByText(data.respuestasIncorrecta3)).toBeInTheDocument();
    });
  });

  it('should handle error when fetching data', async () => {
    // Arrange
    mock.onGet('http://localhost:8000/getQuestion').reply(500);

    // Act
    render(<QuestionArea />);

    // Assert
    await waitFor(() => {
      expect(screen.getByText('Error fetching question data:')).toBeInTheDocument();
    });
  });
});