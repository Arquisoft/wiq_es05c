import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import Room from './Room';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ roomId: '1234' }),
  useNavigate: () => jest.fn(),
  useLocation: () => ({ state: { isHost: true } }),
}));

test('renders Room component', () => {
  render(
    <Router>
      <ChakraProvider>
        <Room darkMode={false} />
      </ChakraProvider>
    </Router>
  );
});

test('renders Room component with correct room ID', () => {
  render(
    <Router>
      <ChakraProvider>
        <Room darkMode={false} />
      </ChakraProvider>
    </Router>
  );

  expect(screen.getByText('Sala: 1234')).toBeInTheDocument();
});