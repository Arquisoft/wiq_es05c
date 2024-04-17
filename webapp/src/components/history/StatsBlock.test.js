import { render, screen } from '@testing-library/react';
import { StatsBlock } from './StatsBlock';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../internacionalizacion/i18n'; // Asume que tienes un archivo i18n.js para la configuración de i18next

describe('StatsBlock', () => {
  const playerStats = {
    nombreUsuario: 'testUser',
    tiempoTotal: 3600,
    tiempoMedio: 1800,
    numeroJuegos: 2,
    preguntas_acertadas: 0.75,
    preguntas_falladas: 0.25
  };

  test('renders correctly with playerStats', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <StatsBlock darkMode={false} playerStats={playerStats} />
      </I18nextProvider>
    );

    expect(screen.getByText(`Historial de ${playerStats.nombreUsuario}`)).toBeInTheDocument(); // Asume que el idioma es inglés
    expect(screen.getByText(playerStats.numeroJuegos.toString())).toBeInTheDocument();
  });

  test('renders correctly without playerStats', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <StatsBlock darkMode={false} playerStats={null} />
      </I18nextProvider>
    );

    expect(screen.getByText("No tiene historial")).toBeInTheDocument(); // Asume que el idioma es inglés
  });
});