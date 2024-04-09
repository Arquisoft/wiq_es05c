import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import Room from './Room';
import socket from './socket';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ roomId: '1234' }),
  useNavigate: () => jest.fn(),
  useLocation: () => ({ state: { isHost: true } }),
}));

jest.mock('./socket', () => {
    return {
      emit: jest.fn(),
      on: jest.fn(),
      off: jest.fn(),
    };
  });

jest.mock('i18next', () => ({
  use: () => {},
  init: () => {},
}));


jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => ({
      'room': 'Sala: ',
    })[key],
  }),
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

test('renders Room component with users', async () => {
  socket.once.mockImplementation((event, callback) => {
    if (event === 'currentUsers') {
      setTimeout(() => callback({ 'user1': true, 'user2': true }), 0);
    }
  });

  render(
    <Router>
      <ChakraProvider>
        <Room darkMode={false} />
      </ChakraProvider>
    </Router>
  );

  // Use `findByText` to wait for the users to be rendered
  const user1 = await screen.findByText('user1');
  const user2 = await screen.findByText('user2');

  expect(user1).toBeInTheDocument();
  expect(user2).toBeInTheDocument();
});

test('renders Room component with users', async () => {
  socket.once.mockImplementation((event, callback) => {
    if (event === 'currentUsers') {
      callback({ 'user1': true, 'user2': true });
    }
  });

  render(
    <Router>
      <ChakraProvider>
        <Room darkMode={false} />
      </ChakraProvider>
    </Router>
  );

  // Use `findByText` to wait for the users to be rendered
  const user1 = await screen.findByText('user1');
  const user2 = await screen.findByText('user2');

  expect(user1).toBeInTheDocument();
  expect(user2).toBeInTheDocument();
});
