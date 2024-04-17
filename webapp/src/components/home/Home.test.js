import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Home from './Home';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

test('navigates when buttons are clicked', () => {
  const navigate = jest.fn();
  useNavigate.mockReturnValue(navigate);

  const { getByText } = render(
    <Router>
      <Home />
    </Router>
  );

  fireEvent.click(getByText('modoClasico'));
  expect(navigate).toHaveBeenCalledWith('/game');

  fireEvent.click(getByText('modoMismaCategoria'));
  expect(navigate).toHaveBeenCalledWith('/gameSameCat');

  fireEvent.click(getByText('modoInfinito'));
  expect(navigate).toHaveBeenCalledWith('/gameInfinity');

  fireEvent.click(getByText('modoCustom'));
  expect(navigate).toHaveBeenCalledWith('/customWindow');

  fireEvent.click(getByText('modoDiario'));
  expect(navigate).toHaveBeenCalledWith('/game');
});