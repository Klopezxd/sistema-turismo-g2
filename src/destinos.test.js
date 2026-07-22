const { registrarDestino, listarDestinos, obtenerDestino, eliminarDestino, actualizarDestino } = require('./destinos');

describe('Destinos', () => {

  test('registrarDestino agrega un nuevo destino a la lista', () => {
    const destino = registrarDestino({ nombre: 'Baños de Agua Santa', ciudad: 'Baños' });

    expect(destino).toHaveProperty('id');
    expect(destino.nombre).toBe('Baños de Agua Santa');
    expect(destino.ciudad).toBe('Baños');
  });

  test('listarDestinos devuelve un arreglo de destinos', () => {
    const destinos = listarDestinos();

    expect(Array.isArray(destinos)).toBe(true);
  });

  test('obtenerDestino devuelve el destino correcto por id', () => {
    const nuevo = registrarDestino({ nombre: 'Mindo', ciudad: 'Mindo' });

    const encontrado = obtenerDestino(nuevo.id);

    expect(encontrado).toBeDefined();
    expect(encontrado.nombre).toBe('Mindo');
  });

  test('obtenerDestino devuelve undefined si el id no existe', () => {
    const resultado = obtenerDestino(9999);

    expect(resultado).toBeUndefined();
  });

  test('eliminarDestino quita el destino de la lista', () => {
    const nuevo = registrarDestino({ nombre: 'Cuenca Centro Histórico', ciudad: 'Cuenca' });

    const eliminado = eliminarDestino(nuevo.id);

    expect(eliminado).toBe(true);
    expect(obtenerDestino(nuevo.id)).toBeUndefined();
  });

  test('actualizarDestino modifica los datos de un destino existente', () => {
    const nuevo = registrarDestino({ nombre: 'Otavalo', ciudad: 'Otavalo' });

    const actualizado = actualizarDestino(nuevo.id, { nombre: 'Otavalo Mercado', ciudad: 'Otavalo' });

    expect(actualizado).toBe(true);
    expect(obtenerDestino(nuevo.id).nombre).toBe('Otavalo Mercado');
  });

  test('actualizarDestino devuelve false si el id no existe', () => {
    const resultado = actualizarDestino(9999, { nombre: 'X', ciudad: 'Y' });

    expect(resultado).toBe(false);
  });

});