import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
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
          <NavBar setDarkMode={() => {}} darkMode={false}/>
        </Router>
      </AuthContext.Provider>
    ); 

    //Verifica que esta el boton de home
    const homeButton = screen.getByTestId('homeButton');
    expect(homeButton).toBeInTheDocument();

    //Verifica que esta los botones de las salas
    const roomJoinButton = screen.getByTestId('roomJoinButton');
    const roomCreateButton = screen.getByTestId('roomCreateButton');
    expect(roomJoinButton).toBeInTheDocument();    
    expect(roomCreateButton).toBeInTheDocument();
      
    // Verifica que el menú de idiomas esté presente
    const languageMenu = screen.getByRole('button', { id: 'change-language-button' });
    expect(languageMenu).toBeInTheDocument();
 
    // Abre el menú de idiomas
    fireEvent.click(languageMenu);
 
    // Verifica que las opciones de idioma estén presentes
    const spanishMenuItem = screen.getByTestId('spanish-menu-item');
    const englishMenuItem = screen.getByTestId('english-menu-item');
    expect(spanishMenuItem).toBeInTheDocument();
    expect(englishMenuItem).toBeInTheDocument();
 
    // Verifica que las imágenes de las banderas estén presentes     
    const spanishFlag = screen.getByTestId('spanish-flag');
    const englishFlag = screen.getByTestId('english-flag');
    expect(spanishFlag).toBeInTheDocument();
    expect(englishFlag).toBeInTheDocument();

    //Verifica que esta el boton de login y de add user
    const loginButton = screen.getByTestId('loginButton');
    const singupButton = screen.getByTestId('addButton');
    expect(loginButton).toBeInTheDocument();
    expect(singupButton).toBeInTheDocument();

  });

  
});
