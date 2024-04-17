import React from 'react';
import { render, screen } from '@testing-library/react';
import { AuthContext } from '../authcontext'; 
import { useTranslation } from 'react-i18next';
import Logout from './Logout';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: key => key })
}));

describe('Logout', () => {
  test('should call logout function from AuthContext', () => {
    const logoutMock = jest.fn();
    const authContextValue = { logout: logoutMock };

    render(
      <AuthContext.Provider value={authContextValue}>
        <Logout />
      </AuthContext.Provider>
    );

    expect(logoutMock).toHaveBeenCalledTimes(1);
  });

  test('should render logout message', () => {
    const logoutMock = jest.fn();
    const authContextValue = { logout: logoutMock };

    render(
      <AuthContext.Provider value={authContextValue}>
        <Logout />
      </AuthContext.Provider>
    );

    expect(screen.getByText('logoutMessage')).toBeInTheDocument();
  });
});