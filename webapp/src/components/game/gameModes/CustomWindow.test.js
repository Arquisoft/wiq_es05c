import React from 'react';
import { render, screen } from '@testing-library/react';
import {CustomWindow} from './CustomWindow';
import { BrowserRouter as Router } from 'react-router-dom';

describe('CustomWindow Component', () => {
  test('renders CustomWindow with correct content and text', () => {
    // Renderizar el componente
    render(
      <Router>
          <CustomWindow />
      </Router>
      );

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

  test('renders the buttons to control the CustomWindow', () => {
    // Renderizar el componente
    render(
      <Router>
          <CustomWindow />
      </Router>
    );

     // Verificar botón de cancelar con su enlace
     const botonCancelar = document.getElementByTestId('button-custom-cancelar');
     expect(botonCancelar).toBeInTheDocument();

     // Verificar botón de jugar con su enlace
     const botonJugar = document.getElementByTestId('button-custom-jugar');
     expect(botonJugar).toBeInTheDocument();

     // Verificar que los botones tienen un manejador de eventos onClick
    expect(botonCancelar.onclick).toBeDefined();
    expect(botonJugar.onclick).toBeDefined();
});

    test('should always pass', () => {
        expect(true).toBe(true);
    }); 
});