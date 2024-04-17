import { render, screen, act } from '@testing-library/react';
import { GameTimer } from './GameTimer';

describe('GameTimer', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('renders the initial timer value', () => {
    render(<GameTimer darkMode={false} isFinished={false} setTotalTime={() => {}} />);
    const timerElement = screen.getByText(/0/i);
    expect(timerElement).toBeInTheDocument();
  });

  test('updates the timer value every second', () => {
    render(<GameTimer darkMode={false} isFinished={false} setTotalTime={() => {}} />);
    const timerElement = screen.getByText(/0/i);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(timerElement).toHaveTextContent('1');

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(timerElement).toHaveTextContent('3');
  });

  test('stops the timer when the game is finished', () => {
    const setTotalTimeMock = jest.fn();
    render(<GameTimer darkMode={false} isFinished={true} setTotalTime={setTotalTimeMock} />);

    expect(setTotalTimeMock).toHaveBeenCalledWith(0);
  });
});