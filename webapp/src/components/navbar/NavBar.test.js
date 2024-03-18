import React from 'react';
import { render, screen } from '@testing-library/react';
import Navbar from './NavBar';
import { AuthProvider } from '../authcontext';
import { BrowserRouter as Router} from 'react-router-dom';

describe('Navbar Component', () => {
  test('renders Navbar with correct content and links', () => {
    // Renderizar el componente
    render(
      <AuthProvider>
        <Router>
          <Navbar />
        </Router>
      </AuthProvider>
    );

    // Verificar que el logo esté presente
    const logo = screen.getByAltText('Logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', 'LogoSaberYganar.png');

    // Verificar que los enlaces de registro e inicio de sesión estén presentes con los íconos correctos
    const registerLink = screen.getByRole('link', { name: /Registrarse/i });
    expect(registerLink).toBeInTheDocument();
    expect(registerLink).toHaveAttribute('href', '/addUser');

    const loginLink = screen.getByRole('link', { name: /Iniciar sesión/i });
    expect(loginLink).toBeInTheDocument();
    expect(loginLink).toHaveAttribute('href', '/login');

    // Verificar que los íconos estén presentes en los enlaces
    const registerIcon = screen.getByRole('link', { name: /Registrarse/i }).querySelector('i');
    expect(registerIcon).toBeInTheDocument();
    expect(registerIcon).toHaveClass('fas fa-sign-in-alt');

    const loginIcon = screen.getByRole('link', { name: /Iniciar sesión/i }).querySelector('i');
    expect(loginIcon).toBeInTheDocument();
    expect(loginIcon).toHaveClass('fas fa-sign-in-alt');
  });
});
