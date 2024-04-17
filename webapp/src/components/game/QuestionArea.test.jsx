import { render, fireEvent } from '@testing-library/react';
import { QuestionArea } from './QuestionArea';

describe('QuestionArea', () => {
  it('renders correctly', () => {
    const question = {
      correcta: 'correct answer',
      respuestasIncorrecta1: 'incorrect answer 1',
      respuestasIncorrecta2: 'incorrect answer 2',
      respuestasIncorrecta3: 'incorrect answer 3',
    };

    const { getByText } = render(
      <QuestionArea
        darkMode={false}
        question={question}
        isFinished={false}
        setTotalTime={() => {}}
        timeToAnswer={30000}
        onAnswerSelect={() => {}}
        handleTimeout={() => {}}
      />
    );

    expect(getByText('correct answer')).toBeInTheDocument();
    expect(getByText('incorrect answer 1')).toBeInTheDocument();
    expect(getByText('incorrect answer 2')).toBeInTheDocument();
    expect(getByText('incorrect answer 3')).toBeInTheDocument();
  });

  it('calls onAnswerSelect with correct argument when an answer is clicked', () => {
    const question = {
      correcta: 'correct answer',
      respuestasIncorrecta1: 'incorrect answer 1',
      respuestasIncorrecta2: 'incorrect answer 2',
      respuestasIncorrecta3: 'incorrect answer 3',
    };

    const onAnswerSelect = jest.fn();

    const { getByText } = render(
      <QuestionArea
        darkMode={false}
        question={question}
        isFinished={false}
        setTotalTime={() => {}}
        timeToAnswer={30000}
        onAnswerSelect={onAnswerSelect}
        handleTimeout={() => {}}
      />
    );

    fireEvent.click(getByText('correct answer'));
    expect(onAnswerSelect).toHaveBeenCalledWith(true);

    fireEvent.click(getByText('incorrect answer 1'));
    expect(onAnswerSelect).toHaveBeenCalledWith(false);
  });
});