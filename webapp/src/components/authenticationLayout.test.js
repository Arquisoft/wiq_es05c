import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import AuthenticatedLayout from './authenticationLayout';
import { AuthContext } from './authcontext';

describe('AuthenticatedLayout', () => {
  it('renders children when user is logged in', () => {
    const isLoggedIn = jest.fn().mockReturnValue(true);

    render(
      <AuthContext.Provider value={{ isLoggedIn }}>
        <Router>
          <AuthenticatedLayout>
            <div>Child Component</div>
          </AuthenticatedLayout>
        </Router>
      </AuthContext.Provider>
    );

    expect(screen.getByText('Child Component')).toBeInTheDocument();
  });

  it('redirects to login page when user is not logged in', () => {
    const isLoggedIn = jest.fn().mockReturnValue(false);

    render(
      <AuthContext.Provider value={{ isLoggedIn }}>
        <Router>
        <AuthenticatedLayout>
        <div data-testid="child-element">Child Element</div>
          </AuthenticatedLayout>
        </Router>
      </AuthContext.Provider>
    );
    expect(screen.queryByTestId('child-element')).toBeNull();
  });
});