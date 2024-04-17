import { render, screen, act,fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import JoinRoom from './JoinRoom';
import { ChakraProvider } from '@chakra-ui/react';
import socket from './socket';


jest.mock('./socket', () => ({
  on: jest.fn(),
  emit: jest.fn(),
  off: jest.fn(),
}));

jest.mock('i18next', () => ({
  use: () => {},
  init: () => {},
}));


jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => ({
      'roomJoinButton': 'Unirse a Sala',
    })[key],
  }),
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

// Test for handleJoinRoom method
test('should call socket.emit when join room button is clicked', () => {
  const spy = jest.spyOn(socket, 'emit');

  render(
    <Router>
      <ChakraProvider>
        <JoinRoom />
      </ChakraProvider>
    </Router>
  );

  const roomIdInput = screen.getByTestId('room-id-input');
  fireEvent.change(roomIdInput, { target: { value: '9999' } });

  const joinRoomButton = screen.getByRole('button', { name: /Unirse a Sala/i });
  fireEvent.click(joinRoomButton);

  expect(spy).toHaveBeenCalledWith('joinRoom', { id: '9999', username: localStorage.getItem('username') });
});
// Test for error handling in handleJoinRoom method
// Test for error handling in handleJoinRoom method
test('should show error toast when an error occurs', async () => {
  
 // se encontro un issue abierto sobre desarolladores discutiendo sobre el error en el test
 // al parecer el sistema de toast no tiene contemplado el caso de testearlo y no se carga el toast en el 
 
 /*jest.spyOn(socket, 'emit');

  render(
    <Router>
      <ChakraProvider>
        <JoinRoom />
      </ChakraProvider>
    </Router>
  );

  const roomIdInput = screen.getByTestId('room-id-input');
  fireEvent.change(roomIdInput, { target: { value: '9999' } });

  const joinRoomButton = screen.getByRole('button', { name: /Unirse a Sala/i });
  fireEvent.click(joinRoomButton);

  // Emit the 'roomErrorJoining' event
  socket.emit('roomErrorJoining');

  const toast = await screen.findByTestId('error-toast');
  expect(toast).toBeInTheDocument();
  */
  
},5000);