import React from 'react';
import { render } from '@testing-library/react';
import EnunciadoBlock from './EnunciadoBlock';

describe('EnunciadoBlock component', () => {
  it('should render correctly', () => {
    // Arrange
    const pregunta = 'What is the capital of France?';

    // Act
    const { getByText } = render(<EnunciadoBlock pregunta={pregunta} />);
    const preguntaElement = getByText(pregunta);

    // Assert
    expect(preguntaElement).toBeInTheDocument();
  });

  it('should have the correct styling', () => {
    // Arrange
    const pregunta = 'What is the capital of France?';

    // Act
    const { getByText } = render(<EnunciadoBlock pregunta={pregunta} />);
    const preguntaElement = getByText(pregunta);

    // Assert
    expect(preguntaElement).toHaveStyle(`
      borderBottom: 0.1em solid #000;
      fontSize: 1.5em;
      color: #FCFAF0;
      fontWeight: bolder;
      flex: 2;
    `);
  });
});