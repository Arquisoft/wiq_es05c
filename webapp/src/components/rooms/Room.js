import React, { useState,useEffect,useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, Button } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';

import socket from './socket';
import Game  from '../game/GameMultiplayer';

function Room() {
  const nagivate = useNavigate();
  const { roomId } = useParams();
  const location = useLocation();
  const isHost = location.state?.isHost;

  const [users, setUsers] = useState({});
  const [questions, setQuestions] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);


  const [winner, setWinner] = useState(null);


  //para el mensaje del ganador 
  const [isOpen, setIsOpen] = useState(false);
  const cancelRef = useRef();
  const onClose = () =>{
    setIsOpen(false);
    nagivate('/home');
  };

  useEffect(() => {

    socket.on('currentUsers', (users) => {
      console.log('Usuarios actuales: ', users);
      setUsers(users);
    });
    socket.emit('ready', { id: roomId });

    console.log("eres el host "+isHost);


    socket.on('gameStarted', (questions) => {
      //hace la peticion por la preguntas a la gateway y se las manda los jugadores 
      console.log('Juego iniciado, preguntas: ', questions);
      const formated =Object.values(questions);
      setQuestions(formated);
      setGameStarted(true);
    });

    socket.on('gameEnded', ( winner ) => {
      console.log('Juego terminado, ganador: ', winner);
      setWinner(winner);
    });
    //limpiar el evento 
    return () => socket.off('gameEnded');
    

  }, [roomId]);

  //muestra el ganador 
  useEffect(() => {
    if (winner) {
      setIsOpen(true);
    }
  }, [winner]);
  function startGame  (){

      if(!gameStarted && isHost){
        //setGameStarted(true);
        socket.emit('startGame', { id: roomId });
        console.log("se ha iniciado el juego");
      }
     

      
    
  }
  //funcion que le pasas a game para gestionar el finaldel juego 
  function endGame(results) {
    socket.emit('endGame', {id:roomId, results:results});

  }

  

  return (
    <div>
      <h1>Sala: {roomId}</h1>
      <h2>Usuarios:</h2>
      <ul>
        {Object.keys(users).map((username, index) => (
            <li key={index}>{username}</li>
          ))}
      </ul>
      {isHost && <button onClick={startGame} disabled={gameStarted}>Iniciar Juego</button>}
      {gameStarted && questions.length > 0 && <Game questions={questions} endGame={endGame} />}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Juego terminado
            </AlertDialogHeader>

            <AlertDialogBody>
              El ganador es {winner}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cerrar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </div>
  );
}

export default Room;