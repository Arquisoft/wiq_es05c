import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

jest.mock('i18next', () => ({
  use: () => {},
  init: () => {},
}));


jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => ({
      'subject': 'Trabajo de Arquitectura del Software',
      'github': 'Github del Proyecto',
      'university': 'Escuela de Ingeniería Informática',
    })[key],
  }),
}));

describe('Footer Component', () => {
  test('renders footer with correct content and links', () => {
    // Renderizar el componente
    render(<Footer />);

    // Verificar que el texto "Trabajo de Arquitectura del Software" esté presente
    expect(screen.getByText('Trabajo de Arquitectura del Software')).toBeInTheDocument();

    // Verificar que el enlace al Github del Proyecto esté presente con el atributo target="_blank"
    const githubLink = screen.getByRole('link', { name:  /Github del Proyecto/i });
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute('href', 'https://github.com/Arquisoft/wiq_es05c');
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
    

    // Verificar que el enlace a la Escuela de Ingeniería Informática esté presente con el atributo target="_blank"
    const schoolLink = screen.getByRole('link', { name: /Escuela de Ingeniería Informática/i });
    expect(schoolLink).toBeInTheDocument();
    expect(schoolLink).toHaveAttribute('href', 'https://ingenieriainformatica.uniovi.es');
    expect(schoolLink).toHaveAttribute('target', '_blank');
    expect(schoolLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('renders footer with correct content and links', () => {
    // Renderizar el componente
    render(<Footer />);

    // Verificar que la imagen del logo de Github se renderiza con el src correcto
    const githubLogo = screen.getByAltText('Logo Github');
    expect(githubLogo).toBeInTheDocument();
    expect(githubLogo).toHaveAttribute('src', '/logoGitHub.png'); 
});



  test('should always pass', () => {
    expect(true).toBe(true);
  }); 
});