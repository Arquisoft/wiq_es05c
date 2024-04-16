import CustomGameMode from './CustomGameMode';

describe('CustomGameMode', () => {
  describe('fetchQuestions', () => {

    it('should fetch questions and update the state', async () => {
      const mockApiEndpoint = 'http://localhost:8000';
      const mockNumQuestions = 10;
      const mockQuestions = [
        { id: 1, question: 'Question 1' },
        { id: 2, question: 'Question 2' },
        // Add more mock questions as needed
      ];

      // Mock the fetch function and return the mock questions
      global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockQuestions),
      });

      const customGameMode = new CustomGameMode(mockApiEndpoint, mockNumQuestions);

      // Call the fetchQuestions method
      const result = await customGameMode.fetchQuestions();

      // Verify that the fetch function was called with the correct URL
      expect(global.fetch).toHaveBeenCalledWith(`${mockApiEndpoint}/getQuestionModoCustom?numPreguntas=${mockNumQuestions}`);

      // Verify that the questions were fetched and stored in the state
      expect(customGameMode.questions).toEqual(mockQuestions);
      expect(customGameMode.isLoading).toBe(false);

      // Verify that the method returns the fetched questions
      expect(result).toEqual(mockQuestions);
    });

    it('should handle errors when fetching questions', async () => {
        const mockApiEndpoint = 'http://localhost:8000';
        const mockNumQuestions = 10;
        const mockError = new Error('Failed to fetch questions');
        
        // Mock the fetch function and throw an error
        global.fetch = jest.fn().mockRejectedValue(mockError);

        // Spy on console.error
        const consoleErrorSpy = jest.spyOn(console, 'error');

        const customGameMode = new CustomGameMode(mockApiEndpoint, mockNumQuestions);

        // Call the fetchQuestions method
        const result = await customGameMode.fetchQuestions();

        // Verify that the fetch function was called with the correct URL
        expect(global.fetch).toHaveBeenCalledWith(`${mockApiEndpoint}/getQuestionModoCustom?numPreguntas=${mockNumQuestions}`);

        // Verify that the error was logged
        expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching question data:', mockError);

        // Verify that the method returns an empty array
        expect(result).toEqual([]);
    });
  });
});