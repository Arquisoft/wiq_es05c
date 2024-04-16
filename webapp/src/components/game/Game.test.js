import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Game from './Game';
import { BrowserRouter as Router} from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { act } from 'react-dom/test-utils';


// Mocked props for testing
const mockedDarkMode = { darkMode: false };
const mockedGameMode = { timeToAnswer: 10 }; // Assuming a default time to answer of 10 seconds

// Mocked implementation for useEffect hook
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useEffect: jest.fn(),
}));

// Mocked implementation for useTranslation hook
jest.mock('react-i18next', () => ({
  useTranslation: () => ({ i18n: { language: 'en' } }),
}));

describe('Game component', () => {
  it('renders without crashing', () => {
    render(
      <Router>
        <ChakraProvider>
          <Game darkMode={mockedDarkMode} gameMode={mockedGameMode} />
        </ChakraProvider>
      </Router>);
  });

  test('renders loading spinner when isLoading is true', () => {
    const { getByTestId } = render(<Router>
      <ChakraProvider>
        <Game darkMode={mockedDarkMode} gameMode={mockedGameMode} />
      </ChakraProvider>
      </Router>);
    const loadingSpinner = getByTestId('loading-spinner');
    expect(loadingSpinner).toBeInTheDocument();
  });

});