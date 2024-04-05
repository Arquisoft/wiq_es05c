import { render, screen, act } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import JoinRoom from './JoinRoom';
import { ChakraProvider } from '@chakra-ui/react';
import socket from './socket';

jest.mock('./socket', () => ({
  on: jest.fn(),
  emit: jest.fn(),
  off: jest.fn(),
}));

test('renders popup if dont exists a room ', async () => {
  const spy = jest.spyOn(socket, 'on');

  render(
    <Router>
      <ChakraProvider>
        <JoinRoom />
      </ChakraProvider>
    </Router>
  );

  act(() => {
    spy.mock.calls[1][1](); // Llama al segundo manejador de eventos registrado con socket.on
  });

  const toastText = await screen.findByText('Error al unirse a la sala.', {}, { timeout: 5000 });
  expect(toastText).toBeInTheDocument();
});

test('renders JoinRoom component', () => {
  render(
    <Router>
      <ChakraProvider>
        <JoinRoom />
      </ChakraProvider>
    </Router>
  );

  const joinRoomElements = screen.getAllByText(/Unirse a Sala/i);
  expect(joinRoomElements.length).toBeGreaterThan(0);
});

test('renders success toast when roomJoined event is emitted', async () => {
  const spy = jest.spyOn(socket, 'on');

  render(
    <Router>
      <ChakraProvider>
        <JoinRoom />
      </ChakraProvider>
    </Router>
  );

  act(() => {
    spy.mock.calls[0][1]('1234'); // Llama al primer manejador de eventos registrado con socket.on
  });

  const toastText = await screen.findByText('Unido a la sala con éxito.', {}, { timeout: 5000 });
  expect(toastText).toBeInTheDocument();
});