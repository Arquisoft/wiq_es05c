import React from 'react';
import { render, screen } from '@testing-library/react';
import CustomWindow from './CustomWindow';

jest.mock('i18next', () => ({
  use: () => {},
  init: () => {},
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => ({
      'modoCustomTitle': 'Modo Customizado',
      'customModeNumPreguntas': 'Número de Preguntas',
      // Añade aquí las demás cadenas de texto que quieras probar
    })[key],
  }),
}));

describe('CustomWindow Component', () => {
  test('renders CustomWindow with correct content and text', () => {
    // Renderizar el componente
    render(<CustomWindow />);

    // Verificar texto título
    expect(screen.getByText('Modo de juego personalizado')).toBeInTheDocument();

    // Verificar texto primer slider
    expect(screen.getByText('Seleccione el número de preguntas que desea en la partida:')).toBeInTheDocument();

    // Verificar texto segundo slider
    expect(screen.getByText('Seleccione el tiempo que desea de la partida:')).toBeInTheDocument();

    //Presencia de los 2 sliders

    const sliderTime = document.getElementByTestId('slider-custom-time');
    expect(sliderTime).toBeInTheDocument();

    const sliderPreguntas = document.getElementByTestId('slider-custom-preguntas');
    expect(sliderPreguntas).toBeInTheDocument();

    // Añade aquí más expectativas para las demás partes de CustomWindow que quieras probar
  });


  
  // Añade aquí más pruebas si es necesario
});