import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import Room from './Room';
import socket from './socket';
import { fireEvent } from '@testing-library/react';

// Add this at the top of your test file
const navigate = jest.fn();

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
      'roomStartGameButton': 'Start Game',
    })[key],
    i18n: { language: 'en' },
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

  test('starts the game when the "Start Game" button is clicked by the host', () => {
    const room = { isHost: true }; // Define room
  
    render(
      <Router>
        <ChakraProvider>
          <Room darkMode={false} />
        </ChakraProvider>
      </Router>
    );
  
    fireEvent.click(screen.getByText('Start Game'));
    expect(socket.emit).toHaveBeenCalledWith('startGame', expect.anything());
  });
  
  
  test('ends the game correctly', () => {
    socket.on.mockImplementation((event, callback) => {
      if (event === 'gameEnded') {
        callback({ ranking: ['user1', 'user2'] });
      }
    });
  
    render(
      <Router>
        <ChakraProvider>
          <Room darkMode={false} />
        </ChakraProvider>
      </Router>
    );
  
    // Add a delay to ensure the game ends before navigate is called
    setTimeout(() => {
      expect(navigate).toHaveBeenCalledWith('/rankingroom/1234', expect.anything());
    }, 1000);
  });
  test('does not render the "Start Game" button for non-host users', () => {
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useLocation: () => ({ state: { room: { isHost: false } } }),
    }));
  
    render(
      <Router>
        <ChakraProvider>
          <Room darkMode={false} />
        </ChakraProvider>
      </Router>
    );
  
    const startGameButton = screen.queryByTestId('startButton');
    expect(startGameButton).toBeNull();
  });