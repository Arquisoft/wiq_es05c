import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer Component', () => {
  test('renders footer with correct content and links', () => {
    // Renderizar el componente
    render(<Footer />);

    // Verificar que el texto "Trabajo de Arquitectura del Software" esté presente
    expect(screen.getByText('Trabajo de Arquitectura del Software')).toBeInTheDocument();

    // Verificar que el enlace al Github del Proyecto esté presente con el atributo target="_blank"
    const githubLink = screen.getByRole('link', { name: /Github del Proyecto/i });
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute('href', 'https://github.com/Arquisoft/wiq_es04c');
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');

    // Verificar que el enlace a la Escuela de Ingeniería Informática esté presente con el atributo target="_blank"
    const schoolLink = screen.getByRole('link', { name: /Escuela de Ingeniería Informática/i });
    expect(schoolLink).toBeInTheDocument();
    expect(schoolLink).toHaveAttribute('href', 'https://ingenieriainformatica.uniovi.es');
    expect(schoolLink).toHaveAttribute('target', '_blank');
    expect(schoolLink).toHaveAttribute('rel', 'noopener noreferrer');
  });
});