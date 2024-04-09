import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import RankingRoom from './RankingRoom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
}));

test('renders RankingRoom component with correct ranking', () => {
  const mockRanking = [
    { username: 'user1', correctas: 5, tiempoTotal: 10 },
    { username: 'user2', correctas: 3, tiempoTotal: 15 },
    { username: 'user3', correctas: 3, tiempoTotal: 12 },
    { username: 'user4', correctas: 2, tiempoTotal: 20 },
  ];

  useLocation.mockReturnValue({ state: { ranking: mockRanking } });

  render(
    <Router>
      <ChakraProvider>
        <RankingRoom darkMode={false} />
      </ChakraProvider>
    </Router>
  );

  // Check if the top three players are rendered correctly
  expect(screen.getByText('Puesto 1')).toBeInTheDocument();
  expect(screen.getByText('Puesto 2')).toBeInTheDocument();
  expect(screen.getByText('Puesto 3')).toBeInTheDocument();
  expect(screen.getByText('user1')).toBeInTheDocument();
  expect(screen.getByText('user2')).toBeInTheDocument();
  expect(screen.getByText('user3')).toBeInTheDocument();

  // Check if the rest of the players are rendered correctly
  expect(screen.getByText('Puesto 4: user4')).toBeInTheDocument();
});

test('renders RankingRoom component with empty ranking', () => {
  const mockRanking = [];

  useLocation.mockReturnValue({ state: { ranking: mockRanking } });

  render(
    <Router>
      <ChakraProvider>
        <RankingRoom darkMode={false} />
      </ChakraProvider>
    </Router>
  );

  // Check if the "Ranking" heading is rendered
  expect(screen.getByText('Ranking')).toBeInTheDocument();

  // Check if no players are rendered
  expect(screen.queryByText('Puesto 1')).toBeNull();
});