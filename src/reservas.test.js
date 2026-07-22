const { registrarReserva, listarReservas, obtenerReserva, actualizarReserva, eliminarReserva } = require('./reservas');

describe('Reservas', () => {

  test('registrarReserva agrega una nueva reserva a la lista', () => {
    const reserva = registrarReserva({ turistaId: 1, paqueteId: 1, fecha: '2026-08-01', cantidadPersonas: 2 });

    expect(reserva).toHaveProperty('id');
    expect(reserva.turistaId).toBe(1);
    expect(reserva.paqueteId).toBe(1);
    expect(reserva.estado).toBe('pendiente');
  });

  test('listarReservas devuelve un arreglo de reservas', () => {
    const reservas = listarReservas();

    expect(Array.isArray(reservas)).toBe(true);
  });

  test('obtenerReserva devuelve la reserva correcta por id', () => {
    const nueva = registrarReserva({ turistaId: 2, paqueteId: 1, fecha: '2026-08-10', cantidadPersonas: 1 });

    const encontrada = obtenerReserva(nueva.id);

    expect(encontrada).toBeDefined();
    expect(encontrada.cantidadPersonas).toBe(1);
  });

  test('obtenerReserva devuelve undefined si el id no existe', () => {
    const resultado = obtenerReserva(9999);

    expect(resultado).toBeUndefined();
  });

  test('actualizarReserva modifica los datos de una reserva existente', () => {
    const nueva = registrarReserva({ turistaId: 1, paqueteId: 2, fecha: '2026-09-01', cantidadPersonas: 3 });

    const actualizado = actualizarReserva(nueva.id, { estado: 'confirmada' });

    expect(actualizado).toBe(true);
    expect(obtenerReserva(nueva.id).estado).toBe('confirmada');
  });

  test('actualizarReserva devuelve false si el id no existe', () => {
    const resultado = actualizarReserva(9999, { estado: 'confirmada' });

    expect(resultado).toBe(false);
  });

  test('eliminarReserva quita la reserva de la lista (cancelar)', () => {
    const nueva = registrarReserva({ turistaId: 3, paqueteId: 1, fecha: '2026-10-01', cantidadPersonas: 2 });

    const eliminado = eliminarReserva(nueva.id);

    expect(eliminado).toBe(true);
    expect(obtenerReserva(nueva.id)).toBeUndefined();
  });

});