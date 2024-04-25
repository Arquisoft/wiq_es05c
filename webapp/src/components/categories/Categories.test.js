import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Categories from './Categories';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

test('navigates when buttons are clicked', () => {
  const navigate = jest.fn();
  useNavigate.mockReturnValue(navigate);

  const { getByText } = render(
    <Router>
      <Categories />
    </Router>
  );

  fireEvent.click(getByText('categoryGeography'));
  expect(navigate).toHaveBeenCalledWith('/gameSameCat/geografia');

  fireEvent.click(getByText('categoryArt'));
  expect(navigate).toHaveBeenCalledWith('/gameSameCat/arte');
  
  fireEvent.click(getByText('categoryEntertainment'));
  expect(navigate).toHaveBeenCalledWith('/gameSameCat/entretenimiento');

  fireEvent.click(getByText('categorySports'));
  expect(navigate).toHaveBeenCalledWith('/gameSameCat/deportes');

  fireEvent.click(getByText('categoryHistory'));
  expect(navigate).toHaveBeenCalledWith('/gameSameCat/historia');

  fireEvent.click(getByText('categoryScience'));
  expect(navigate).toHaveBeenCalledWith('/gameSameCat/ciencia');

  fireEvent.click(getByText('categoryMusic'));
  expect(navigate).toHaveBeenCalledWith('/gameSameCat/musica');
});