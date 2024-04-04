import { render, screen, act } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import CreateRoom from './CreateRoom';
import socket from './socket';

jest.mock('./socket', () => ({
  on: jest.fn(),
  emit: jest.fn(),
  off: jest.fn(),
}));

test('renders CreateRoom component and checks for button', () => {
    render(
      <Router>
        <ChakraProvider>
          <CreateRoom />
        </ChakraProvider>
      </Router>
    );
  
    const createRoomButton = screen.getByTestId('createRoom');
    expect(createRoomButton).toBeInTheDocument();
  });



