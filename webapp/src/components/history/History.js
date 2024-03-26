import React from 'react';
import { useEffect, useState} from 'react';

const History = () => {

  const apiEndpoint = process.env.REACT_APP_API_URI ||'http://localhost:8000';
  let gamesEndpoint = apiEndpoint+'/getHistoryDetallado';
  let statisticsEndpoint = apiEndpoint+'/getHistoryTotal';

  const [allGames, setAllGames] = useState([]);//Para todos los juegos
  const [isLoadingGames, setIsLoadingGames] = useState(true);
  const [stats, setStatistics] = useState([]);//Para las estadisticas completas de todos los juegos
  const [isLoadingStats, setIsLoadingStats] = useState(true);

  useEffect(() => {
    fetch(gamesEndpoint)
      .then(response => response.json())
      .then(partidas => {
        console.log("Partidas: ");
        console.log(partidas);
        let gamesArray = Object.values(partidas);
        setAllGames(gamesArray);
        setIsLoadingGames(false);
      })
      .catch(error => {
        console.error('Error cargando el historial de todas las partidas del usuario:', error);
      });
  }, []);

  useEffect(() => {
    fetch(statisticsEndpoint)
      .then(response => response.json())
      .then(estadisticas => {
        console.log("Estadísticas: ");
        console.log(estadisticas);
        setStatistics(estadisticas);
        setIsLoadingStats(false);
      })
      .catch(error => {
        console.error('Error cargando las estadísticas del usuario:', error);
      });
  }, []);


  return (
    <div>
    {(isLoadingGames || isLoadingStats) ? (
      <div>Loading...</div> // Esto se mostrará mientras se está cargando
    ) : (
      <div style={{height: "100vh"}}>
        {/* Estadisticas */}
        <div>
        <p>Numero juegos: {stats.numeroJuegos}</p>
        <p>Aciertos: {stats.preguntas_acertadas}%</p>
        <p>Fallos: {stats.preguntas_falladas}%</p>
        <p>Tiempo total de juego: {stats.tiempoTotal}s</p>
        <p>Tiempo medio de partida: {stats.tiempoMedio}s</p>
        </div>
        <div> 
        {/* Partidas */}
        {allGames.map(game => (
          <div key={game.numeroJuego}>{game.fecha}</div> // Asegúrate de reemplazar 'id' y 'name' con las propiedades correctas de tus juegos
        ))}
        </div>
      </div>
    )}
  </div>
  );
  
};

export default History;