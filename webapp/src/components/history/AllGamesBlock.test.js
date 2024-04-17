import { render, screen } from '@testing-library/react';
import { AllGamesBlock } from './AllGamesBlock';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../internacionalizacion/i18n'; // Asume que tienes un archivo i18n.js para la configuración de i18next

describe('AllGamesBlock', () => {
  const games = [
    {
      fecha: '2024-03-20T00:00:00.000Z',
      numeroJuego: 1,
      preguntas_acertadas: 5,
      preguntas_falladas: 3,
      tiempo: '10m'
    },
    {
      fecha: '2024-03-21T00:00:00.000Z',
      numeroJuego: 2,
      preguntas_acertadas: 7,
      preguntas_falladas: 1,
      tiempo: '15'
    }
  ];

  test('renders correctly with games', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <AllGamesBlock darkMode={false} games={games} />
      </I18nextProvider>
    );

    expect(screen.getByText(`${games[0].numeroJuego.toString()}`)).toBeInTheDocument(); 
    expect(screen.getByText(`${games[0].tiempo} segundos`)).toBeInTheDocument(); 
 
    games.forEach(game => {
      expect(screen.getByText(game.numeroJuego.toString())).toBeInTheDocument();
    });
  });

  test('renders correctly without games', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <AllGamesBlock darkMode={false} games={["Error "]} />
      </I18nextProvider>
    );

    expect(screen.getByText("No jugó partidas todavía")).toBeInTheDocument(); // Asume que el idioma es español
  });
});