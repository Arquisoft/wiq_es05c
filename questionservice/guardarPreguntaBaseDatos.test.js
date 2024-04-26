const Model = require('./question-model');
const GuardarEnBaseDatos = require('./guardarPreguntaBaseDatos');

const guardarEnBaseDatos = new GuardarEnBaseDatos();

describe('guardarEnBaseDatos', () => {

  it('should resolve when all data is successfully saved', () => {
    // Mock the necessary functions and promises
    const guardarCategoriaMock = jest.fn().mockResolvedValue('categoryId');
    const guardarPreguntaTipoMock = jest.fn().mockResolvedValue('questionTypeId');
    const guardarPrimeraIncorrectaMock = jest.fn().mockResolvedValue();
    const guardarSegundaIncorrectaMock = jest.fn().mockResolvedValue();
    const guardarTerceraIncorrectaMock = jest.fn().mockResolvedValue();

    // Call the function and assert the expectations
    return guardarEnBaseDatos.guardarEnBaseDatos.call({
      guardarCategoria: guardarCategoriaMock,
      guardarPreguntaTipo: guardarPreguntaTipoMock,
      guardarPrimeraIncorrecta: guardarPrimeraIncorrectaMock,
      guardarSegundaIncorrecta: guardarSegundaIncorrectaMock,
      guardarTerceraIncorrecta: guardarTerceraIncorrectaMock,
    }, 'finalQuestion').then(() => {
      expect(guardarCategoriaMock).toHaveBeenCalled();
      expect(guardarPreguntaTipoMock).toHaveBeenCalledWith('categoryId');
      expect(guardarPrimeraIncorrectaMock).toHaveBeenCalledWith('questionTypeId');
      expect(guardarSegundaIncorrectaMock).toHaveBeenCalledWith('questionTypeId');
      expect(guardarTerceraIncorrectaMock).toHaveBeenCalledWith('questionTypeId');
    });
  });
});