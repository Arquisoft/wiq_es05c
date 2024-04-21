import { render, screen, fireEvent } from '@testing-library/react';
import { AnswersBlock } from './AnswersBlock';

describe('AnswersBlock', () => {
  const respuestas = ['respuesta1', 'respuesta2', 'respuesta3', 'respuesta4'];
  const correcta = 'respuesta1';
  const onAnswerSelect = jest.fn();
  const isGameEnded = false;
  const darkMode = { darkMode: false };

  test('renders correctly and calls onAnswerSelect with true when correct answer is clicked', () => {
    render(<AnswersBlock respuestas={respuestas} correcta={correcta} onAnswerSelect={onAnswerSelect} isGameEnded={isGameEnded} darkMode={darkMode} />);

    respuestas.forEach(respuesta => {
      expect(screen.getByText(respuesta)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText(correcta));

    expect(onAnswerSelect).toHaveBeenCalledWith(true);
  });

  test('renders correctly and calls onAnswerSelect with false when incorrect answer is clicked', () => {
    render(<AnswersBlock respuestas={respuestas} correcta={correcta} onAnswerSelect={onAnswerSelect} isGameEnded={isGameEnded} darkMode={darkMode} />);

    respuestas.forEach(respuesta => {
      expect(screen.getByText(respuesta)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('respuesta2'));

    expect(onAnswerSelect).toHaveBeenCalledWith(false);
  });

  test('does not call onAnswerSelect when isGameEnded is true', () => {
    render(<AnswersBlock respuestas={respuestas} correcta={correcta} onAnswerSelect={onAnswerSelect} isGameEnded={true} darkMode={darkMode} />);

    respuestas.forEach(respuesta => {
      expect(screen.getByText(respuesta)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText(correcta));

    expect(onAnswerSelect).not.toHaveBeenCalled();
  });
});