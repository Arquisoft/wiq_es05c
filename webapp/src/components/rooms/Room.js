import React from 'react';
import GameMultiplayer from '../game/GameMultiplayer'; // Importa el componente para el juego multijugador

const Room = ({ roomId }) => {
  // Aquí podrías incluir cualquier lógica relacionada con la sala, como obtener información adicional de la sala desde el servidor

  return (
    <div>
      <h2>Sala: {roomId}</h2>
      {/* Renderiza el componente para el juego multijugador dentro de la sala */}
      <GameMultiplayer />
    </div>
  );
};

export default Room;
