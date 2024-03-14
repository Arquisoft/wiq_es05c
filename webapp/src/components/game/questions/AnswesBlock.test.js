import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import AnswersBlock from './AnswersBlock';
import { Box } from '@chakra-ui/react';

describe('AnswersBlock component', () => {
  it('should render correctly', async () => {
    // Arrange
    const respuestas = ['Answer 1', 'Answer 2', 'Answer 3', 'Answer 4'];
    const correcta = 'Answer 1';

    // Act
    const { getAllByText } = render(
      <AnswersBlock respuestas={respuestas} correcta={correcta} />
    );
    const answerButtons = await waitFor(() => getAllByText(/Answer/));

    // Assert
    expect(answerButtons).toHaveLength(4);
  });

  it('should call handleButtonClick when an answer button is clicked', async () => {
    // Arrange
    const respuestas = ['Answer 1', 'Answer 2', 'Answer 3', 'Answer 4'];
    const correcta = 'Answer 1';
    const handleButtonClick = jest.fn();

    // Act
    const { getAllByText } = render(
      <AnswersBlock respuestas={respuestas} correcta={correcta} />
    );
    const answerButtons = await waitFor(() => getAllByText(/Answer/));
    fireEvent.click(answerButtons[0]); // Click the first answer button

    // Assert
    expect(handleButtonClick).toHaveBeenCalledTimes(1);
    expect(handleButtonClick).toHaveBeenCalledWith(correcta);
  });
});