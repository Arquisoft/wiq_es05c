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

test('renders Room component with users', () => {
    socket.on.mockImplementation((event, callback) => {
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
  
    expect(screen.getByText('user1')).toBeInTheDocument();
    expect(screen.getByText('user2')).toBeInTheDocument();
  });

  test('renders Room component with users', () => {
    socket.on.mockImplementation((event, callback) => {
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
  
    expect(screen.getByText('user1')).toBeInTheDocument();
    expect(screen.getByText('user2')).toBeInTheDocument();
  });