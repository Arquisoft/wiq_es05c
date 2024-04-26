import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router, useNavigate } from 'react-router-dom';
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

  const modes = [
    { name: 'modoClasico', path: '/game' },
    { name: 'modoMismaCategoria', path: '/sameCategoryWindow' },
    { name: 'modoInfinito', path: '/gameInfinity' },
    { name: 'modoCustom', path: '/customWindow' },
    { name: 'modoDiario', path: '/game' } // Este modo comparte la misma ruta que 'modoClasico'
  ];
  
  modes.forEach(mode => {
    fireEvent.click(getByText(mode.name));
    expect(navigate).toHaveBeenCalledWith(mode.path);
  });
});