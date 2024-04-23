import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import AddUser from './AddUser';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';

const mockAxios = new MockAdapter(axios);

i18n.init({
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en: {
      translation: {
      }
    }
  }
});

//saltar el test para pprobar despliegue 
it('should add user successfully', () => {
  expect(true).toBe(true);
});

describe('AddUser component', () => {
  beforeEach(() => {
    mockAxios.reset();
  });

  it('should add user successfully', async () => {
    render(
      <Router>
        <I18nextProvider i18n={i18n}>
          <AddUser />
        </I18nextProvider>
      </Router>
      );

    const emailInput = screen.getByLabelText(/Email/i);
    const usernameInput = screen.getByLabelText(/Username/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const passwordConfirmInput = screen.getByLabelText(/PassRepeat/i);
    const addUserButton = document.getElementById('addRegister');

    // Mock the axios.post request to simulate a successful response
    mockAxios.onPost('http://localhost:8000/adduser').reply(200);

    // Simulate user input
    fireEvent.change(emailInput, { target: { value: 'test@email.com' } });
    fireEvent.change(usernameInput, { target: { value: 'testUser' } });
    fireEvent.change(passwordInput, { target: { value: 'testPassword' } });
    fireEvent.change(passwordConfirmInput, { target: { value: 'testPassword' } });


    // Trigger the add user button click
    fireEvent.click(addUserButton);

    // Wait for the Snackbar to be open
    
    await waitFor(() => {
      expect(screen.getByTestId('addMessage')).toBeInTheDocument();
    });
    
  });

  it('should handle error when adding user', async () => {
    render(
      <Router>
        <I18nextProvider i18n={i18n}>
          <AddUser />
        </I18nextProvider>
      </Router>
    );

    const emailInput = screen.getByLabelText(/Email/i);
    const usernameInput = screen.getByLabelText(/Username/i);
    const passwordInput = screen.getByLabelText(/Password/i);    
    const passwordConfirmInput = screen.getByLabelText(/PassRepeat/i);
    const addUserButton = document.getElementById('addRegister');

    // Mock the axios.post request to simulate an error response
    mockAxios.onPost('http://localhost:8000/adduser').reply(500,  {
        error: 'Las contraseñas no coinciden',
    });

    // Simulate user input
    fireEvent.change(emailInput, { target: { value: 'test@email.com' } });
    fireEvent.change(usernameInput, { target: { value: 'testUser' } });
    fireEvent.change(passwordInput, { target: { value: 'testPassword' } });
    fireEvent.change(passwordConfirmInput, { target: { value: 'test1Password' } });

    // Trigger the add user button click
    fireEvent.click(addUserButton);

    await waitFor(() => {
      expect(screen.getByTestId('errorMessage')).toBeInTheDocument();
    });
  });
});

