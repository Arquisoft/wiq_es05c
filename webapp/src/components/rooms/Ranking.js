import React from 'react';
import { useLocation } from 'react-router-dom';

function Ranking() {
  // Obtener el ranking del estado de la navegación
  const location = useLocation();
  const ranking = location.state.ranking;

  // Ordenar el ranking por el número de respuestas correctas y, en caso de empate, por el tiempo total
    ranking.sort((a, b) => {
        if (b.correctas !== a.correctas) {
        return b.correctas - a.correctas;
        } else {
        return a.tiempoTotal - b.tiempoTotal;
        }
    });
  
  return (
    <div>
      <h1>Ranking</h1>
      <ul>
        {ranking.map((player, index) => (
          <li key={index}>
            Puesto {index + 1}: {player.username} con {player.correctas} respuestas correctas y un tiempo total de {player.tiempoTotal}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Ranking;