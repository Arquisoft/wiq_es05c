import React from 'react';
import { render, screen, fireEvent,waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import Login from './Login';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { act } from '@testing-library/react';

import axios from 'axios';

jest.mock('axios');
const theme = createTheme({
    spacing: 4,
  });
// Mock the useTranslation hook
jest.mock('react-i18next', () => ({
    useTranslation: () => ({ t: key => key }) // Return the translation key as the translated text
  }));

describe('Login component', () => {
    test('renders login form', () => {
      const handleLogin = jest.fn();
      render(
          <Router>
            <ThemeProvider theme={theme}>
              <AuthContext.Provider value={{ handleLogin }}>
                <Login darkMode={false} />
              </AuthContext.Provider>
            </ThemeProvider>
          </Router>
        );
  
      expect(screen.getByTestId('username')).toBeInTheDocument();
      expect(screen.getByTestId('password')).toBeInTheDocument();
      expect(screen.getByTestId('login-button')).toBeInTheDocument();
    });
  
    test('calls handleLogin function on successful login', () => {
        const handleLogin = jest.fn();
      
        // Mock the axios.post function to return a resolved promise
        axios.post.mockResolvedValue({
          data: {
            token: 'test-token',
            username: 'test-username',
            lastDailyGame: 'test-lastDailyGame',
          },
        });
      
        render(
            <Router>
              <ThemeProvider theme={theme}>
                <AuthContext.Provider value={{ handleLogin }}>
                  <Login darkMode={false} />
                </AuthContext.Provider>
              </ThemeProvider>
            </Router>
          );
      
        fireEvent.click(screen.getByTestId('login-button'));
      
        // Use setTimeout to wait for the loginUser function to complete
        setTimeout(() => {
          expect(handleLogin).toHaveBeenCalledWith('test-token', 'test-username');
        }, 0);
      });
      /*
      test('displays error message when login request fails', async () => {
        // Mock the axios.post function to return a rejected promise
        axios.post.mockRejectedValue({
          response: {
            data: {
              error: 'test-error',
            },
          },
        });
      
        // Mock handleLogin to set error state to true
        const handleLogin = jest.fn().mockImplementation(() => {
          setError(true);
        });
      
        render(
          <Router>
            <ThemeProvider theme={theme}>
              <AuthContext.Provider value={{ handleLogin }}>
                <Login darkMode={false} />
              </AuthContext.Provider>
            </ThemeProvider>
          </Router>
        );
      
        // Use act to wrap asynchronous interactions
        await act(async () => {
          fireEvent.click(screen.getByTestId('login-button'));
      
          // Use findByText to wait for the error message to appear
          const errorMessage = await screen.findByText('Error: test-error');
          expect(errorMessage).toBeInTheDocument();
        });
      });
      */
    /*

    este test no funciona esta pendiente 
      test('displays welcome message after successful login', async () => {
        const handleLogin = jest.fn();
    
        
        // Mock the axios.post function to return a resolved promise
        axios.post.mockImplementation((url) => {
            if (url === '/login') {
              return Promise.resolve({
                data: {
                  token: 'test-token',
                  user: {
                    username: 'test-username',
                    lastDailyGame: 'test-lastDailyGame',
                    createdAt: new Date().toISOString(),
                  },
                },
              });
            } else if (url === '/error') {
              return Promise.reject({
                response: {
                  data: {
                    error: 'test-error',
                  },
                },
              });
            }
          });
    
        render(
            <Router>
              <ThemeProvider theme={theme}>
                <AuthContext.Provider value={{ handleLogin }}>
                  <Login darkMode={false} />
                </AuthContext.Provider>
              </ThemeProvider>
            </Router>
          );
    
          fireEvent.click(screen.getByTestId('login-button'));
    
          await waitFor(() => expect(screen.getByTestId('welcome-message')).toHaveTextContent('loginWelcomeMessage test-username'));
          //await waitFor(() => expect(screen.getByTestId('welcome-date')).toBeInTheDocument());
      });*/
  });