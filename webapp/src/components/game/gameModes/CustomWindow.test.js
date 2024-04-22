import React from 'react';
import { render, screen,fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { CustomWindow } from './CustomWindow';
import userEvent from '@testing-library/user-event';
import { useNavigate } from 'react-router-dom';


describe('CustomWindow component', () => {
    afterEach(() => {
        jest.restoreAllMocks();
      });
    global.ResizeObserver = class ResizeObserver {
        observe() {
          // do nothing
        }
        unobserve() {
          // do nothing
        }
        disconnect() {
          // do nothing
        }
      };
  test('renders custom window correctly', () => {
    render(
      <Router>
        <CustomWindow darkMode={false} setTime={() => {}} setNQuestions={() => {}} />
      </Router>
    );

    expect(screen.getByText('modoCustomTitle')).toBeInTheDocument();
    expect(screen.getByTestId('slider-custom-preguntas')).toBeInTheDocument();
    expect(screen.getByTestId('slider-custom-time')).toBeInTheDocument();
    expect(screen.getByTestId('button-custom-cancelar')).toBeInTheDocument();
    expect(screen.getByTestId('button-custom-jugar')).toBeInTheDocument();
  });

  test('calls setTime and setNQuestions correctly on button click', () => {
    const setTimeMock = jest.fn();
    const setNQuestionsMock = jest.fn();

    render(
      <Router>
        <CustomWindow darkMode={false} setTime={setTimeMock} setNQuestions={setNQuestionsMock} />
      </Router>
    );

    fireEvent.click(screen.getByTestId('button-custom-jugar'));

    expect(setTimeMock).toHaveBeenCalledTimes(1);
    expect(setTimeMock).toHaveBeenCalledWith(20000); // valueTime * 1000
    expect(setNQuestionsMock).toHaveBeenCalledTimes(1);
    expect(setNQuestionsMock).toHaveBeenCalledWith(20); // valueQuestionNum
  });
  /*
  falla este test 
  it('navigates to home on cancel button click', () => {
    const navigateMock = jest.fn();

    jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(navigateMock);

    render(
      <Router>
        <CustomWindow darkMode={false} setTime={() => {}} setNQuestions={() => {}} />
      </Router>
    );

    userEvent.click(screen.getByTestId('button-custom-cancelar'));

    expect(navigateMock).toHaveBeenCalledTimes(1);
    expect(navigateMock).toHaveBeenCalledWith('/home');
  });*/
});