let pagos = [
  { id: 1, reservaId: 1, monto: 300, metodo: 'tarjeta', estado: 'aprobado', numeroFactura: 'FAC-1000', fecha: '2026-07-06T10:00:00.000Z' },
  { id: 2, reservaId: 3, monto: 90, metodo: 'efectivo', estado: 'aprobado', numeroFactura: 'FAC-1001', fecha: '2026-07-16T15:30:00.000Z' }
];
let siguienteId = 3;
let siguienteFactura = 1002;

function procesarPago({ reservaId, monto, metodo }) {
  const aprobado = monto > 0;

  const nuevoPago = {
    id: siguienteId++,
    reservaId,
    monto,
    metodo,
    estado: aprobado ? 'aprobado' : 'rechazado',
    numeroFactura: aprobado ? `FAC-${siguienteFactura++}` : null,
    fecha: new Date().toISOString()
  };

  pagos.push(nuevoPago);
  return nuevoPago;
}

function listarPagos() {
  return pagos;
}

function obtenerPago(id) {
  return pagos.find(p => p.id === id);
}

module.exports = { procesarPago, listarPagos, obtenerPago };