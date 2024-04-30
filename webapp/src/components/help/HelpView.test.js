import { render, screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../internacionalizacion/i18n'; // Asume que tienes un archivo i18n.js para la configuración de i18next
import HelpView from './HelpView';

describe('HelpView', () => {
  test('renders correctly in light mode', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <HelpView darkMode={{ darkMode: false }} />
      </I18nextProvider>
    );

    //comprueba que se renderiza correctamente el texto en español
    expect(screen.getByText("Ayuda")).toBeInTheDocument();
    expect(screen.getByText("Modo Clásico:")).toBeInTheDocument();
    expect(screen.getByText("Demuestra tu habilidad para responder preguntas en un tiempo limitado. En este modo, tendrás 10 preguntas y 20 segundos para responder cada una. ¡Buena suerte!")).toBeInTheDocument();
    expect(screen.getByText("Modo Personalizado:")).toBeInTheDocument();
    expect(screen.getByText("¡Crea tu propio desafío! En este modo, puedes personalizar el tiempo para responder las preguntas y el número de preguntas que deseas responder.")).toBeInTheDocument();
    expect(screen.getByText("Modo Maestro del Tema:")).toBeInTheDocument();
    expect(screen.getByText("Demuestra tu dominio en un tema específico. En este modo, todas las preguntas estarán relacionadas con una categoría seleccionada.")).toBeInTheDocument();
    expect(screen.getByText("Desafío Diario:")).toBeInTheDocument();
    expect(screen.getByText("¡Mantén tu mente afilada! Cada día, encontrarás un nuevo desafío con preguntas frescas.")).toBeInTheDocument();
    expect(screen.getByText("Modo Sabio:")).toBeInTheDocument();
    expect(screen.getByText("Pon a prueba tus conocimientos sin límite de tiempo.")).toBeInTheDocument();
  });

  test('renders correctly in dark mode', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <HelpView darkMode={{ darkMode: true }} />
      </I18nextProvider>
    );

    //comprueba que se renderiza correctamente el texto en español
    expect(screen.getByText("Ayuda")).toBeInTheDocument();
    expect(screen.getByText("Modo Clásico:")).toBeInTheDocument();
    expect(screen.getByText("Demuestra tu habilidad para responder preguntas en un tiempo limitado. En este modo, tendrás 10 preguntas y 20 segundos para responder cada una. ¡Buena suerte!")).toBeInTheDocument();
    expect(screen.getByText("Modo Personalizado:")).toBeInTheDocument();
    expect(screen.getByText("¡Crea tu propio desafío! En este modo, puedes personalizar el tiempo para responder las preguntas y el número de preguntas que deseas responder.")).toBeInTheDocument();
    expect(screen.getByText("Modo Maestro del Tema:")).toBeInTheDocument();
    expect(screen.getByText("Demuestra tu dominio en un tema específico. En este modo, todas las preguntas estarán relacionadas con una categoría seleccionada.")).toBeInTheDocument();
    expect(screen.getByText("Desafío Diario:")).toBeInTheDocument();
    expect(screen.getByText("¡Mantén tu mente afilada! Cada día, encontrarás un nuevo desafío con preguntas frescas.")).toBeInTheDocument();
    expect(screen.getByText("Modo Sabio:")).toBeInTheDocument();
    expect(screen.getByText("Pon a prueba tus conocimientos sin límite de tiempo.")).toBeInTheDocument();
  });
});