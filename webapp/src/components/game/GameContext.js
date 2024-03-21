import { createContext, useState, useEffect } from 'react';

export const GameContext = createContext();
/*
es el encargado de crear el contexto par aque si te desloguae se peirdan los datos del juego, envolvera todos los componentes 
encapsula el modo de jeugo la funcion empezar a jugar y reinicir juego para que esten disponibles tanto para el juego como para los botones que lo empiezan  */
export const GameProvider = ({ children,gameMode }) => {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const startGame = async () => {
    // Aquí deberías reemplazar `fetchQuestions` con tu propia lógica para obtener las preguntas
    const fetchedQuestions = await gameMode.fetchQuestions();
    setQuestions(fetchedQuestions);
    setIsLoading(false);
  };

  const resetGame = () => {
    setQuestions([]);
    setIsLoading(true);
  };


  return (
    <GameContext.Provider value={{ startGame, resetGame, questions, isLoading }}>
      {children}
    </GameContext.Provider>
  );
};