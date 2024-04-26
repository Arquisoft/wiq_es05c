import { render, waitFor, screen } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { History } from './History';

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