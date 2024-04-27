const mongoose = require('mongoose');
const Model = require('./question-model');
const GuardarEnBaseDatos = require('./guardarPreguntaBaseDatos');
const { Categoria,Respuesta } = require('./question-model');



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

  //test negativos del agregar categoria
  it('should throw an error when findOne fails', () => {
    instance.finalQuestion = {category: 'existingCategory'};
    jest.spyOn(Categoria, 'findOne').mockImplementation(() => Promise.reject(new Error('findOne error')));
  
    return expect(instance.guardarCategoria()).rejects.toThrow('findOne error');
  });
  
  it('should throw an error when save fails', () => {
    instance.finalQuestion = {category: 'newCategory'};
    jest.spyOn(Categoria, 'findOne').mockImplementation(() => Promise.resolve(null));
    jest.spyOn(Categoria.prototype, 'save').mockImplementation(() => Promise.reject(new Error('save error')));
  
    return expect(instance.guardarCategoria()).rejects.toThrow('save error');
  });
//test metodo primeraINcorrecta
it('guardarPrimeraIncorrecta crea una nueva respuesta si no existe', () => {
  instance.finalQuestion = {incorrect1_es: 'newResponse', incorrect1_en: 'newResponseEn'};
  jest.spyOn(Respuesta, 'findOne').mockImplementation(() => Promise.resolve(null));
  const saveSpy = jest.spyOn(Respuesta.prototype, 'save').mockImplementation(() => Promise.resolve());

  return instance.guardarPrimeraIncorrecta('idTipo').then(() => {
      expect(Respuesta.findOne).toHaveBeenCalledWith({textoRespuesta_es: 'newResponse'});
      expect(saveSpy).toHaveBeenCalled();
  });
});
  
  //test negativo 
  it('guardarPrimeraIncorrecta catch del error porque no existe la pregunta de la bd ', () => {
    instance.finalQuestion = {incorrect1_es: 'newResponse'};
    jest.spyOn(Respuesta, 'findOne').mockImplementation(() => Promise.resolve(null));
    const saveSpy = jest.spyOn(Respuesta.prototype, 'save').mockImplementation(() => Promise.resolve());
  
    return instance.guardarPrimeraIncorrecta('idTipo').then(() => {
      expect(Respuesta.findOne).toHaveBeenCalledWith({textoRespuesta_es: 'newResponse'});
      expect(saveSpy).toHaveBeenCalled();
    });
  });
  
});