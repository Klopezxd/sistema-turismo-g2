const { procesarPago, listarPagos, obtenerPago } = require('./pagos');

describe('Pagos', () => {

  test('procesarPago registra un pago simulado como aprobado', () => {
    const pago = procesarPago({ reservaId: 1, monto: 150, metodo: 'tarjeta' });

    expect(pago).toHaveProperty('id');
    expect(pago.reservaId).toBe(1);
    expect(pago.monto).toBe(150);
    expect(pago.estado).toBe('aprobado');
    expect(pago).toHaveProperty('numeroFactura');
  });

  test('procesarPago rechaza si el monto es menor o igual a 0', () => {
    const pago = procesarPago({ reservaId: 2, monto: 0, metodo: 'tarjeta' });

    expect(pago.estado).toBe('rechazado');
  });

  test('listarPagos devuelve un arreglo de pagos', () => {
    const pagos = listarPagos();

    expect(Array.isArray(pagos)).toBe(true);
  });

  test('obtenerPago devuelve el pago correcto por id', () => {
    const nuevo = procesarPago({ reservaId: 3, monto: 90, metodo: 'efectivo' });

    const encontrado = obtenerPago(nuevo.id);

    expect(encontrado).toBeDefined();
    expect(encontrado.monto).toBe(90);
  });

  test('obtenerPago devuelve undefined si el id no existe', () => {
    const resultado = obtenerPago(9999);

    expect(resultado).toBeUndefined();
  });

});