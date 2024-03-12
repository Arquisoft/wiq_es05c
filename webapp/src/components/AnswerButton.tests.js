import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import AnswerButton from './AnswerButton';
import { Button } from '@chakra-ui/react';

describe('AnswerButton component', () => {
  it('should render correctly', () => {
    // Arrange
    const text = 'Answer';
    const colorFondo = '#A06AB4';
    const onClick = jest.fn();

    // Act
    const { getByText } = render(
      <AnswerButton text={text} colorFondo={colorFondo} onClick={onClick} />
    );
    const buttonElement = getByText(text);

    // Assert
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveStyle(`background-color: ${colorFondo}`);
  });

  it('should call onClick when clicked', () => {
    // Arrange
    const text = 'Answer';
    const colorFondo = '#A06AB4';
    const onClick = jest.fn();

    // Act
    const { getByText } = render(
      <AnswerButton text={text} colorFondo={colorFondo} onClick={onClick} />
    );
    const buttonElement = getByText(text);
    fireEvent.click(buttonElement);

    // Assert
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});