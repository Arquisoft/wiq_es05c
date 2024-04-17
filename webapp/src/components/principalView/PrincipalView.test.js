import { render, screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../internacionalizacion/i18n'; // Asume que tienes un archivo i18n.js para la configuración de i18next
import PrincipalView from './PrincipalView';

describe('PrincipalView', () => {
  test('renders correctly in light mode', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <PrincipalView darkMode={{ darkMode: false }} />
      </I18nextProvider>
    );

    expect(screen.getByText("WIQ_ES05C")).toBeInTheDocument(); // Asume que el idioma es inglés
    expect(screen.getByText("Nuestro grupo: como y después el juego")).toBeInTheDocument();
    expect(screen.getByText("Bienvenido a nuestro juego de preguntas")).toBeInTheDocument();
    expect(screen.getByText("Somos un equipo de desarrolladores apasionados por los juegos de preguntas.")).toBeInTheDocument();
    expect(screen.getByText("En este juego, te desafiamos a responder una serie de preguntas aleatorias de diferentes categorías. Ofrecemos varios modos de juego para mantener las cosas interesantes. ¡Buena suerte!")).toBeInTheDocument();
  });

  test('renders correctly in dark mode', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <PrincipalView darkMode={{ darkMode: true }} />
      </I18nextProvider>
    );

    expect(screen.getByText("WIQ_ES05C")).toBeInTheDocument(); // Asume que el idioma es inglés
    expect(screen.getByText("Nuestro grupo: como y después el juego")).toBeInTheDocument();
    expect(screen.getByText("Bienvenido a nuestro juego de preguntas")).toBeInTheDocument();
    expect(screen.getByText("Somos un equipo de desarrolladores apasionados por los juegos de preguntas.")).toBeInTheDocument();
    expect(screen.getByText("En este juego, te desafiamos a responder una serie de preguntas aleatorias de diferentes categorías. Ofrecemos varios modos de juego para mantener las cosas interesantes. ¡Buena suerte!")).toBeInTheDocument();
  });
});