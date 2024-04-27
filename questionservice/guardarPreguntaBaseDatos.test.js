const mongoose = require('mongoose');
const Model = require('./question-model');
const GuardarEnBaseDatos = require('./guardarPreguntaBaseDatos');
const { Categoria } = require('./question-model');



const guardarEnBaseDatos = new GuardarEnBaseDatos();

describe('guardarEnBaseDatos', () => {
  let instance;
  beforeEach(() => {
    instance = new GuardarEnBaseDatos();

    jest.spyOn(Categoria, 'findOne').mockImplementation(() => Promise.resolve({_id: 'existingId'}));
    jest.spyOn(Categoria.prototype, 'save').mockImplementation(() => Promise.resolve({_id: 'newId'}));
  
  });



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

  it('guardarCategoria usa una categoria existente si existe', () => {
    instance.finalQuestion = {category: 'existingCategory'};
  
    return instance.guardarCategoria().then(idCategoria => {
      expect(Categoria.findOne).toHaveBeenCalled();
      expect(Categoria.prototype.save).not.toHaveBeenCalled();
      expect(idCategoria).toBe('existingId');
    });
  });
});