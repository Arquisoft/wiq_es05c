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
    const guardarRespuestaIncorrectaMock = jest.fn().mockResolvedValue();
  
    // Define the finalQuestion object with the necessary properties
    const finalQuestion = {
      incorrect1_es: 'incorrect1_es',
      incorrect1_en: 'incorrect1_en',
      incorrect2_es: 'incorrect2_es',
      incorrect2_en: 'incorrect2_en',
      incorrect3_es: 'incorrect3_es',
      incorrect3_en: 'incorrect3_en'
    };
  
    // Call the function and assert the expectations
    return guardarEnBaseDatos.guardarEnBaseDatos.call({
      guardarCategoria: guardarCategoriaMock,
      guardarPreguntaTipo: guardarPreguntaTipoMock,
      guardarRespuestaIncorrecta: guardarRespuestaIncorrectaMock,
    }, finalQuestion).then(() => {
      expect(guardarCategoriaMock).toHaveBeenCalled();
      expect(guardarPreguntaTipoMock).toHaveBeenCalledWith('categoryId');
      expect(guardarRespuestaIncorrectaMock).toHaveBeenCalledTimes(3);
      expect(guardarRespuestaIncorrectaMock).toHaveBeenCalledWith('questionTypeId', expect.anything(), expect.anything());
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
// Test positivo
it('guardarRespuestaIncorrecta crea una nueva respuesta si no existe', () => {
  instance.finalQuestion = {incorrect1_es: 'newResponse', incorrect1_en: 'newResponseEn'};
  jest.spyOn(Respuesta, 'findOne').mockImplementation(() => Promise.resolve(null));
  const saveSpy = jest.spyOn(Respuesta.prototype, 'save').mockImplementation(() => Promise.resolve());

  return instance.guardarRespuestaIncorrecta('idTipo', 'newResponse', 'newResponseEn').then(() => {
    expect(Respuesta.findOne).toHaveBeenCalledWith({textoRespuesta_es: 'newResponse'});
    expect(saveSpy).toHaveBeenCalled();
  });
});

/*
REVISAR EL TEST NO DEBERI A DE LLAMAR AL SAVE SI LOS PARAMETROS NO SON CORRECTOS 
it('guardarRespuestaIncorrecta lanza un error si no existe la pregunta en la base de datos', () => {
  instance.finalQuestion = {incorrect1_es: undefined};
  jest.spyOn(Respuesta, 'findOne').mockImplementation(() => Promise.resolve(null));
  const saveSpy = jest.spyOn(Respuesta.prototype, 'save').mockImplementation(() => Promise.resolve());

  return instance.guardarRespuestaIncorrecta('idTipo', undefined, undefined).catch((error) => {
    expect(Respuesta.findOne).toHaveBeenCalledWith({textoRespuesta_es: undefined});
    expect(error).toEqual(new Error('Error al guardar la respuesta incorrecta en la base de datos: No existe la pregunta en la base de datos'));
    expect(saveSpy).not.toHaveBeenCalled();
  });
});
  */
});