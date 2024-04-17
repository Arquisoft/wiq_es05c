import { render, screen } from '@testing-library/react';
import { AuthContext } from '../authContext';
import Logout from './Logout';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: jest.fn().mockReturnValue('Logout Message'),
  }),
}));

test('renders Logout component with correct logout message', () => {
  render(
    <AuthContext.Provider value={{ logout: jest.fn() }}>
      <Logout />
    </AuthContext.Provider>
  );

  const logoutMessage = screen.getByText('Logout Message');
  expect(logoutMessage).toBeInTheDocument();
});