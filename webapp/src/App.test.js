import { render, screen } from '@testing-library/react';
import App from './App';
import { useTranslation } from 'react-i18next';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: jest.fn(),
    i18n: {
      changeLanguage: jest.fn(),
      language: 'es',
    },
  }),
}));

test('renders Navbar component', () => {
  render(<App />);
  const navbarElement = screen.getByTestId('navbar');
  expect(navbarElement).toBeInTheDocument();
});

test('renders Footer component', () => {
  render(<App />);
  const footerElement = screen.getByTestId('footer');
  expect(footerElement).toBeInTheDocument();
});