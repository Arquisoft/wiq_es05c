import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router, useNavigate } from 'react-router-dom';
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

  const categories = [
    { name: 'categoryGeography', path: '/gameSameCat/geografia' },
    { name: 'categoryArt', path: '/gameSameCat/arte' },
    { name: 'categoryEntertainment', path: '/gameSameCat/entretenimiento' },
    { name: 'categorySports', path: '/gameSameCat/deportes' },
    { name: 'categoryHistory', path: '/gameSameCat/historia' },
    { name: 'categoryScience', path: '/gameSameCat/ciencia' },
    { name: 'categoryMusic', path: '/gameSameCat/musica' }
  ];
  
  categories.forEach(category => {
    fireEvent.click(getByText(category.name));
    expect(navigate).toHaveBeenCalledWith(category.path);
  });
});