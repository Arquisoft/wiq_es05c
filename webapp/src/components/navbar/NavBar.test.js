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
      changeLanguage: jest.fn(),
    },
  }),
}));

describe('Navbar Component', () => {
  test('renders buttons when user is not logged in', () => {
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
    
  test('calls changeLanguage with "es" when Spanish menu item is clicked', () => {
    const mockIsLoggedIn = jest.fn().mockReturnValue(false);
    render(
    <AuthContext.Provider value={{ isLoggedIn: mockIsLoggedIn }}>
      <Router>
        <NavBar setDarkMode={() => {}} darkMode={false}/>
      </Router>
    </AuthContext.Provider>);

     // Verifica que el menú de idiomas esté presente
     const languageMenu = screen.getByRole('button', { id: 'change-language-button' });
     expect(languageMenu).toBeInTheDocument();
  
     // Abre el menú de idiomas
     fireEvent.click(languageMenu);

    // Encuentra el elemento del menú de idioma inglés
    const spanishMenuItem = screen.getByTestId('spanish-menu-item');
    expect(spanishMenuItem).toBeInTheDocument();    

    // Simula hacer clic en el elemento del menú de idioma inglés
    fireEvent.click(spanishMenuItem);

    const languageTypography = screen.getByTestId('idioma');

    // Verifica si el contenido del Typography coincide con el idioma actual en mayúsculas
    expect(languageTypography.textContent.trim()).toBe("ES");
    });

  test('calls changeLanguage with "en" when English menu item is clicked', () => {
    const mockIsLoggedIn = jest.fn().mockReturnValue(false);
    render(
    <AuthContext.Provider value={{ isLoggedIn: mockIsLoggedIn }}>
      <Router>
        <NavBar setDarkMode={() => {}} darkMode={false}/>
      </Router>
    </AuthContext.Provider>);

     // Verifica que el menú de idiomas esté presente
     const languageMenu = screen.getByRole('button', { id: 'change-language-button' });
     expect(languageMenu).toBeInTheDocument();
  
     // Abre el menú de idiomas
     fireEvent.click(languageMenu);

    // Encuentra el elemento del menú de idioma inglés
    const englishMenuItem = screen.getByTestId('english-menu-item');
    expect(englishMenuItem).toBeInTheDocument();    

    // Simula hacer clic en el elemento del menú de idioma inglés
    fireEvent.click(englishMenuItem);
    //Simulamos el cambio de idioma
    const languageTypography = screen.getByTestId('idioma');
    languageTypography.textContent = 'EN';

    // Verifica si el contenido del Typography coincide con el idioma actual en mayúsculas
    expect(languageTypography.textContent).toBe("EN");
  });

  test('click in create room', () => {
    const mockIsLoggedIn = jest.fn().mockReturnValue(false);
    render(
    <AuthContext.Provider value={{ isLoggedIn: mockIsLoggedIn }}>
      <Router>
        <NavBar setDarkMode={() => {}} darkMode={false}/>
      </Router>
    </AuthContext.Provider>);

    const roomCreateButton = screen.getByTestId('roomCreateButton');
    expect(roomCreateButton).toBeInTheDocument();

    fireEvent.click(roomCreateButton);

    expect(window.location.href).toBe('http://localhost/createroom');
  });

  test('click in join room', () => {
    const mockIsLoggedIn = jest.fn().mockReturnValue(false);
    render(
    <AuthContext.Provider value={{ isLoggedIn: mockIsLoggedIn }}>
      <Router>
        <NavBar setDarkMode={() => {}} darkMode={false}/>
      </Router>
    </AuthContext.Provider>);

    const roomJoinButton = screen.getByTestId('roomJoinButton');
    expect(roomJoinButton).toBeInTheDocument();

    fireEvent.click(roomJoinButton);

    expect(window.location.href).toBe('http://localhost/joinroom');
  });

  test('click in home', () => {
    const mockIsLoggedIn = jest.fn().mockReturnValue(false);
    render(
    <AuthContext.Provider value={{ isLoggedIn: mockIsLoggedIn }}>
      <Router>
        <NavBar setDarkMode={() => {}} darkMode={false}/>
      </Router>
    </AuthContext.Provider>);

    const homeButton = screen.getByTestId('homeButton');
    expect(homeButton).toBeInTheDocument();

    fireEvent.click(homeButton);

    expect(window.location.href).toBe('http://localhost/home');
  });

  test('click in history', () => {
    const mockIsLoggedIn = jest.fn().mockReturnValue(true);
    render(
    <AuthContext.Provider value={{ isLoggedIn: mockIsLoggedIn }}>
      <Router>
        <NavBar setDarkMode={() => {}} darkMode={false}/>
      </Router>
    </AuthContext.Provider>);

    const iconoUsuario = screen.getByTestId('iconoUsuario');
    expect(iconoUsuario).toBeInTheDocument();

    fireEvent.click(iconoUsuario);

    const historyButton = screen.getByTestId('historyButton');
    expect(historyButton).toBeInTheDocument();

    fireEvent.click(historyButton);

    expect(window.location.href).toBe('http://localhost/history');
  });

  test('click in ranking', () => {
    const mockIsLoggedIn = jest.fn().mockReturnValue(true);
    render(
    <AuthContext.Provider value={{ isLoggedIn: mockIsLoggedIn }}>
      <Router>
        <NavBar setDarkMode={() => {}} darkMode={false}/>
      </Router>
    </AuthContext.Provider>);

    const iconoUsuario = screen.getByTestId('iconoUsuario');
    expect(iconoUsuario).toBeInTheDocument();

    fireEvent.click(iconoUsuario);

    const rankingButton = screen.getByTestId('rankingButton');
    expect(rankingButton).toBeInTheDocument();

    fireEvent.click(rankingButton);

    expect(window.location.href).toBe('http://localhost/ranking');
  });

  test('click in ranking', () => {
    const mockIsLoggedIn = jest.fn().mockReturnValue(true);
    render(
    <AuthContext.Provider value={{ isLoggedIn: mockIsLoggedIn }}>
      <Router>
        <NavBar setDarkMode={() => {}} darkMode={false}/>
      </Router>
    </AuthContext.Provider>);

    const iconoUsuario = screen.getByTestId('iconoUsuario');
    expect(iconoUsuario).toBeInTheDocument();

    fireEvent.click(iconoUsuario);

    const logoutButton = screen.getByTestId('logoutButton');
    expect(logoutButton).toBeInTheDocument();

    fireEvent.click(logoutButton);

    expect(window.location.href).toBe('http://localhost/logout');
  });

});
