import React, { useState, useEffect } from 'react';
import Game from './Game';
import io from 'socket.io-client';
import { GameProvider } from './GameContext'; // Importa el nuevo contexto
import { RoomGameMode } from './gameModes/RoomGameMode';/*
recibe la peticoion del serrvidor y lanza para todos los usuarios de la sala el juego con las preguntas */

const GameMultiplayer = () => {
    const[socket, setSocket]=useState(null);
    const [questions, setQuestions] = useState([]);

    const game= new Game();

    useEffect(() => {
        // Establecer conexión con el servidor a través de Socket.io
        const newSocket = io('http://localhost:8000');

        // Escuchar eventos del servidor
        newSocket.on('startGame', (questionsFromServer) => {
            // Procesar las preguntas recibidas del servidor
            setQuestions(questionsFromServer);
        });

        // Guardar el socket en el estado
        setSocket(newSocket);

        // Retornar una función de limpieza para desconectar el socket cuando el componente se desmonte
        return () => newSocket.close();
    }, []);
    //useffect encargado de que si cambia el estado del gameFInis de la clase game se envie al servidor que se ha finalizado el juego
    useEffect(() => {
        if (game.finished) {
            enviarRespuesta("true");
        }
    }, [game,game.finished]);
     // Función para enviar respuestas al servidor
     const enviarRespuesta = (respuesta) => {
        // Aquí puedes enviar la respuesta al servidor a través de Socket.io
        // Por ejemplo: socket.emit('respuesta', respuesta);
        socket.emit('finalizado', respuesta);
    };

    return (
        <div>
        {/* Renderizar el componente Game dentro del proveedor del nuevo contexto GameContext */}
        <GameProvider gameMode={new RoomGameMode(questions)} >
            <Game questions={questions} />
        </GameProvider>
    </div>
    );


};
export default GameMultiplayer;