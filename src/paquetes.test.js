const { registrarPaquete, listarPaquetes, obtenerPaquete, actualizarPaquete, eliminarPaquete } = require('./paquetes');

describe('Paquetes', () => {

  test('registrarPaquete agrega un nuevo paquete a la lista', () => {
    const paquete = registrarPaquete({ nombre: 'Aventura en Baños', precio: 150, destinoId: 1, cupos: 20 });

    expect(paquete).toHaveProperty('id');
    expect(paquete.nombre).toBe('Aventura en Baños');
    expect(paquete.precio).toBe(150);
  });

  test('listarPaquetes devuelve un arreglo de paquetes', () => {
    const paquetes = listarPaquetes();

    expect(Array.isArray(paquetes)).toBe(true);
  });

  test('obtenerPaquete devuelve el paquete correcto por id', () => {
    const nuevo = registrarPaquete({ nombre: 'Ruta del Chocolate', precio: 90, destinoId: 2, cupos: 15 });

    const encontrado = obtenerPaquete(nuevo.id);

    expect(encontrado).toBeDefined();
    expect(encontrado.nombre).toBe('Ruta del Chocolate');
  });

  test('obtenerPaquete devuelve undefined si el id no existe', () => {
    const resultado = obtenerPaquete(9999);

    expect(resultado).toBeUndefined();
  });

  test('actualizarPaquete modifica los datos de un paquete existente', () => {
    const nuevo = registrarPaquete({ nombre: 'Islas Galápagos', precio: 800, destinoId: 3, cupos: 10 });

    const actualizado = actualizarPaquete(nuevo.id, { nombre: 'Galápagos Premium', precio: 950, destinoId: 3, cupos: 10 });

    expect(actualizado).toBe(true);
    expect(obtenerPaquete(nuevo.id).nombre).toBe('Galápagos Premium');
  });

  test('actualizarPaquete devuelve false si el id no existe', () => {
    const resultado = actualizarPaquete(9999, { nombre: 'X', precio: 0, destinoId: 0, cupos: 0 });

    expect(resultado).toBe(false);
  });

  test('eliminarPaquete quita el paquete de la lista', () => {
    const nuevo = registrarPaquete({ nombre: 'Malecón de Salinas', precio: 60, destinoId: 4, cupos: 25 });

    const eliminado = eliminarPaquete(nuevo.id);

    expect(eliminado).toBe(true);
    expect(obtenerPaquete(nuevo.id)).toBeUndefined();
  });

});