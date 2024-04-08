import React from 'react';
import { render, screen } from '@testing-library/react';
import NavBar from './NavBar';
import { AuthContext } from '../authcontext';
import { BrowserRouter as Router} from 'react-router-dom';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => ({
      'signUp': 'Registrarse',
      'signIn': 'Iniciar sesión',
      'logout': 'Cerrar sesión',
    })[key],
    i18n: {
      language: 'es',
    },
  }),
}));

describe('Navbar Component', () => {
  test('renders login and register buttons when user is not logged in', () => {
    const mockIsLoggedIn = jest.fn().mockReturnValue(false);
    render(
      <AuthContext.Provider value={{ isLoggedIn: mockIsLoggedIn }}>
        <Router>
          <NavBar />
        </Router>
      </AuthContext.Provider>
    );

    expect(screen.getByRole('link', { name: /Iniciar sesión/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Registrarse/i })).toBeInTheDocument();
  });
});
