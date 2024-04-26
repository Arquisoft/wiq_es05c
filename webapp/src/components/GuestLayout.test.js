import { render, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import GuestOnlyRoute from './GuestLayout';
import { AuthContext } from './authcontext';

describe('GuestOnlyRoute component', () => {

  it('should render children if user is not logged in', () => {
    const isLoggedIn = jest.fn().mockReturnValue(false);

    const { container } = render(
      <BrowserRouter>
        <AuthContext.Provider value={{ isLoggedIn }}>
          <GuestOnlyRoute>
            <div>Child Component</div>
          </GuestOnlyRoute>
        </AuthContext.Provider>
      </BrowserRouter>
    );

    expect(container.textContent).toContain('Child Component');
  });
});