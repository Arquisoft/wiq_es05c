import React, { useState } from 'react';
import GameMultiplayer from '../game/GameMultiplayer';
import { useParams } from 'react-router-dom';

const Room = () => {
  const { roomId } = useParams();
  const [startGame, setStartGame] = useState(false);
  const [users, setUsers] = useState([]);
  //se carga al generar el compoentne y caa vez que se acutlaiza la lista de usuarios 
  useEffect(() => {
    const newSocket = socketIOClient('http://localhost:4000'); // Reemplaza esto con la URL de tu servidor
    setSocket(newSocket);

    newSocket.on('userJoined', (username) => {
      setUsers((users) => [...users, username]);
    });

    return () => newSocket.close();
  }, []);

  return (
    <div>
      <h2>Sala: {roomId}</h2>
      <button onClick={() => setStartGame(true)}>Iniciar juego</button>
      <p>Usuarios: {users.join(', ')}</p>
      {startGame && <GameMultiplayer />}
    </div>
  );
};

export default Room;