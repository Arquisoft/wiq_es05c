import React, { useContext,useState,useEffect } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { AuthProvider, AuthContext } from './authcontext';
import { act } from 'react-dom/test-utils'; // import act garanzita que se cambien los estadoa antes de las asercciones 

describe('AuthProvider', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('should set token and username in localStorage and state on login', async () => {
    const jwtToken = 'exampleToken';
    const username = 'exampleUsername';
  
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
  
    const loginButton = screen.getByRole('button', { name: /Login/i });
  
    // Wrap the click event in act
    await act(async () => {
      fireEvent.click(loginButton);
    });
  
    expect(localStorage.getItem('token')).toBe(jwtToken);
    expect(localStorage.getItem('username')).toBe(username);
    expect(screen.queryByText('Not logged in')).not.toBeInTheDocument();
  });

  test('should remove token and username from localStorage and state on logout', () => {
    localStorage.setItem('token', 'exampleToken');
    localStorage.setItem('username', 'exampleUsername');

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    const logoutButton = screen.getByRole('button', { name: /Logout/i });
    fireEvent.click(logoutButton);

    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('username')).toBeNull();
    expect(screen.getByText('Not logged in')).toBeInTheDocument();
  });

  test('should return true if user is logged in', () => {
    localStorage.setItem('token', 'exampleToken');

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByText('Logged in: true')).toBeInTheDocument();
  });

  test('should return false if user is not logged in', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByText('Logged in: false')).toBeInTheDocument();
  });
});
//componente usado para testear el authconetext
const TestComponent = () => {
    const { isLoggedIn, handleLogin, logout, username } = useContext(AuthContext);
    const [renderedUsername, setRenderedUsername] = useState(username);
  
    useEffect(() => {
      setRenderedUsername(username);
    }, [username]);
  
    return (
      <div>
        <button onClick={() => handleLogin('exampleToken', 'exampleUsername')}>Login</button>
        <button onClick={logout}>Logout</button>
        <p>Logged in: {isLoggedIn().toString()}</p>
        {renderedUsername ? <p>Logged in as: {renderedUsername}</p> : <p>Not logged in</p>}
      </div>
    );
  };
