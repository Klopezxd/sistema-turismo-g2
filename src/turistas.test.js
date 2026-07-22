const { registrarTurista, listarTuristas, obtenerTurista, actualizarTurista, eliminarTurista } = require('./turistas');

describe('Turistas', () => {

  test('registrarTurista agrega un nuevo turista a la lista', () => {
    const turista = registrarTurista({ nombre: 'Ana Pérez', email: 'ana@mail.com', telefono: '0991234567' });

    expect(turista).toHaveProperty('id');
    expect(turista.nombre).toBe('Ana Pérez');
    expect(turista.email).toBe('ana@mail.com');
  });

  test('listarTuristas devuelve un arreglo de turistas', () => {
    const turistas = listarTuristas();

    expect(Array.isArray(turistas)).toBe(true);
  });

  test('obtenerTurista devuelve el turista correcto por id', () => {
    const nuevo = registrarTurista({ nombre: 'Luis Gómez', email: 'luis@mail.com', telefono: '0987654321' });

    const encontrado = obtenerTurista(nuevo.id);

    expect(encontrado).toBeDefined();
    expect(encontrado.nombre).toBe('Luis Gómez');
  });

  test('obtenerTurista devuelve undefined si el id no existe', () => {
    const resultado = obtenerTurista(9999);

    expect(resultado).toBeUndefined();
  });

  test('actualizarTurista modifica los datos de un turista existente', () => {
    const nuevo = registrarTurista({ nombre: 'Carla Ruiz', email: 'carla@mail.com', telefono: '0999999999' });

    const actualizado = actualizarTurista(nuevo.id, { nombre: 'Carla Ruiz Vega', email: 'carla@mail.com', telefono: '0999999999' });

    expect(actualizado).toBe(true);
    expect(obtenerTurista(nuevo.id).nombre).toBe('Carla Ruiz Vega');
  });

  test('actualizarTurista devuelve false si el id no existe', () => {
    const resultado = actualizarTurista(9999, { nombre: 'X', email: 'x@mail.com', telefono: '000' });

    expect(resultado).toBe(false);
  });

  test('eliminarTurista quita el turista de la lista', () => {
    const nuevo = registrarTurista({ nombre: 'Pedro Salas', email: 'pedro@mail.com', telefono: '0988888888' });

    const eliminado = eliminarTurista(nuevo.id);

    expect(eliminado).toBe(true);
    expect(obtenerTurista(nuevo.id)).toBeUndefined();
  });

});