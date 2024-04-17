import { render, screen } from '@testing-library/react';
import { GameBlock } from './GameBlock';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../internacionalizacion/i18n'; // Asume que tienes un archivo i18n.js para la configuración de i18next

describe('GameBlock', () => {
  const gameInfo = {
    fecha: '2024-03-20T00:00:00.000Z',
    numeroJuego: 1,
    preguntas_acertadas: 5,
    preguntas_falladas: 3,
    tiempo: '10m'
  };

  test('renders correctly', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <GameBlock darkMode={false} gameInfo={gameInfo} />
      </I18nextProvider>
    );

    expect(screen.getByText('Nº')).toBeInTheDocument();
    expect(screen.getByText(gameInfo.numeroJuego.toString())).toBeInTheDocument();
    expect(screen.getByText(`${gameInfo.preguntas_acertadas}/${gameInfo.preguntas_acertadas + gameInfo.preguntas_falladas}`)).toBeInTheDocument();
    expect(screen.getByText(`${gameInfo.preguntas_falladas}/${gameInfo.preguntas_acertadas + gameInfo.preguntas_falladas}`)).toBeInTheDocument();
  });
});