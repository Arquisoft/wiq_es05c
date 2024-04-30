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
    expect(screen.getByText("Bienvenido a nuestro emocionante juego de preguntas y respuestas en línea, donde podrás poner a prueba tus conocimientos y desafiar a tus amigos en un duelo intelectual")).toBeInTheDocument();
    expect(screen.getByText("Características Principales:")).toBeInTheDocument();
    expect(screen.getByText("Modo Multijugador: Desafía a tus amigos en emocionantes partidas multijugador en tiempo real.")).toBeInTheDocument();
    expect(screen.getByText("Desafíos Diarios: ¡Mantén tu mente afilada con nuestros desafíos diarios!")).toBeInTheDocument();
  });

  test('renders correctly in dark mode', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <PrincipalView darkMode={{ darkMode: true }} />
      </I18nextProvider>
    );

    expect(screen.getByText("WIQ_ES05C")).toBeInTheDocument(); // Asume que el idioma es inglés
    expect(screen.getByText("Bienvenido a nuestro emocionante juego de preguntas y respuestas en línea, donde podrás poner a prueba tus conocimientos y desafiar a tus amigos en un duelo intelectual")).toBeInTheDocument();
    expect(screen.getByText("Características Principales:")).toBeInTheDocument();
    expect(screen.getByText("Modo Multijugador: Desafía a tus amigos en emocionantes partidas multijugador en tiempo real.")).toBeInTheDocument();
    expect(screen.getByText("Desafíos Diarios: ¡Mantén tu mente afilada con nuestros desafíos diarios!")).toBeInTheDocument();
  });
});