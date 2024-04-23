import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Timer } from './Timer';
import { useColorModeValue } from '@chakra-ui/react';

jest.mock('@chakra-ui/react', () => ({
  ...jest.requireActual('@chakra-ui/react'),
  useColorModeValue: jest.fn(),
}));

describe('Timer', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    useColorModeValue.mockImplementation(() => 'red.400');
  });

  afterEach(() => {
    jest.useRealTimers();
    useColorModeValue.mockReset();
  });


  test('renders the timer component', () => {
    const resetTimer = React.createRef();
    render(<Timer resetTimer={resetTimer} darkMode={{ darkMode: false }} />);
    const timerElement = screen.getByRole('progressbar');
    expect(timerElement).toBeInTheDocument();
});

  test('calls onTimeout when the timer reaches 0', () => {
    const onTimeout = jest.fn();
    const resetTimer = React.createRef();
    render(<Timer onTimeout={onTimeout} resetTimer={resetTimer} timeout={5000} darkMode={{ darkMode: false }}/>);
    act(() => {
      jest.advanceTimersByTime(5000);
    });
    expect(onTimeout).toHaveBeenCalled();
  });


  test('stops the timer when gameFinish is true', () => {
    const resetTimer = React.createRef();
    const { rerender } = render(<Timer resetTimer={resetTimer} timeout={5000} darkMode={{ darkMode: false }} gameFinish={false} />);
    act(() => {
      jest.advanceTimersByTime(2500);
    });
    rerender(<Timer resetTimer={resetTimer} timeout={5000} darkMode={{ darkMode: false }} gameFinish={true} />);
    act(() => {
      jest.advanceTimersByTime(2500);
    });
    const timerElement = screen.getByRole('progressbar');
    expect(timerElement).toHaveAttribute('aria-valuenow', '100');
});


  test('renders with diferent timeout if indicated', () => {
    const resetTimer = {current: null};
    render(<Timer timeout={15000} resetTimer={resetTimer} darkMode={{darkMode: false}} gameFinish={false} darkMode={false}/>);

    expect(screen.getByText('15s')).toBeInTheDocument();});
    
});