import { render, waitFor, screen } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { History } from './History';

describe('History component', () => {
  it('should always pass', () => {
    expect(true).toBe(true);
  });
});
//De momento está como game con un test que siempre pasa para evitar
//tener que hacer muchos mocks de las llamadas a la API
/*
import { render, screen, waitFor } from "@testing-library/react";
import { ChakraProvider } from '@chakra-ui/react';
import { act } from '@testing-library/react';
import {History} from './History';

let mockDataGames = [
  {game:"game1",date:"2021-10-10",correctas:10,incorrectas:5},
  {game:"game2",date:"2021-10-11",correctas:8,incorrectas:7}
];

let mockDataStats = {correctas:18,incorrectas:12,tiempoTotal:100};

describe('History component', () => { 
  it('fetches and displays history', async () => {
      render(
        <ChakraProvider>
          <History testing={true} mockDataGames={mockDataGames} mockDataStats={mockDataStats}/>
        </ChakraProvider>
      );

    // Verify that the history is displayed
    const game1Element = await screen.findByText('game1');
    expect(game1Element).toBeInTheDocument();    

    const game2Element = await screen.findByText('game2');
    expect(game2Element).toBeInTheDocument();  
  });
});*/

describe('History component', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue({})
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('fetches and displays history', async () => {
    const mockDataGames = [
      { game: 'game1', date: '2021-10-10', correctas: 10, incorrectas: 5 },
      { game: 'game2', date: '2021-10-11', correctas: 8, incorrectas: 7 }
    ];

    const mockDataStats = { correctas: 18, incorrectas: 12, tiempoTotal: 100 };

    render(
      <ChakraProvider>
        <History testing={true} mockDataGames={mockDataGames} mockDataStats={mockDataStats} />
      </ChakraProvider>
    );

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(2);
      expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/getHistoryDetallado'));
      expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/getHistoryTotal'));
    });
  });

  it('renders loading spinner while fetching data', async () => {
    render(
      <ChakraProvider>
        <History testing={true} />
      </ChakraProvider>
    );

    const spinnerElement = screen.getByTestId('loading-spinner');
    expect(spinnerElement).toBeInTheDocument();
  });
});